import type { Metadata } from "next";
export const siteMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dosales.ai"
  ),
  title: {
    default: "DoSales — AI-Powered Sales Intelligence for Emerging Markets",
    template: "%s | DoSales",
  },
  description:
    "The deepest B2B database for MENA and Southeast Asia. AI-powered lead intelligence for Fintech and PropTech companies with autonomous prospecting workflows.",
  keywords: [
    "B2B sales intelligence",
    "lead generation",
    "MENA",
    "Southeast Asia",
    "Fintech",
    "PropTech",
    "AI prospecting",
    "sales automation",
    "lead enrichment",
    "UAE",
    "Singapore",
  ],
  authors: [{ name: "DoSales" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DoSales",
    title: "DoSales — AI-Powered Sales Intelligence for Emerging Markets",
    description:
      "The deepest B2B database for MENA and Southeast Asia. AI-powered lead intelligence with autonomous prospecting workflows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DoSales — AI-Powered Sales Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoSales — AI-Powered Sales Intelligence for Emerging Markets",
    description:
      "The deepest B2B database for MENA and Southeast Asia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
