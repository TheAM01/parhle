import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest() {
    return {
        name: `${SITE_NAME} - Free Study Notes & Resources`,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
    };
}
