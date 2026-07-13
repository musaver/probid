import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignInContent from "@/components/auth/SignInContent";
import "./signin.css";

export const metadata = {
  title: "Sign in · BidBridge",
  description: "Sign in to BidBridge — we'll email you a one-time code.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return <SignInContent />;
}
