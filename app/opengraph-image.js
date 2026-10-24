import { ImageResponse } from "next/og";

export const alt = "Parhle - Free study notes, books and resources for students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "#000000",
                    backgroundImage: "radial-gradient(circle at 85% 20%, #2a0010 0%, #000000 55%)",
                    color: "#F3F4F6",
                }}
            >
                <div style={{ fontSize: 128, fontWeight: 700, color: "#e80038", letterSpacing: -2 }}>Parhle</div>
                <div style={{ fontSize: 44, marginTop: 16, color: "#F3F4F6" }}>
                    Free study notes, books & resources
                </div>
                <div style={{ fontSize: 30, marginTop: 28, color: "#9DA3AF" }}>
                    Shared by students, for students. Parhle, fail hojayega!
                </div>
                <div style={{ fontSize: 26, marginTop: "auto", color: "#718096" }}>parhle.mueed.xyz</div>
            </div>
        ),
        { ...size }
    );
}
