"use client";
import React from "react";

// Shows a field value, highlighted in red with an "Updated <date>" badge when that field
// was changed recently (default: within 7 days). Data comes from the property fetch
// (last_changed_at + last_changed_fields), so there are no extra DB calls.

function withinDays(at: unknown, days: number): boolean {
  if (!at) return false;
  const t = new Date(at as string).getTime();
  if (isNaN(t)) return false;
  return Date.now() - t <= days * 24 * 60 * 60 * 1000;
}

function asFieldList(raw: unknown): string[] {
  let list = raw;
  if (typeof list === "string") {
    try { list = JSON.parse(list); } catch { return []; }
  }
  return Array.isArray(list) ? (list as string[]) : [];
}

export function isFieldRecentlyChanged(
  fieldName: string,
  lastChangedAt: unknown,
  lastChangedFields: unknown,
  days = 7,
): boolean {
  return asFieldList(lastChangedFields).includes(fieldName) && withinDays(lastChangedAt, days);
}

export default function FieldValue({
  value,
  fieldName,
  lastChangedAt,
  lastChangedFields,
  days = 7,
}: {
  value: React.ReactNode;
  fieldName: string;
  lastChangedAt?: unknown;
  lastChangedFields?: unknown;
  days?: number;
}) {
  const changed = isFieldRecentlyChanged(fieldName, lastChangedAt, lastChangedFields, days);
  if (!changed) return <>{value}</>;

  const when = new Date(lastChangedAt as string).toLocaleDateString();
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{ color: "#DC2626", fontWeight: 700 }}>{value}</span>
      <span
        title={`Updated ${when}`}
        style={{ fontSize: "11px", color: "#DC2626", background: "#FEE2E2", borderRadius: "6px", padding: "1px 6px", whiteSpace: "nowrap", fontWeight: 600 }}
      >
        Updated {when}
      </span>
    </span>
  );
}
