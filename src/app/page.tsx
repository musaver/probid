import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

// Session-based redirect must run per-request, not be cached at build time.
export const dynamic = "force-dynamic";

// Homepage disabled: redirect based on auth state.
// Logged in  -> /dashboard
// Logged out -> /login
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  redirect("/login");
}
