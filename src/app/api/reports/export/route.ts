import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { property, propertyBids, propertyLinkedBidders, user } from "@/lib/schema";
import { and, eq, inArray, sql } from "drizzle-orm";

type ReportKey = "property" | "bidder" | "auction";
type FormatKey = "csv" | "xlsx" | "pdf";

function asString(v: unknown) {
  return typeof v === "string" ? v : "";
}

function escapeCsvCell(value: unknown) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(rows: Array<Record<string, unknown>>, columns: string[]) {
  const header = columns.map(escapeCsvCell).join(",");
  const lines = rows.map((r) => columns.map((c) => escapeCsvCell(r[c])).join(","));
  return [header, ...lines].join("\r\n");
}

function downloadHeaders(filename: string, contentType: string) {
  return {
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "no-store",
  } as Record<string, string>;
}

async function assertCountyUser(sessionUserId: string) {
  const [acting] = await db
    .select({ type: user.type })
    .from(user)
    .where(eq(user.id, sessionUserId))
    .limit(1);
  if (acting?.type !== "county") return false;
  return true;
}

async function exportPropertyCsv(countyUserId: string) {
  const props = await db
    .select({
      id: property.id,
      parcelId: property.parcelId,
      address: property.address,
      city: property.city,
      zipCode: property.zipCode,
      status: property.status,
      minBid: property.minBid,
      auctionEnd: property.auctionEnd,
      createdAt: property.createdAt,
    })
    .from(property)
    .where(eq(property.createdBy, countyUserId));

  const propertyIds = props.map((p) => p.id).filter(Boolean) as string[];
  const maxBids =
    propertyIds.length === 0
      ? []
      : await db
          .select({
            propertyId: propertyBids.propertyId,
            maxAmount: sql<number>`max(${propertyBids.amount})`.as("maxAmount"),
          })
          .from(propertyBids)
          .where(inArray(propertyBids.propertyId, propertyIds))
          .groupBy(propertyBids.propertyId);

  const maxBidByPropertyId = new Map<string, number>();
  for (const row of maxBids as any[]) {
    if (row?.propertyId) maxBidByPropertyId.set(String(row.propertyId), Number(row.maxAmount ?? 0));
  }

  const rows = props.map((p) => {
    const maxBid = maxBidByPropertyId.get(p.id);
    const currentBid =
      maxBid !== undefined && Number.isFinite(maxBid) && maxBid > 0 ? maxBid : p.minBid ?? "";
    return {
      parcelId: p.parcelId || "",
      address: p.address || "",
      city: p.city || "",
      zipCode: p.zipCode || "",
      status: p.status || "",
      minBid: p.minBid ?? "",
      currentBid: currentBid ?? "",
      auctionEnd: p.auctionEnd ? new Date(p.auctionEnd as any).toISOString() : "",
      createdAt: p.createdAt ? new Date(p.createdAt as any).toISOString() : "",
    };
  });

  const csv = toCsv(rows, [
    "parcelId",
    "address",
    "city",
    "zipCode",
    "status",
    "minBid",
    "currentBid",
    "auctionEnd",
    "createdAt",
  ]);

  return new NextResponse(csv, {
    status: 200,
    headers: downloadHeaders(
      `property-report-${new Date().toISOString().slice(0, 10)}.csv`,
      "text/csv; charset=utf-8"
    ),
  });
}

async function exportBidderXlsx(countyUserId: string) {
  // Dynamic import keeps the server bundle lighter and avoids edge issues.
  const XLSX = await import("xlsx");

  const rows = await db
    .select({
      bidderId: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      propertyId: property.id,
    })
    .from(propertyLinkedBidders)
    .leftJoin(property, eq(propertyLinkedBidders.propertyId, property.id))
    .leftJoin(user, eq(propertyLinkedBidders.bidderId, user.id))
    .where(and(eq(property.createdBy, countyUserId), eq(user.type, "bidder")));

  const byBidder = new Map<
    string,
    { bidderId: string; name: string; email: string; phone: string; linkedPropertyCount: number }
  >();

  for (const r of rows as any[]) {
    const bidderId = String(r?.bidderId || "");
    if (!bidderId) continue;
    const existing = byBidder.get(bidderId);
    if (!existing) {
      byBidder.set(bidderId, {
        bidderId,
        name: r?.name || "",
        email: r?.email || "",
        phone: r?.phone || "",
        linkedPropertyCount: 1,
      });
    } else {
      existing.linkedPropertyCount += 1;
    }
  }

  const data = Array.from(byBidder.values());
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Bidders");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as unknown as Buffer;

  return new NextResponse(buf, {
    status: 200,
    headers: downloadHeaders(
      `bidder-report-${new Date().toISOString().slice(0, 10)}.xlsx`,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ),
  });
}

