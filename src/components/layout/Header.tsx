"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { Zap } from "lucide-react";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed left-0 right-0 z-[60] overflow-visible transition-all duration-500 ${
        scrolled
          ? "top-4 mx-4 sm:mx-8 md:mx-auto md:max-w-5xl rounded-2xl bg-navy-950/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_1px_rgba(14,165,233,0.1)]"
          : "top-0 bg-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 ${scrolled ? "px-5 py-3" : "px-6 py-4"}`}
      >
                <div className="h-7">
          <Logo variant="full" theme="dark" className="h-7" />
        </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-navy-700/50 bg-navy-800/30 px-3 py-1">
          <Zap className="h-3 w-3 text-brand-400" />
          <span className="hidden sm:inline text-xs text-slate-400 font-mono tracking-wide">Coming Soon</span>
        </div>
      </div>
            <div className="relative w-full overflow-visible h-0">
                <motion.div
          initial={{ opacity: 0.5, width: "4rem" }}
          animate={{ opacity: 1, width: "20rem" }}
          transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
          style={{ backgroundImage: "conic-gradient(from 70deg at center top, var(--tw-gradient-stops))" }}
          className="absolute top-0 right-1/2 h-24 bg-gradient-conic from-cyan-500 via-transparent to-transparent [mask-image:linear-gradient(to_bottom,white_40%,transparent)]"
        />
                <motion.div
          initial={{ opacity: 0.5, width: "4rem" }}
          animate={{ opacity: 1, width: "20rem" }}
          transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
          style={{ backgroundImage: "conic-gradient(from 290deg at center top, var(--tw-gradient-stops))" }}
          className="absolute top-0 left-1/2 h-24 bg-gradient-conic from-transparent via-transparent to-cyan-500 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]"
        />
                <motion.div
          initial={{ width: "2rem", opacity: 0 }}
          animate={{ width: "24rem", opacity: 0.5 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-16 rounded-full bg-cyan-500 blur-3xl"
        />
                <motion.div
          initial={{ width: "2rem", opacity: 0 }}
          animate={{ width: "14rem", opacity: 0.6 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-10 rounded-full bg-cyan-400 blur-2xl"
        />
                <motion.div
          initial={{ width: "4rem" }}
          animate={{ width: "24rem" }}
          transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-400"
        />
      </div>
    </header>
  );
}
