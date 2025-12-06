import Header from "@/components/header/Header";
import RegisterContent from "@/components/register/RegisterContent";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Register - Probid Multi Vendor Auctions",
  description: "Create an account to start bidding and selling",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <RegisterContent />
      <Footer />
    </>
  );
}
