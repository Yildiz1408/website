import { ImageResponse } from "next/og";
import { OG_IMAGE_ALT, SITE_NAME } from "@/lib/site-config";

export const runtime = "edge";
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0E2238 0%, #1a3352 50%, #0E2238 100%)",
          color: "#F2EDE2",
          fontSize: 52,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        <div style={{ opacity: 0.9, fontSize: 28, marginBottom: 16 }}>Hannover</div>
        <div>{SITE_NAME}</div>
        <div style={{ marginTop: 24, fontSize: 26, fontWeight: 400, opacity: 0.85 }}>
          Vereidigter Dolmetscher & Übersetzer · Deutsch · Türkisch
        </div>
      </div>
    ),
    { ...size }
  );
}
