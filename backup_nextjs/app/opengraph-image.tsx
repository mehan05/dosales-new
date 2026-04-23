import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "DoSales — AI-Powered Sales Intelligence for Emerging Markets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0A0F1E 0%, #0F172A 50%, #1E293B 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
                <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "48px",
              background: "#ffffff",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "4px",
                background: "#0EA5E9",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "4px",
                background: "#0EA5E9",
                borderRadius: "2px",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: "20px",
                height: "4px",
                background: "#0EA5E9",
                borderRadius: "2px",
                opacity: 0.3,
              }}
            />
          </div>
        </div>
                <div
          style={{
            display: "flex",
            fontSize: "72px",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontWeight: 700 }}>Do</span>
          <span style={{ fontWeight: 500 }}>Sales</span>
        </div>
                <div
          style={{
            fontSize: "28px",
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          AI-Powered Sales Intelligence for Emerging Markets
        </div>
                <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #0EA5E9, #14B8A6)",
            borderRadius: "2px",
            marginTop: "32px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