async function exportAuctionPdf(countyUserId: string) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

  const props = await db
    .select({
      id: property.id,
      parcelId: property.parcelId,
      address: property.address,
      city: property.city,
      status: property.status,
      minBid: property.minBid,
      auctionEnd: property.auctionEnd,
    })
    .from(property)
    .where(eq(property.createdBy, countyUserId));

  const propertyIds = props.map((p) => p.id).filter(Boolean) as string[];
  const bids =
    propertyIds.length === 0
      ? []
      : await db
          .select({
            propertyId: propertyBids.propertyId,
            amount: propertyBids.amount,
            bidderName: user.name,
            bidderEmail: user.email,
          })
          .from(propertyBids)
          .leftJoin(user, eq(propertyBids.bidderId, user.id))
          .where(inArray(propertyBids.propertyId, propertyIds));

  // Pick max bid per property
  const topBidByPropertyId = new Map<
    string,
    { amount: number; bidderName: string; bidderEmail: string }
  >();
  for (const b of bids as any[]) {
    const pid = String(b?.propertyId || "");
    if (!pid) continue;
    const amt = Number(b?.amount ?? 0);
    const existing = topBidByPropertyId.get(pid);
    if (!existing || amt > existing.amount) {
      topBidByPropertyId.set(pid, {
        amount: amt,
        bidderName: b?.bidderName || "",
        bidderEmail: b?.bidderEmail || "",
      });
    }
  }

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageMargin = 36;
  const lineHeight = 14;

  let page = pdf.addPage();
  let { width, height } = page.getSize();
  let y = height - pageMargin;

  const drawLine = (text: string, bold = false) => {
    if (y < pageMargin + lineHeight) {
      page = pdf.addPage();
      ({ width, height } = page.getSize());
      y = height - pageMargin;
    }
    page.drawText(text, {
      x: pageMargin,
      y,
      size: 10,
      font: bold ? fontBold : font,
      color: rgb(0.1, 0.1, 0.1),
      maxWidth: width - pageMargin * 2,
    });
    y -= lineHeight;
  };

  drawLine("Auction Report", true);
  drawLine(`Generated: ${new Date().toISOString()}`);
  drawLine("");

  for (const p of props as any[]) {
    const top = topBidByPropertyId.get(String(p.id));
    const topBid = top?.amount ? `$${Number(top.amount).toLocaleString()}` : "-";
    const topBidder = top?.bidderEmail
      ? `${top.bidderName ? `${top.bidderName} ` : ""}<${top.bidderEmail}>`
      : "-";
    const addr = [p.address, p.city].filter(Boolean).join(", ");
    drawLine(`Parcel: ${p.parcelId || "-"} | Status: ${p.status || "-"} | Top Bid: ${topBid}`, true);
    drawLine(`Property: ${addr || "-"}`);
    drawLine(`Top Bidder: ${topBidder}`);
    drawLine("");
  }

  const bytes = await pdf.save();
  return new NextResponse(bytes, {
    status: 200,
    headers: downloadHeaders(
      `auction-report-${new Date().toISOString().slice(0, 10)}.pdf`,
      "application/pdf"
    ),
  });
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const isCounty = await assertCountyUser(session.user.id);
    if (!isCounty) return new NextResponse("Only county users can export reports", { status: 403 });

    const { searchParams } = new URL(req.url);
    const report = asString(searchParams.get("report")) as ReportKey;
    const format = asString(searchParams.get("format")) as FormatKey;

    const validReports: ReportKey[] = ["property", "bidder", "auction"];
    const validFormats: FormatKey[] = ["csv", "xlsx", "pdf"];

    if (!validReports.includes(report)) {
      return new NextResponse("Invalid report type", { status: 400 });
    }
    if (!validFormats.includes(format)) {
      return new NextResponse("Invalid format", { status: 400 });
    }

    // Enforce 1:1 mapping between card and format
    const mapping: Record<ReportKey, FormatKey> = {
      property: "csv",
      bidder: "xlsx",
      auction: "pdf",
    };
    if (mapping[report] !== format) {
      return new NextResponse("Invalid format for report type", { status: 400 });
    }

    if (report === "property") return await exportPropertyCsv(session.user.id);
    if (report === "bidder") return await exportBidderXlsx(session.user.id);
    return await exportAuctionPdf(session.user.id);
  } catch (error) {
    console.error("[REPORTS_EXPORT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


