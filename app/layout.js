import "./globals.css";

export const metadata = {
  title: "Parhle - Fail Hojayega",
  description: "Fail Hojayega",
};

import { Suspense } from "react";
import ClientLayout from "./client-layout"; // Import the client-side component

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={""}>
            <body className={`font-primary w-screen overflow-x-hidden`}>
                <Suspense fallback={null}>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </Suspense>
            </body>
        </html>
    );
}