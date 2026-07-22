import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignInContent from "@/components/auth/SignInContent";
import "./signin.css";

export const metadata = {
  title: "Sign in · BidBridge",
  description: "Sign in to BidBridge — we'll email you a one-time code.",
};

// Only allow same-site relative paths as post-login targets — never an
// absolute URL (open-redirect guard). Falls back to /dashboard.
function safeCallback(cb?: string | string[]): string {
  const raw = Array.isArray(cb) ? cb[0] : cb;
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/dashboard";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    // Honor where the visitor was headed (e.g. /support from "Contact Admin")
    // instead of always dumping them on the dashboard.
    const { callbackUrl } = await searchParams;
    redirect(safeCallback(callbackUrl));
  }

  // SignInContent uses useSearchParams(), which requires a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}
