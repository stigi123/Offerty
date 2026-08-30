import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Offertly — Angebot und Offerte als A4-PDF für Freelancer in DE, CH und AT";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#efe4cd",
          color: "#1c3228",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8a6c2e" }}>
          ANGEBOT · OFFERTE · DE / CH / AT
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 600 }}>Offertly</div>
          <div style={{ marginTop: 18, fontSize: 36, color: "#2d4a3a", maxWidth: 900 }}>
            Angebot erstellen als PDF — für Freelancer, ohne Konto.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6b5a38" }}>
          offertly.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
