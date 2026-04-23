import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

const stats = [
  { value: "50 leads/mo", label: "FREE FOREVER" },
  { value: "2 min", label: "SETUP" },
  { value: "No card", label: "REQUIRED" },
];

export default function WhyDoSalesSection({ data }: { data: any }) {
  const featureImages = data?.features?.map((f: any) => f.image ? urlFor(f.image).url() : null) || [];

  const eyebrow = cn(
    "inline-flex items-center justify-center text-[16px] font-medium leading-[100%] tracking-[0%] text-center text-[var(--color-brand)]",
    "w-[124px] h-[32px] rounded-[30px] border-[1.5px] border-white",
    "px-[14px] py-[5px] gap-[10px] mb-[20px] whitespace-nowrap",
    "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]"
  );

  const heading = cn(
    "text-[32px] md:text-[48px] font-bold leading-[1.1] md:leading-[100%] tracking-[0%] text-[var(--color-text-primary)]",
    "text-center max-w-5xl mx-auto "
  );

  return (
    <section className="w-full bg-white flex flex-col items-center">
            <div className="w-full rounded-t-[500px_120px] rounded-b-none border-t-[1px] border-t-[var(--color-accent-blue-alpha)] relative overflow-hidden shadow-[0px_12px_40px_rgba(0,0,0,0.02)] bg-[var(--color-bg-subtle)] lg:pb-[141px]">
                <div className="relative z-10 w-full pt-[82px] pb-[120px] lg:pb-0 px-4 sm:px-6 flex flex-col items-center">
          <p className={cn(eyebrow, "bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)]")}>{data?.eyebrow || "Why DoSales"}</p>
          <h2 className={heading}>
            {data?.heading || "Built exclusively for your market"}
          </h2>
                    <div className="mx-auto w-full max-w-[956px] h-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 mt-[112px] relative px-4 md:px-0">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="md:hidden">
                                <div
                  className="absolute left-0 top-[40px] w-[1px] h-[280px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute left-0 top-[400px] w-[1px] h-[700px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute right-0 top-[100px] w-[1px] h-[1000px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_10%,_rgba(239,249,254,0.4)_100%)]"
                />
                                <div
                  className="absolute top-0 right-0 w-[240px] h-[1px] bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute bottom-[-40px] left-10 right-10 h-[1px] bg-[linear-gradient(90deg,_rgba(136,191,247,0.1)_0%,_rgba(136,191,247,0.86)_50%,_rgba(136,191,247,0.1)_100%)]"
                />
              </div>
                            <div
                className="hidden md:block absolute left-0 top-[80px] w-[1px] h-[280px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
              />
                            <div className="hidden md:block">
                                <div
                  className="absolute left-1/2 top-0 w-[1px] h-[384px] -translate-x-1/2 bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute right-0 top-0 w-[1px] h-[256px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute top-0 left-1/2 w-[800px] h-[1px] -translate-x-1/2 bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute top-[420px] left-1/2 w-[800px] h-[1px] -translate-x-1/2 bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute right-0 top-[420px] w-[1px] h-[384px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
                                <div
                  className="absolute bottom-[-40px] left-1/2 w-[600px] h-[1px] -translate-x-1/2 bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"
                />
              </div>
            </div>
                        <div className="p-0 h-full">
              <div
                className="flex flex-col items-start lg:px-8 px-4 lg:py-10 h-full relative z-10 lg:px-0 bg-[radial-gradient(100%_146.88%_at_100%_100%,_rgba(255,255,255,0.03)_0%,_rgba(3,0,20,0.01)_100%)]"
              >
                <div className="w-full flex justify-center">
                  <Image
                    src={featureImages[0] || "/screens/regional-dominance.svg"}
                    alt="Regional Dominance"
                    width={400}
                    height={250}
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[400px] h-auto"
                  />
                </div>
                <h3 className="font-sans font-bold text-[20px] leading-[30px] text-[var(--color-brand)] mb-3">
                  Regional Dominance
                </h3>
                <p className="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] max-w-[420px]">
                  Built for MENA & Southeast Asia from day one — not bolted on as an afterthought. Coverage where Apollo and ZoomInfo have blind spots.
                </p>
                                <div className="md:hidden absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[320px] h-[1px] bg-[var(--color-accent-blue-alpha)]" />
              </div>
            </div>
                        <div className="p-0 h-full">
              <div
                className="flex flex-col items-start lg:px-8 px-4 py-10 h-full relative z-10 lg:px-0"
                style={{ background: "radial-gradient(100% 146.88% at 100% 100%, rgba(255, 255, 255, 0.03) 0%, rgba(3, 0, 20, 0.01) 100%)" }}
              >
                <div className="w-full flex justify-center">
                  <Image
                    src={featureImages[1] || "/screens/vertical-intelligence.svg"}
                    alt="Vertical Intelligence"
                    width={400}
                    height={250}
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[400px] h-auto"
                  />
                </div>
                <h3 className="font-sans font-bold text-[20px] leading-[30px] text-[var(--color-brand)] mb-3">
                  Vertical Intelligence
                </h3>
                <p className="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] max-w-[420px]">
                  Deep data models for Fintech, PropTech, Trade Finance, and Supply Chain. Industry-specific signals that horizontal tools miss entirely.
                </p>
              </div>
            </div>
                        <div className="p-0 md:col-span-2 w-full">
              <div
                className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:px-8 px-4 py-4 relative z-10 mt-8 md:mt-0 bg-[radial-gradient(100%_146.88%_at_100%_100%,_rgba(255,255,255,0.03)_0%,_rgba(3,0,20,0.01)_100%)]"
              >
                                <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[1px] bg-[var(--color-accent-blue-alpha)]" />
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image
                    src={featureImages[2] || "/screens/ai-autonomy.svg"}
                    alt="AI Autonomy"
                    width={400}
                    height={250}
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[400px] h-auto"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-start px-4 justify-start pt-2 md:pt-8 lg:px-0">
                  <h3 className="font-sans font-bold text-[20px] leading-[30px] text-[var(--color-brand)] mb-3">
                    AI Autonomy
                  </h3>
                  <p className="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] text-left">
                    Autonomous prospecting that finds, enriches, scores, and engages leads. Your AI SDR works 24/7 while your team focuses on closing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
