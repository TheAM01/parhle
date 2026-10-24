import "./globals.css";
import ClientLayout from "./client-layout";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/lib/site";


export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} - Free Study Notes, Books & Resources for Students`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: SITE_KEYWORDS,
    authors: [{ name: "Parhle Team", url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "education",
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: SITE_NAME,
        title: `${SITE_NAME} - Free Study Notes, Books & Resources for Students`,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE_NAME} - Free Study Notes, Books & Resources for Students`,
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    formatDetection: { telephone: false, email: false, address: false },
};

export const viewport = {
    themeColor: "#000000",
    colorScheme: "dark",
};

// Structured data so search engines understand the site and can show a sitelinks search box.
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            inLanguage: "en",
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
        {
            "@type": "EducationalOrganization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/opengraph-image`,
            slogan: "Parhle, fail hojayega!",
        },
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={"overflow-x-hidden"}>
            <body className={`font-primary antialiased  overflow-x-hidden bg-black`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
                />
                {/* <Suspense fallback={null}> */}
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                {/* </Suspense> */}
                <Analytics />
            </body>
        </html>
    );
}
