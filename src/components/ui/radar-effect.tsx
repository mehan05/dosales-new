"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";
export const Circle = ({ className, children, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-neutral-200",
        className
      )}
    />
  );
};
export const Radar = ({ className, size = 400 }: { className?: string; size?: number }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex items-center justify-center rounded-full h-[var(--size)] w-[var(--size)]",
        className
      )}
      style={{ "--size": `${size}px` } as any}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 8s linear infinite;
        }
      `}</style>
            <div
        style={{ 
          "--half-size": `${size / 2}px`
        } as any}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex items-center justify-center mix-blend-screen origin-right w-[var(--half-size)] h-[2px]"
      >
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sky-400 to-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
      </div>
            {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${((idx + 1) / circles.length) * 100}%`,
            width: `${((idx + 1) / circles.length) * 100}%`,
            border: `1px solid rgba(148, 163, 184, 0.1)`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};
export const IconContainer = ({
  icon,
  title,
  description,
  delay,
  rotationDelay,
  pSide = 'top',
}: {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  delay?: number;
  rotationDelay?: number;
  pSide?: 'left' | 'right' | 'top';
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const getPositionClasses = () => {
    switch (pSide) {
      case 'left': return "right-full top-1/2 -translate-y-1/2 mr-2";
      case 'right': return "left-full top-1/2 -translate-y-1/2 ml-2";
      default: return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };
  const getAnimation = () => {
    switch (pSide) {
      case 'left': return { initial: { x: -5 }, animate: { x: -10 } };
      case 'right': return { initial: { x: 5 }, animate: { x: 10 } };
      default: return { initial: { y: 5 }, animate: { y: -10 } };
    }
  };
  const anim = getAnimation();
  return (
    <div 
      className="relative z-50 flex flex-col items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <style>{`
        @keyframes icon-glow {
          0% { 
            filter: drop-shadow(0 0 15px rgba(14, 165, 233, 0.9)); 
            transform: scale(1.1); 
            opacity: 1; 
            background-color: rgba(14, 165, 233, 0.15);
          }
          10%, 90% { 
            filter: drop-shadow(0 0 0px rgba(14, 165, 233, 0)); 
            transform: scale(1); 
            opacity: 0.6; 
            background-color: transparent;
          }
        }
        @keyframes ripple-effect {
          0% { transform: scale(1); opacity: 0.6; border-width: 2px; }
          25% { transform: scale(2.5); opacity: 0; border-width: 1px; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-icon-glow { animation: icon-glow 8s linear infinite; }
        .animate-ripple { animation: ripple-effect 8s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
            {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, ...anim.initial }}
          animate={{ opacity: 1, scale: 1, ...anim.animate }}
          className={twMerge(
            "absolute z-[200] w-[300px] h-[104px] p-[14px] rounded-[20px] border border-[var(--color-tooltip-border)] bg-[var(--color-tooltip-bg)]/95 backdrop-blur-[44px] shadow-2xl pointer-events-none flex flex-col justify-center gap-[4px]",
            getPositionClasses()
          )}
        >
          <h5 className="font-sans font-medium text-[16px] leading-[24px] text-[var(--color-text-tooltip-heading)]">{title}</h5>
          <p className="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-tooltip-body)] line-clamp-2">{description}</p>
        </motion.div>
      )}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: delay ?? 0 }}
        className="animate-icon-glow flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/50 backdrop-blur-sm shadow-xl relative z-10 cursor-pointer"
        style={{ animationDelay: `-${rotationDelay || 0}s` }}
      >
        {icon || (
          <div className="w-5 h-5 bg-white/20 rounded-full" />
        )}
      </motion.div>
    </div>
  );
};