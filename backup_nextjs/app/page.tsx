import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhyDoSalesSection from "@/components/sections/WhyDoSalesSection";
import DataSourcesSection from "@/components/sections/DataSourcesSection";
import AIAgentSection from "@/components/sections/AIAgentSection";
import PlatformSection from "@/components/sections/PlatformSection";
import EarlyAccessSection from "@/components/sections/EarlyAccessSection";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "DoSales — AI-Powered Sales Intelligence for Emerging Markets",
  description: "DoSales automates lead discovery, outreach, and lead qualification with DoSales AI.",
};

async function getLandingPageData() {
  try {
    const query = `{
      "page": *[_type == "page" && title == "Home"][0] {
        hero->,
        whyDoSales->,
        radar,
        demo->,
        platform->,
        footerCta
      },
      "fallbackHero": *[_type == "hero"][0],
      "fallbackWhy": *[_type == "whyDoSales"][0],
      "fallbackDemo": *[_type == "demo"][0],
      "fallbackPlatform": *[_type == "platform"][0],
      "testimonials": *[_type == "testimonial"]
    }`;
    // Reduced timeout or quick failure check could go here if needed
    return await client.fetch(query, {}, { next: { revalidate: 0 } });
  } catch (error) {
    console.error("Sanity fetch failed, falling back to static content:", error);
    return null; // Return null so the page uses hardcoded defaults
  }
}

export default async function Home() {
  const data = await getLandingPageData();
  
  // Use linked version -> standalone version -> null (defaults to static)
  const heroData = data?.page?.hero || data?.fallbackHero;
  const whyData = data?.page?.whyDoSales || data?.fallbackWhy;
  const radarData = data?.page?.radar;
  const demoData = data?.page?.demo || data?.fallbackDemo;
  const platformData = data?.page?.platform || data?.fallbackPlatform;
  const footerCta = data?.page?.footerCta;
  const testimonials = data?.testimonials || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content">
        <HeroSection data={heroData} />
        <WhyDoSalesSection data={whyData} />
        <DataSourcesSection data={radarData} />
        <AIAgentSection data={demoData} testimonials={testimonials} />
        <PlatformSection data={platformData} />
        <EarlyAccessSection data={footerCta} />
      </main>
      <Footer />
    </div>
  );
}
