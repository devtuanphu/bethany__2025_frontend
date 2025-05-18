import Header from "@/components/header";

export const metadata = {
  title: "ABOUT ME",
};

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
