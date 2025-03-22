import "./globals.css";
import Footer from "@/components/ui/footer";
import Navigation from "@/components/ui/navigation";

export const metadata = {
  title: "Parhle - Fail Hojayega",
  description: "Fail Hojayega",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={"overflow-x-hidden w-screen"}>
      <body className={`font-primary w-screen overflow-x-hidden overflow-clip`}>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
