import Header from "@/components/header/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/footer/Footer";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import { db } from "@/lib/db";
import { notifications, property, propertyBids, propertyLinkedBidders, user } from "@/lib/schema";
import { and, count, desc, eq, sql } from "drizzle-orm";

export const metadata = {
  icons: {
    icon: "/assets/img/fav-icon.svg",
  },
};

function timeAgo(d: Date) {
  const diffMs = Date.now() - d.getTime();
  const sec = Math.max(1, Math.floor(diffMs / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} mins ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hours ago`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString();
}

type ActivityRow = { activity: string; subject: string; time: string; at: Date };

function add48Hours(d: Date) {
  return new Date(d.getTime() + 48 * 60 * 60 * 1000);
}



const DashboardPage = async () => {
  const activeTab = "overview";
  const session = await getServerSession(authOptions);

  // Redirect to register if not authenticated
  if (!session) {
    redirect("/register");
  }

  // Fetch user data from database
  let userData = null;
  if (session?.user?.email) {
    const [dbUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, session.user.email))
      .limit(1);
    userData = dbUser;
  }

  const userId = session.user.id;
  const role = (userData as any)?.type || session?.user?.type || "bidder";

  // ---- Stats (role-aware) ----
  let totalProperties = 0;
  let activeBidders = 0;
  let wonAuctions = 0;

  if (role === "county") {
    const totalRow = await db
      .select({ c: count() })
      .from(property)
      .where(eq(property.createdBy, userId));
    totalProperties = Number(totalRow?.[0]?.c || 0);

    const activeBidderRow = await db
      .select({ c: sql<number>`count(distinct ${propertyLinkedBidders.bidderId})` })
      .from(propertyLinkedBidders)
      .innerJoin(property, eq(property.id, propertyLinkedBidders.propertyId))
      .where(eq(property.createdBy, userId));
    activeBidders = Number((activeBidderRow as any)?.[0]?.c || 0);

    const wonRow = await db
      .select({ c: count() })
      .from(property)
      .where(and(eq(property.createdBy, userId), eq(property.status, "sold")));
    wonAuctions = Number(wonRow?.[0]?.c || 0);
  } else {
    const totalRow = await db
      .select({ c: sql<number>`count(distinct ${propertyLinkedBidders.propertyId})` })
      .from(propertyLinkedBidders)
      .where(eq(propertyLinkedBidders.bidderId, userId));
    totalProperties = Number((totalRow as any)?.[0]?.c || 0);

    // Count other bidders linked to the same properties (distinct), excluding self
    const activeBidderRow = await db.execute(sql`
      select count(distinct plb2.bidder_id) as c
      from property_linked_bidders plb2
      where plb2.bidder_id <> ${userId}
        and plb2.property_id in (
          select plb.property_id from property_linked_bidders plb
          where plb.bidder_id = ${userId}
        )
    `);
    activeBidders = Number((activeBidderRow as any)?.[0]?.c || 0);

    // Won auctions for bidder: sold properties where bidder has the top bid
    const wonRow = await db.execute(sql`
      select count(distinct p.id) as c
      from property p
      join property_linked_bidders plb on plb.property_id = p.id and plb.bidder_id = ${userId}
      where p.status = 'sold'
        and exists (
          select 1
          from property_bids b
          where b.property_id = p.id
            and b.bidder_id = ${userId}
            and b.amount = (select max(b2.amount) from property_bids b2 where b2.property_id = p.id)
        )
    `);
    wonAuctions = Number((wonRow as any)?.[0]?.c || 0);
  }

  // ---- Recent Activity (role-aware) ----
  const notifItems = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(12);

  const activity: ActivityRow[] = [];
  for (const n of notifItems as any[]) {
    const at = n.createdAt ? new Date(n.createdAt) : new Date();
    const md = n.metadata || {};
    const subject =
      md?.propertyAddress ||
      md?.address ||
      md?.propertyTitle ||
      (n.message ? String(n.message).slice(0, 60) : "") ||
      (n.href ? String(n.href) : "");
    activity.push({
      activity: n.title || (n.type === "bid" ? "Bid activity" : n.type === "alert" ? "Alert" : "Status update"),
      subject,
      time: timeAgo(at),
      at,
    });
  }

  if (role === "county") {
    const createdProps = await db
      .select({ id: property.id, address: property.address, createdAt: property.createdAt })
      .from(property)
      .where(eq(property.createdBy, userId))
      .orderBy(desc(property.createdAt))
      .limit(8);
    for (const p of createdProps as any[]) {
      const at = p.createdAt ? new Date(p.createdAt) : new Date();
      activity.push({
        activity: "New property added",
        subject: p.address || p.id,
        time: timeAgo(at),
        at,
      });
    }

    const soldProps = await db
      .select({ id: property.id, address: property.address, updatedAt: property.updatedAt })
      .from(property)
      .where(and(eq(property.createdBy, userId), eq(property.status, "sold")))
      .orderBy(desc(property.updatedAt))
      .limit(8);
    for (const p of soldProps as any[]) {
      const at = p.updatedAt ? new Date(p.updatedAt) : new Date();
      activity.push({
        activity: "Auction won",
        subject: p.address || p.id,
        time: timeAgo(at),
        at,
      });
    }
  } else {
    const recentBids = await db
      .select({ propertyId: propertyBids.propertyId, amount: propertyBids.amount, createdAt: propertyBids.createdAt })
      .from(propertyBids)
      .where(eq(propertyBids.bidderId, userId))
      .orderBy(desc(propertyBids.createdAt))
      .limit(8);
    for (const b of recentBids as any[]) {
      const at = b.createdAt ? new Date(b.createdAt) : new Date();
      activity.push({
        activity: "Bid recorded",
        subject: `Property ${b.propertyId} • $${b.amount}`,
        time: timeAgo(at),
        at,
      });
    }
  }

  const recentActivity = activity.sort((a, b) => b.at.getTime() - a.at.getTime()).slice(0, 8);

  // Upcoming deadlines (next 48h)
  const now = new Date();
  const end = add48Hours(now);
  let upcomingDeadlines = 0;
  if (role === "county") {
    const row = await db
      .select({ c: count() })
      .from(property)
      .where(
        and(
          eq(property.createdBy, userId),
          sql`${property.auctionEnd} is not null and ${property.auctionEnd} >= ${now} and ${property.auctionEnd} <= ${end}`
        )
      );
    upcomingDeadlines = Number(row?.[0]?.c || 0);
  } else {
    const row = await db
      .select({ c: sql<number>`count(distinct ${property.id})` })
      .from(propertyLinkedBidders)
      .innerJoin(property, eq(propertyLinkedBidders.propertyId, property.id))
      .where(
        and(
          eq(propertyLinkedBidders.bidderId, userId),
          sql`${property.auctionEnd} is not null and ${property.auctionEnd} >= ${now} and ${property.auctionEnd} <= ${end}`
        )
      );
    upcomingDeadlines = Number((row as any)?.[0]?.c || 0);
  }

  return (
    <>
      <Header />

      {/* Dashboard Navigation */}
      <DashboardNav activeTab={activeTab} />

      {/* Dashboard Content */}
      <DashboardOverviewSection
        session={session}
        userData={userData}
        stats={{ totalProperties, activeBidders, wonAuctions }}
        recentActivity={recentActivity}
        role={role}
        upcomingDeadlines={upcomingDeadlines}
      />


      {/* Footer */}
      <Footer />
    </>
  );
};

export default DashboardPage;

const DashboardOverviewSection = ({
  session,
  userData,
  stats,
  recentActivity,
  role,
  upcomingDeadlines,
}: {
  session: any;
  userData: any;
  stats: { totalProperties: number; activeBidders: number; wonAuctions: number };
  recentActivity: Array<{ activity: string; subject: string; time: string }>;
  role: "bidder" | "county" | string;
  upcomingDeadlines: number;
}) => {
  const displayName = userData?.name || session?.user?.name || "User";
  const displayEmail = userData?.email || session?.user?.email || "No Email";
  const isCounty = role === "county";
  
  return (
    <div className="dashboard-content">
      <div className="container">
        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="user-avatar">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={displayName}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/img/avatar-placeholder.svg";
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#6ea500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: '600',
                color: '#ffffff'
              }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-info">
            <h1>Hi, {displayName}</h1>
            <p>{displayEmail}</p>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-purple">
          <div className="stat-content">
            <h3>Total Properties</h3>
            <h2>{stats.totalProperties}</h2>
          </div>
          <div className="stat-mask">
            <img src="/assets/img/stat-card-mask.svg" alt="" aria-hidden="true" />
          </div>
        </div>

        <div className="stat-card stat-card-green">
          <div className="stat-content">
            <h3>Active Bidders</h3>
            <h2>{stats.activeBidders}</h2>
          </div>
          <div className="stat-mask">
            <img src="/assets/img/stat-card-mask.svg" alt="" aria-hidden="true" />
          </div>
        </div>

        <div className="stat-card stat-card-red">
          <div className="stat-content">
            <h3>Won Auctions</h3>
            <h2>{stats.wonAuctions}</h2>
          </div>
          <div className="stat-mask">
            <img src="/assets/img/stat-card-mask.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Property/Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: "16px", color: "#6B7280" }}>
                    No recent activity yet.
                  </td>
                </tr>
              ) : (
                recentActivity.map((r, idx) => (
                  <tr key={idx}>
                    <td data-label="Activity">{r.activity}</td>
                    <td data-label="Property/Name">{r.subject}</td>
                    <td data-label="Time">{r.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <DashboardQuickActions isCounty={isCounty} />

      {/* Notification Banner */}
      <div className="notification-banner">
        <div className="notification-icon">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <div className="notification-content">
          <h4>{upcomingDeadlines} Upcoming Auction Deadlines</h4>
          <p>Properties closing in the next 48 hours require your attention</p>
        </div>
        <Link href="/properties?endingSoon=1" className="notification-btn">
          View All
        </Link>
      </div>
    </div>
  </div>
  );
};


