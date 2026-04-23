"use client";
import { motion } from "framer-motion";
export default function EarlyAccessSection({ data }: { data: any }) {
  const eyebrowText = data?.eyebrow || "Upgrade your Leads";
  const headingText = data?.heading || "Start closing in emerging markets today";
  const buttonText = data?.buttonText || "Get Early Access";
  return (
    <section className="w-full relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center pb-24">
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[url('/backdrop/grid-block.png')] bg-cover bg-center opacity-100"
      />
      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6">
        <div className="flex items-center gap-8 mb-12 w-full justify-center">
          <div
            className="flex-1 h-[1.5px] max-w-[200px] bg-[linear-gradient(289deg,_rgba(255,255,255,0.2)_6.73%,_#9CD2F8_54%,_#2DD5FF_92%)] rotate-180"
          />
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] px-6 h-[32px] bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] gap-[10px]"
          >
            <span className="font-sans font-medium text-[14px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap w-fit">
              {eyebrowText}
            </span>
          </div>
          <div
            className="flex-1 h-[1.5px] max-w-[200px] bg-[linear-gradient(289deg,_rgba(255,255,255,0.2)_6.73%,_#9CD2F8_54%,_#2DD5FF_92%)]"
          />
        </div>
        <h2
          className="font-sans font-bold text-[36px] md:text-[42px] lg:text-[58px] leading-[1.1] md:leading-[100%] tracking-tight text-black text-center mb-12 max-w-4xl align-middle"
        >
          {headingText}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[var(--color-text-primary)] text-[var(--color-white)] rounded-[10px] shadow-xl transition-all cursor-pointer flex items-center justify-center whitespace-nowrap w-[138px] h-[48px] px-4 py-[14px] font-satoshi text-[14px] font-medium leading-[100%]"
        >
          {buttonText}
        </motion.button>
      </div>
    </section>
  );
}
