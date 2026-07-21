import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Header from "@/components/header/Header";
import RegisterContent from "@/components/register/RegisterContent";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Register - BidBridge",
  description: "Create an account to start bidding and selling",
};

export default async function RegisterPage() {
  // Check if user is already logged in
  const session = await getServerSession(authOptions);
  
  // If user is logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      <RegisterContent />
      <Footer />
    </>
  );
}
