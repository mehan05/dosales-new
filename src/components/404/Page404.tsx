import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Three404 from "../Three404";

export default function Page404() {
  const [loadingStage, setLoadingStage] = useState<'loading' | 'fading' | 'gone'>('loading');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLoadingStage('fading'), 100);
    const removeTimer = setTimeout(() => setLoadingStage('gone'), 800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[var(--blue-deep)] font-inter overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute inset-0 z-[3] ">
          <svg className="w-full h-full text-white/5">
            <defs>
              <pattern id="hero-grid-404" x="0" y="0" width="76" height="76" patternUnits="userSpaceOnUse">
                <rect x="5" y="5" width="66" height="66" rx="12" ry="12" fill="currentColor" fillOpacity="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid-404)" />
          </svg>
        </div>
      </div>

      {/* Loading veil */}
      {loadingStage !== 'gone' && (
        <div 
          className={`fixed inset-0 bg-[var(--blue-deep)] z-[100] flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
            loadingStage === 'loading' ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-12 h-12 border-[3px] border-white/15 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Canvas container */}
      <div className="fixed inset-0 w-screen h-screen cursor-grab active:cursor-grabbing z-10">
        <Three404 />
      </div>

      {/* UI Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 flex flex-col p-[20px_22px] sm:p-[36px_56px]">
        {/* Navbar elements positioned absolutely to avoid pushing content */}
        <div className="absolute top-0 left-0 right-0 p-[inherit] flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col pointer-events-auto"
          >
            <span className="text-white text-[32px] sm:text-[40px] font-black leading-none tracking-tight">404</span>
            <span className="text-white text-[10px] sm:text-[12px] font-bold tracking-[0.3em] opacity-70 -mt-1 ml-1">PAGE</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pointer-events-auto pt-2"
          >
            <a 
              href="/#footer" 
              className="px-6 py-2 border border-white/20 rounded-full text-white text-[13px] font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Contact us
            </a>
          </motion.div>
        </div>

        {/* Content (top-left) - Adjusted margin to account for navbar height while keeping text in place */}
        <div className="pt-[100px] sm:pt-[120px] pb-5 max-w-[600px]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-white text-[36px] sm:text-[clamp(48px,6vw,78px)] font-bold leading-[1.1] mb-3 tracking-[-0.02em]"
          >
            Something&apos;s<br/>missing.
          </motion.h1>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            href="/" 
            className="text-[var(--yellow)] underline text-lg font-bold pointer-events-auto inline-flex items-center transition-all duration-[250ms] hover:opacity-80 hover:translate-x-1"
          >
            Go back home
          </motion.a>
        </div>
      </div>

    </div>
  );
}
