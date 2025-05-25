import "./globals.css";

export const metadata = {
  title: "Parhle - Fail Hojayega",
  description: "Fail Hojayega",
};

import { Suspense } from "react";
import ClientLayout from "./client-layout";


export default function RootLayout({ children }) {
    return (
        <html lang="en" className={""}>
            <body className={`font-primary antialiased w-screen overflow-x-hidden bg-black`}>
                {/* <Suspense fallback={null}> */}
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                {/* </Suspense> */}
            </body>
        </html>
    );
}