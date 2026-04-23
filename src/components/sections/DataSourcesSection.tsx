import React from "react";
import { motion } from "framer-motion";
import { IconContainer, Radar } from "@/components/ui/radar-effect";
import { urlFor } from "@/sanity/lib/image";

const fallbackIcons = [
  { 
    icon: "/icons/service.svg", 
    title: "Web Scraping", 
    description: "Collects publicly available data from relevant websites",
    bottom: "86%", left: "50%",
    pSide: 'top' as const
  },
  { 
    icon: "/icons/verify-email-icon.svg", 
    title: "Email Verify", 
    description: "Validates email addresses for accuracy and deliverability",
    bottom: "62%", left: "78%",
    pSide: 'left' as const
  },
  { 
    icon: "/icons/people-iocn.svg", 
    title: "Social Networks", 
    description: "Insights from social and professional user profiles",
    bottom: "55%", left: "26%",
    pSide: 'top' as const
  },
  { 
    icon: "/icons/global-icon.svg", 
    title: "Intent Signals", 
    description: "Tracks user behavior to identify buying intent signals",
    bottom: "40%", left: "64%",
    pSide: 'top' as const
  },
  { 
    icon: "/icons/database-icon.svg", 
    title: "Contact DBs", 
    description: "Verified contact data including emails and phone numbers",
    bottom: "35%", left: "10%",
    pSide: 'right' as const
  },
  { 
    icon: "/icons/security-icon.svg", 
    title: "Compliance", 
    description: "Ensures data meets global privacy and compliance standards",
    bottom: "25%", left: "45%",
    pSide: 'top' as const
  },
  { 
    icon: "/icons/industrial-icon.svg", 
    title: "Registries", 
    description: "Company data from official business registries",
    bottom: "12%", left: "32%",
    pSide: 'top' as const
  },
  { 
    icon: "/icons/govt-iocn.svg", 
    title: "Gov Registries", 
    description: "Verified company data from government registry sources",
    bottom: "12%", left: "84%",
    pSide: 'left' as const
  },
];

export default function DataSourcesSection({ data }: { data: any }) {
  const eyebrowText = data?.eyebrow || "Waterfall Enrichment";
  const headingText = data?.heading || "Chains 10+ data providers, 85%+ match rates";
  const subheadingText = data?.description || "We don't rely on a single source. DoSales waterfalls through 10+ data providers to verify emails, phones, and company intel across MENA and Southeast Asia.";

  const displayIcons = data?.icons?.length > 0 
    ? data.icons.map((icon: any) => ({
        icon: icon.image ? urlFor(icon.image).url() : "/icons/service.svg",
        title: icon.title || "Data Source",
        description: icon.description || "",
        bottom: icon.bottom || "50%",
        left: icon.left || "50%",
        pSide: (icon.pSide || 'top') as any
      }))
    : fallbackIcons;

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-visible pt-32 pb-0 dark-section bg-[linear-gradient(89.47deg,_#0A0B18_0.71%,_#0A0B18_99.81%)]"
    >
            <div className="relative w-full max-w-5xl mx-auto">
        <div
          className="relative w-full aspect-[3/2] md:aspect-[2/1] overflow-hidden rounded-[1000px_1000px_0_0]"
        >
                    <div className="absolute inset-0 flex items-end justify-center">
            <Radar className="opacity-40 translate-y-1/2" size={1200} />
          </div>
                    <div className="absolute inset-0 z-0 pointer-events-none flex items-end justify-center opacity-40">
            <div className="relative w-full aspect-square translate-y-1/2">
              <img
                src="/backdrop/radar.svg"
                alt="DoSales radar scanning visualization representing cross-region data intelligence"
                className="w-full h-full object-contain rotate-90"
              />
            </div>
          </div>
        </div>
                <div className="absolute inset-0 z-50 pointer-events-none flex items-end justify-center">
          <div className="relative w-full aspect-[2/1]">
            {displayIcons.map((item, idx) => {
            const L = parseFloat(item.left);
            const B = parseFloat(item.bottom);
            const dx = L - 50;
            const dy = B;
            const angle = (Math.atan2(dy, -dx) * 180) / Math.PI;
            const normalizedAngle = angle < 0 ? angle + 360 : angle;
            return (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ bottom: item.bottom, left: item.left }}
              >
                <IconContainer
                  delay={0.1 * idx}
                  rotationDelay={8 - (normalizedAngle / 360) * 8}
                  title={item.title}
                  description={item.description}
                  pSide={item.pSide}
                  icon={
                    <img
                      src={item.icon}
                      width={44}
                      height={44}
                      alt={`${item.title} data source icon`}
                      loading="lazy"
                      decoding="async"
                      className="w-[32px] md:w-[44px] h-[32px] md:h-[44px] brightness-200"
                    />
                  }
                />
              </div>
            );
          })}
          </div>
        </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[60] flex flex-col items-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex h-20 w-20 items-center justify-center rounded-full  pointer-events-auto"
          >
            <img
              src="/icons/do-sales-icon.svg"
              alt="DoSales central AI intelligence logo"
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="w-[56px] h-[56px] md:w-[80px] md:h-[80px]"
            />
          </motion.div>
        </div>
      </div>
            <div className="w-full h-[394px] flex flex-col items-center justify-center -mt-px bg-[linear-gradient(180deg,_rgba(3,0,20,0.8)_0%,_#030014_37.87%)]"
      >
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-4xl px-4">
          <div 
            className="flex items-center justify-center opacity-100 w-auto min-w-[180px] h-[32px] rounded-[30px] px-[14px] py-[5px] gap-[10px] bg-[linear-gradient(90deg,_#105677_0%,_#10171A_100%)] border border-[#366E86] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] font-satoshi font-medium text-[16px] leading-[100%] text-white text-center whitespace-nowrap"
          >
            {eyebrowText}
          </div>
          <h2
            className="text-[32px] md:text-[38px] lg:text-[48px] lg:whitespace-nowrap font-satoshi font-medium leading-[100%] text-center bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(255,255,255,0.7)_100%)] bg-clip-text text-transparent"
          >
            {headingText}
          </h2>
          <p 
            className="font-satoshi font-normal text-[16px] leading-[24px] text-center text-[#EFEDFDB2] max-w-[680px] mx-auto"
          >
            {subheadingText}
          </p>
        </div>
      </div>
    </section>
  );
}
