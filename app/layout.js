import "./globals.css";
import ClientLayout from "./client-layout";


export const metadata = {
  title: "Parhle - Fail Hojayega",
  description: "Fail Hojayega",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={"overflow-x-hidden"}>
            <body className={`font-primary antialiased  overflow-x-hidden bg-black`}>
                {/* <Suspense fallback={null}> */}
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                {/* </Suspense> */}
            </body>
        </html>
    );
}