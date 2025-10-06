import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CircleCursor from "@/components/circleCursor";

export const metadata = {
  title: "BETHANY-TRAN",
  description: "Profile of BETHANY-TRAN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <CircleCursor />
        <Footer />
      </body>
    </html>
  );
}
