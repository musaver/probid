import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Header from "@/components/header/Header";
import SignInContent from "@/components/auth/SignInContent";
import "./signin.css";

export const metadata = {
  title: "Sign in · BidBridge",
  description: "Sign in to BidBridge — we'll email you a one-time code.",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      <SignInContent />
    </>
  );
}
