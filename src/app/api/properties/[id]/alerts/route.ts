import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications, property, propertyAlerts, propertyLinkedBidders, user, conversations, messages } from "@/lib/schema";
import { and, eq, or } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendTextEmail } from "@/lib/email";
import CryptoJS from "crypto-js";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [actingUser] = await db
      .select({ id: user.id, type: user.type, email: user.email, name: user.name })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!actingUser) return new NextResponse("User not found", { status: 404 });

    if (actingUser.type !== "county" && actingUser.type !== "bidder") {
      return new NextResponse("Unauthorized user type", { status: 403 });
    }

    const body = await req.json();
    const subject = (body?.subject || "").toString().trim();
    const message = (body?.message || "").toString().trim();
    const bidderIds = (body?.bidderIds || null) as string[] | null;

    if (!subject) return new NextResponse("subject is required", { status: 400 });
    if (!message) return new NextResponse("message is required", { status: 400 });

    const [p] = await db
      .select({
        id: property.id,
        address: property.address,
        createdBy: property.createdBy,
      })
      .from(property)
      .where(eq(property.id, params.id))
      .limit(1);

    if (!p) return new NextResponse("Property not found", { status: 404 });

    // Recipient logic
    let filteredRecipients: { bidderId: string; email: string; name: string | null }[] = [];
    let notificationTargets = new Set<string>();
    let allEmails = new Set<string>();

    if (actingUser.type === "county") {
      // Fetch linked bidder emails
      const linked = await db
        .select({
          bidderId: propertyLinkedBidders.bidderId,
          email: user.email,
          name: user.name,
        })
        .from(propertyLinkedBidders)
        .leftJoin(user, eq(propertyLinkedBidders.bidderId, user.id))
        .where(eq(propertyLinkedBidders.propertyId, params.id));

      const recipients = linked
        .filter((r) => !!r.email)
        .map((r) => ({ bidderId: r.bidderId, email: r.email!, name: r.name }));

      // If bidderIds is provided, restrict to that subset (must be linked)
      filteredRecipients = recipients;
      if (Array.isArray(bidderIds)) {
        const linkedSet = new Set(recipients.map((r) => r.bidderId));
        for (const id of bidderIds) {
          if (!linkedSet.has(id)) {
            return new NextResponse("All bidderIds must be linked to this property", { status: 400 });
          }
        }
        const allow = new Set(bidderIds);
        filteredRecipients = recipients.filter((r) => allow.has(r.bidderId));
      }

      filteredRecipients.forEach(r => {
        notificationTargets.add(r.bidderId);
        allEmails.add(r.email);
      });

      // Add county owner copy if not sending to them (though normally they are the sender)
      const [countyOwner] = await db
        .select({ email: user.email, id: user.id })
        .from(user)
        .where(eq(user.id, p.createdBy))
        .limit(1);

      if (countyOwner) {
        allEmails.add(countyOwner.email!);
        // If county user is sending, they might want a notification too? 
        // Usually not. But let's follow existing logic.
        notificationTargets.add(countyOwner.id);
      }
    } else {
      // Bidder is sending to the county property owner
      const [countyOwner] = await db
        .select({ email: user.email, id: user.id, name: user.name })
        .from(user)
        .where(eq(user.id, p.createdBy))
        .limit(1);

      if (!countyOwner || !countyOwner.email) {
        return new NextResponse("Property owner not found", { status: 404 });
      }

      // We treat the county owner as the "bidderId" in the recipient loop for DM/Notif
      filteredRecipients = [{
        bidderId: countyOwner.id,
        email: countyOwner.email,
        name: countyOwner.name
      }];
      notificationTargets.add(countyOwner.id);
      allEmails.add(countyOwner.email);
    }

    // Send emails (best-effort)
    const emailText = `Property: ${p.address || params.id}\n\n${message}\n\nView: ${process.env.NEXTAUTH_URL}/property-details/${params.id}`;
    const sendResults: { email: string; ok: boolean; error?: string }[] = [];
    for (const email of Array.from(allEmails)) {
      if (email === actingUser.email && actingUser.type === "county") continue; // Don't email yourself if you are county sending alerts
      try {
        await sendTextEmail(email, subject, emailText);
        sendResults.push({ email, ok: true });
      } catch (e) {
        sendResults.push({
          email,
          ok: false,
          error: e instanceof Error ? e.message : "Failed",
        });
      }
    }

    // Audit row
    const alertId = uuidv4();
    await db.insert(propertyAlerts).values({
      id: alertId,
      propertyId: params.id,
      sentByUserId: session.user.id,
      subject,
      message,
      recipientCount: allEmails.size,
      createdAt: new Date(),
    });

    // Create in-app notifications
    const href = `/property-details/${params.id}`;
    const notifTitle = subject;
    const notifMessage = message.length > 160 ? message.slice(0, 157) + "..." : message;

    for (const userId of Array.from(notificationTargets)) {
      if (userId === actingUser.id) continue; // Don't notify yourself
      await db.insert(notifications).values({
        id: uuidv4(),
        userId,
        type: "alert",
        title: notifTitle,
        message: notifMessage,
        href,
        metadata: { propertyId: params.id, alertId },
        isRead: 0,
        createdAt: new Date(),
      });
    }

    // Send direct messages to linked bidders
    for (const r of filteredRecipients) {
      try {
        const bidderId = r.bidderId;
        const senderId = session.user.id;

        // Prevent self-messaging if acting user is somehow in the list
        if (bidderId === senderId) continue;

        const [existingConv] = await db
          .select()
          .from(conversations)
          .where(
            or(
              and(
                eq(conversations.participant1Id, senderId),
                eq(conversations.participant2Id, bidderId)
              ),
              and(
                eq(conversations.participant1Id, bidderId),
                eq(conversations.participant2Id, senderId)
              )
            )
          )
          .limit(1);

        let conversationId = existingConv?.id;
        let sharedKey = existingConv?.sharedKey;

        if (!conversationId) {
          conversationId = uuidv4();
          sharedKey = uuidv4(); // Generate new key for new conv
          await db.insert(conversations).values({
            id: conversationId,
            participant1Id: senderId,
            participant2Id: bidderId,
            createdAt: new Date(),
            lastMessageAt: new Date(),
            sharedKey,
          });
        } else {
          await db
            .update(conversations)
            .set({ lastMessageAt: new Date() })
            .where(eq(conversations.id, conversationId));
        }

        // Encrypt if we have a key
        let content = message;
        if (sharedKey) {
          content = CryptoJS.AES.encrypt(message, sharedKey).toString();
        }

        await db.insert(messages).values({
          id: uuidv4(),
          conversationId,
          senderId,
          content,
          createdAt: new Date(),
          isRead: 0,
        });
      } catch (e) {
        console.error(`Failed to send DM to bidder ${r.bidderId}:`, e);
      }
    }

    const failed = sendResults.filter((r) => !r.ok);
    return NextResponse.json({
      success: failed.length === 0,
      sent: sendResults.filter((r) => r.ok).length,
      failed,
      alertId,
    });
  } catch (error) {
    console.error("[PROPERTY_ALERTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


