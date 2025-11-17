import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import localFont from "next/font/local";

// Lazy load CircleCursor - chỉ cần trên desktop
const CircleCursor = dynamic(() => import("@/components/circleCursor"), {
  ssr: false,
});

const helveticaFont = localFont({
  src: "../public/fonts/HelveticaNowDisplay-Medium.ttf",
  variable: "--font-helvetica",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "BETHANY-TRAN | Portfolio",
  description: "Portfolio of Bethany Tran - Graphic, Motion, and Digital Designer specializing in FMCG brands, in-house teams, and agencies.",
  keywords: "Bethany Tran, Graphic Designer, Motion Designer, Digital Designer, Portfolio",
  openGraph: {
    title: "BETHANY-TRAN | Portfolio",
    description: "Portfolio of Bethany Tran - Graphic, Motion, and Digital Designer",
    type: "website",
  },
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
