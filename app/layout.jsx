import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CircleCursor from "@/components/circleCursor";
import localFont from "next/font/local";

const helveticaFont = localFont({
  src: "../public/fonts/HelveticaNowDisplay-Medium.ttf",
  variable: "--font-helvetica",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "BETHANY-TRAN",
  description: "Profile of BETHANY-TRAN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={helveticaFont.variable}>
        <Header />
        {children}
        <CircleCursor />
        <Footer />
      </body>
    </html>
  );
}
