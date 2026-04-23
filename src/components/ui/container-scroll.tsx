"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
interface ContainerScrollProps {
  titleComponent: ReactNode;
  children: ReactNode;
  className?: string;
}
export function ContainerScroll({ titleComponent, children, className }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  return (
    <div ref={containerRef} className={cn("relative flex flex-col items-center", className)}>
      <div className="w-full max-w-5xl">{titleComponent}</div>
      <div className="w-full max-w-5xl" style={{ perspective: "1200px" }}>
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
          }}
          className="rounded-2xl border border-navy-700/50 bg-navy-900/80 p-2 shadow-2xl shadow-brand-500/10 md:p-4"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
