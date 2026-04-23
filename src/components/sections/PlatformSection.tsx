import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const steps = [
  { id: 1, label: "1. Define & Discover", width: "515px" },
  { id: 2, label: "2. Enrich and Qualify", width: "420px" },
  { id: 3, label: "3. Research & Convert", width: "340px" },
];
const tiers = [
  { id: 1, label: "1. Define & Discover", width: 660 },
  { id: 2, label: "2. Enrich and Qualify", width: 540 },
  { id: 3, label: "3. Research & Convert", width: 420 },
];
export default function PlatformSection({ data }: { data: any }) {
  const [activeStep, setActiveStep] = useState(1);
  
  const headingText = data?.heading || "An Automated Funnel that turns your ICP to Booked Meetings in 3 steps";
  const subheadingText = data?.subheading || "Define your ICP and DoSales AI handles discovery, outreach, and qualification automatically.";
  const buttonText = data?.buttonText || "Setup your Sales Engine";
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full bg-white flex flex-col items-center overflow-hidden">
            <div className="relative text-center mb-20 max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-flex items-center justify-center rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] mb-8 mx-auto w-[90px] h-[32px] bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] px-[14px] py-[5px] gap-[10px]"
          >
            <span className="font-sans font-medium text-[16px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap">
              Platform
            </span>
          </div>
          <h2 className="font-sans font-bold text-[32px] md:text-[42px] lg:text-[52px] leading-[1.1] md:leading-[100%] tracking-tight text-[var(--color-text-primary)] text-center mb-8 w-full lg:w-[1060px] mx-auto">
            {headingText}
          </h2>
          <p className="font-sans font-medium text-[16px] leading-[24px] tracking-[0%] text-[var(--color-text-secondary)] text-center max-w-[580px] mx-auto mb-10">
            {subheadingText}
          </p>
          <button
            className="inline-flex items-center justify-center rounded-[10px] bg-[var(--color-action)] text-white transition-all hover:scale-[1.02] active:scale-95 mx-auto cursor-pointer w-[172px] h-[48px] px-[10px] py-[15px] gap-[10px]"
          >
            <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[0%] text-center">
              {buttonText}
            </span>
          </button>
        </motion.div>
      </div>
            <div className="w-full max-w-[1360px] px-8 flex flex-col lg:flex-row items-center justify-center gap-[40px] lg:gap-[133px] lg:pb-40 mx-auto">
                <div className="flex flex-col items-center shrink-0 w-full lg:w-auto px-4 md:px-0">
          <p className="font-sans font-medium text-[16px] md:text-[20px] leading-none text-[var(--color-text-primary)] uppercase text-center md:order-last mb-6 md:mb-0 md:mt-6 whitespace-nowrap">
            DOSALES AI AUTOMATED FUNNEL
          </p>
          <div className="flex flex-col items-center gap-[12px] md:gap-[16px] w-full lg:w-[600px] md:order-first">
            {tiers.map((tier) => {
              const active = activeStep === tier.id;
              const topColors = active
                ? ["#0D7CB4", "#A2DEF9"]
                : ["#FFFFFF", "#B1D6EF"];
              const frontColors = active
                ? ["#026AA2", "#36BEFA"]
                : ["#FFFFFF", "#B1D6EF"]
              return (
                <div
                  key={tier.id}
                  onClick={() => setActiveStep(tier.id)}
                  className="relative cursor-pointer transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98] flex justify-center"
                  style={{
                    width: `${(tier.width / 660) * 100}%`,
                    maxWidth: `${tier.width}px`,
                  }}
                >
                  <svg viewBox={`0 0 ${tier.width} 110`} width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id={`top-${tier.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <motion.stop
                          offset="0%"
                          animate={{ stopColor: topColors[0] }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.stop
                          offset="100%"
                          animate={{ stopColor: topColors[1] }}
                          transition={{ duration: 0.3 }}
                        />
                      </linearGradient>
                      <linearGradient id={`front-${tier.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <motion.stop
                          offset="0%"
                          animate={{ stopColor: frontColors[0] }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.stop
                          offset="100%"
                          animate={{ stopColor: frontColors[1] }}
                          transition={{ duration: 0.3 }}
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      points={`30,0 ${tier.width - 30},0 ${tier.width},18 0,18`}
                      fill={`url(#top-${tier.id})`}
                    />
                    <polygon
                      points={`0,18 ${tier.width},18 ${tier.width - 30},108 30,108`}
                      fill={`url(#front-${tier.id})`}
                    />
                  </svg>
                                    <div className={cn(
                    "absolute left-0 right-0 bottom-0 top-[16.36%] flex items-center justify-center transition-colors duration-500",
                    active ? "text-white" : "text-[var(--color-text-primary)]"
                  )}>
                    <span
                      className="font-sans font-medium text-[14px] md:text-[22px] tracking-tight text-center px-4 leading-[100%]"
                    >
                      {tier.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
                <div className="relative w-full max-w-[592px] h-[350px] sm:h-[400px] md:h-[520px] flex-shrink-0 lg:flex-shrink">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden"
            >
              {activeStep === 1 && (
                <>
                  <img src="/screens/sales-screen1.svg" alt="DoSales Discovery Search interface showing ICP filtering for sales leads" width={592} height={520} loading="lazy" decoding="async" className="hidden lg:block w-full h-full object-contain p-2" />
                  <img src="/screens/sales-responsive-screen1.svg" alt="Discovery Search mobile responsive view" width={350} height={350} loading="lazy" decoding="async" className="lg:hidden w-full h-full object-contain p-2" />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <img src="/screens/sales-screen2.svg" alt="Lead enrichment and qualification dashboard showing verified contact data" width={592} height={520} loading="lazy" decoding="async" className="hidden lg:block w-full h-full object-contain p-2" />
                  <img src="/screens/sales-responsive-screen2.svg" alt="Enrichment and qualification mobile view" width={350} height={350} loading="lazy" decoding="async" className="lg:hidden w-full h-full object-contain p-2" />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <img src="/screens/sales-screen3.svg" alt="Autonomous outreach agent interface managing email sequences and bookings" width={592} height={520} loading="lazy" decoding="async" className="hidden lg:block w-full h-full object-contain p-2" />
                  <img src="/screens/sales-responsive-screen3.svg" alt="Autonomous outreach mobile dashboard" width={350} height={350} loading="lazy" decoding="async" className="lg:hidden w-full h-full object-contain p-2" />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}