"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

export default function HeroSection({ data }: { data: any }) {
  const [scrollY, setScrollY] = useState(0);
  const [imageOffset, setImageOffset] = useState(0);

  const heroTitle = data?.eyebrow || "Stop Chasing Leads!";
  const headlineTop = data?.headlineTop || "Turn your Ideal Customer Profile into a";
  const headlineAccent = data?.headlineAccent || "Automated Outreach";
  const heroSubtitle = data?.description || "DoSales automates lead discovery, outreach, and lead qualification with DoSales AI. Hand-over only sales-ready prospects and your sales team focuses on Revenue and Closing.";
  const ctaText = data?.ctaText || "REGISTER NOW";
  const badgeText = data?.badgeText || "Early Access Live - Limited Spots available";
  const dashboardImage = data?.dashboardImage ? urlFor(data.dashboardImage).url() : "/logos/table-view.svg";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const imageSection = document.getElementById('dashboard-mockup');
      if (imageSection) {
        const rect = imageSection.getBoundingClientRect();
        const offset = Math.max(0, window.innerHeight - rect.top);
        setImageOffset(offset);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const sectionWrapper = "relative w-full overflow-hidden";
  const contentWrapper = cn(
    "relative z-10",
    "flex flex-col items-center justify-center text-center",
    "pt-32 md:pt-[175px] px-4 sm:px-6"
  );
  const eyebrowText =
    "text-[24px] md:text-[36px] font-bold text-[var(--color-brand)] leading-[100%] tracking-[0] text-center mb-6";
  const headingPrimary = cn(
    "text-[28px] md:text-[39px] font-medium leading-[1.4] tracking-normal",
    "text-[var(--color-text-primary)] max-w-4xl mx-auto mb-7 text-center font-sans"
  );
  const headingAccent = "font-bold";
  const subheadingText = cn(
    "text-[14px] md:text-[16px] font-medium leading-[1.6] tracking-[0%] text-[var(--color-text-secondary)]",
    "max-w-xl md:max-w-2xl mx-auto text-center mb-6"
  );
  const earlyAccessBadge = cn(
    "inline-flex items-center justify-center gap-2 mb-[14px]",
    "w-full max-w-[344px] h-[34px] rounded-[20px] border border-[var(--color-accent-green-border)] bg-[var(--color-accent-green-bg)]",
    "px-3 py-[6px]"
  );
  const emailFormWrapper =
    "flex flex-row items-center justify-between gap-2 w-full max-w-[403px] h-[51px] mx-auto mb-[14px] bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.04)] p-[6px] pl-[14px] transition-all";
  const ctaButton = cn(
    "bg-[var(--color-action)] hover:bg-[var(--color-brand-hover)] text-[var(--color-white)]",
    "w-[141px] h-[39px] px-4 rounded-[6px] font-bold text-[14px] leading-none tracking-wide text-center whitespace-nowrap cursor-pointer",
    "transition-all active:scale-95"
  );
  const secureText = "text-[16px] font-normal italic leading-[24px] text-center text-[var(--color-text-secondary)] mb-[26px]";
  return (
    <section className={sectionWrapper}>
            <div
        className="absolute  pointer-events-none"
      />
      <div
        className="absolute inset-0 z-[3] pointer-events-none mask-[radial-gradient(circle_at_10%_20%,black_0%,transparent_70%),radial-gradient(circle_at_90%_15%,black_0%,transparent_60%),radial-gradient(circle_at_85%_85%,black_0%,transparent_70%)]"
      >
        <svg className="w-full h-[calc(100vh-12vh)]">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="76" height="76" patternUnits="userSpaceOnUse">
              <rect
                x="5" y="5" width="66" height="66" rx="12" ry="12"
                fill="#FAFDFF33"
                fillOpacity="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>
      <div
        className="absolute z-[2] pointer-events-none rounded-full w-[70%] h-[70%] -top-[20%] -left-[25%] bg-[radial-gradient(circle_at_center,_#76B1C5_0%,_#B9E6FE_70%,_transparent_100%)] blur-[120px] opacity-60"
      />
      <div
        className="absolute z-[2] pointer-events-none rounded-full w-[700px] h-[700px] top-[400px] -right-[200px] bg-blue-500 blur-[434px] opacity-60"
      />
      <div
        className="absolute z-[2] pointer-events-none rounded-full w-[400px] h-[400px] top-[15%] right-[5%] bg-[radial-gradient(circle_at_center,_#CDDBFE_0%,_#B9E6FE_70%,_transparent_100%)] blur-[200px] opacity-60"
      />
      <div
        className="absolute inset-x-0 top-0 bottom-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,_#FAFDFF_0%,_transparent_40%)] opacity-80"
      />
                  <div className={contentWrapper}>
                <p className={eyebrowText}>{heroTitle}</p>
                <h1 className={headingPrimary}>
          {headlineTop}<br className="hidden md:block" />
          with <span className={headingAccent}>{headlineAccent}</span>
        </h1>
                <p className={subheadingText}>
                  {heroSubtitle}
                </p>
                <div className={earlyAccessBadge}>
          <div className="relative w-1.5 h-1.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-[var(--color-status-success)] animate-ping opacity-25" />
            <span className="relative block w-1.5 h-1.5 rounded-full bg-[var(--color-status-success)] shadow-[0_0_5px_var(--color-status-success)]" />
          </div>
          <span className="text-[16px] font-medium leading-[100%] tracking-[0%] text-center whitespace-nowrap">
            {badgeText}
          </span>
        </div>
                <div className={emailFormWrapper}>
          <Input
            type="email"
            placeholder="example@email.com"
            className="h-[39px] flex-1 rounded-lg bg-white text-[var(--color-text-slate)] text-[14px] font-normal placeholder:text-[var(--color-text-slate)] 
    !border-none !shadow-none !ring-0 
    focus:!border-none focus:!shadow-none focus:!ring-0 
    !focus-visible:!ring-0 !focus-visible:!border-none !outline-none"
          />
          <Button className={ctaButton}>
            {ctaText}
          </Button>
        </div>
                <p className={secureText}>Get Free Early Access</p>
      </div>
            <div id="dashboard-mockup" className="relative z-10 mx-auto max-w-[1120px] px-4 lg:px-0">
        <div
          className="rounded-[40px] border-2 border-white p-4 bg-[linear-gradient(89.72deg,_#E2F2F8_0.4%,_#D2DCF9_99.93%)] origin-top transition-transform duration-100 ease-out [transform:perspective(1200px)_rotateX(var(--rotate-x))]"
          style={{ "--rotate-x": `${Math.max(0, 25 - imageOffset * 0.05)}deg` } as React.CSSProperties}
        >
                    <div
            className="rounded-[30px] border border-gray-200/80 shadow-2xl shadow-blue-100/40 overflow-hidden bg-white mx-auto w-full max-w-[1088px] md:h-auto lg:h-[680px]"
          >
                        <div className="hidden md:block">
                  <img
                    src={dashboardImage}
                    alt="DoSales dashboard showing lead management and analytics"
                    width={1120}
                    height={720}
                    loading="eager"
                    className="w-full h-auto object-contain scale-[1.02]"
                  />
            </div>
                        <div className="block md:hidden">
              <img
                src={dashboardImage}
                alt="DoSales dashboard mobile responsive view"
                width={380}
                height={480}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
                <div className="flex flex-col items-center text-center mt-[88px] pb-[78px] md:pb-[181px] px-4">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-24 mb-[54px] w-full max-w-6xl">
            <div className="flex flex-col items-center space-y-3">
              <h2 className="font-sans font-bold text-[28px] md:text-[32px] text-[var(--color-brand)] uppercase leading-none">50 LEADS/MO</h2>
              <p className="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-text-secondary)] uppercase leading-none">FREE FOREVER</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h2 className="font-sans font-bold text-[28px] md:text-[32px] text-[var(--color-brand)] uppercase leading-none">2 MIN</h2>
              <p className="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-text-secondary)] uppercase leading-none">SETUP</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h2 className="font-sans font-bold text-[28px] md:text-[32px] text-[var(--color-brand)] uppercase leading-none">NO CARD</h2>
              <p className="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-text-secondary)] uppercase leading-none">REQUIRED</p>
            </div>
          </div>
                    <div className="flex flex-col items-center space-y-4">
            <button className="w-[280px] md:w-[136px] h-[52px] bg-[var(--color-text-primary)] text-white rounded-[10px] font-bold text-[14px] uppercase tracking-wider flex items-center justify-center shadow-xl active:scale-95 transition-all cursor-pointer">
              REGISTER NOW
            </button>
            <div className="flex flex-row items-center justify-center gap-[10px] pt-2">
              <p className="font-sans font-normal text-[16px] text-[var(--color-text-secondary)] leading-none">
                Loved by 132+ existing users
              </p>
              <div className="flex gap-[4px] items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                      fill="url(#star_grad)" 
                      stroke="#FFB627" 
                      strokeWidth="1.2" 
                      strokeLinejoin="round" 
                    />
                    <defs>
                      <linearGradient id="star_grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFF282" />
                        <stop offset="1" stopColor="#FFB627" />
                      </linearGradient>
                    </defs>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
