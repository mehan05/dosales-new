"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface PageLoaderProps {
  children: React.ReactNode;
}
const ALL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>{}[]";
const CHAR_COUNT = 200;
const LOADER_DURATION = 3000;
interface FallingChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fontSize: number;
}
function DoSalesLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-20 h-20">
      <rect x="4" y="8" width="6" height="24" rx="3" fill="white" />
      <path
        d="M14 8h6c8.837 0 16 7.163 16 16s-7.163 16-16 16h-6"
        stroke="#0EA5E9"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function PageLoader({ children }: PageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"rain" | "converge" | "reveal">("rain");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const charsRef = useRef<FallingChar[]>([]);
  const frameRef = useRef<number>(0);
  const startTime = useRef(Date.now());
  const initChars = useCallback(() => {
    const chars: FallingChar[] = [];
    for (let i = 0; i < CHAR_COUNT; i++) {
      chars.push({
        char: ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)],
        x: Math.random() * 100,
        y: Math.random() * -100, // Start above viewport
        speed: 0.3 + Math.random() * 0.8,
        opacity: 0.1 + Math.random() * 0.4,
        fontSize: 10 + Math.random() * 14,
      });
    }
    charsRef.current = chars;
  }, []);
  useEffect(() => {
    initChars();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    const w = () => window.innerWidth;
    const h = () => window.innerHeight;
    const cx = () => w() / 2;
    const cy = () => h() / 2;
    const animate = () => {
      if (!ctx) return;
      const elapsed = Date.now() - startTime.current;
      ctx.clearRect(0, 0, w(), h());
      const chars = charsRef.current;
      if (elapsed < 1800) {
        for (const c of chars) {
          c.y += c.speed;
          if (c.y > 110) {
            c.y = Math.random() * -20;
            c.x = Math.random() * 100;
            c.char = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
          }
          if (Math.random() < 0.02) {
            c.opacity = Math.min(0.6, c.opacity + 0.2);
          } else {
            c.opacity = Math.max(0.05, c.opacity - 0.005);
          }
          ctx.font = `${c.fontSize}px monospace`;
          ctx.fillStyle = `rgba(14, 165, 233, ${c.opacity})`;
          ctx.fillText(c.char, (c.x / 100) * w(), (c.y / 100) * h());
        }
      } else if (elapsed < 2400) {
        const progress = (elapsed - 1800) / 600; // 0 to 1
        const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
        for (const c of chars) {
          const targetX = cx() + (Math.random() - 0.5) * 60;
          const targetY = cy() + (Math.random() - 0.5) * 60;
          const currentX = (c.x / 100) * w();
          const currentY = (c.y / 100) * h();
          const drawX = currentX + (targetX - currentX) * eased;
          const drawY = currentY + (targetY - currentY) * eased;
          const fadeOut = 1 - eased;
          ctx.font = `${c.fontSize}px monospace`;
          ctx.fillStyle = `rgba(14, 165, 233, ${c.opacity * fadeOut})`;
          ctx.fillText(c.char, drawX, drawY);
        }
        const glowRadius = 40 + eased * 80;
        const gradient = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), glowRadius);
        gradient.addColorStop(0, `rgba(14, 165, 233, ${0.3 * eased})`);
        gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w(), h());
      } else {
        const progress = (elapsed - 2400) / 600;
        const eased = Math.min(1, progress);
        for (const c of chars) {
          const angle = Math.atan2((c.y / 100) * h() - cy(), (c.x / 100) * w() - cx());
          const dist = eased * 800;
          const drawX = cx() + Math.cos(angle) * dist;
          const drawY = cy() + Math.sin(angle) * dist;
          ctx.font = `${c.fontSize}px monospace`;
          ctx.fillStyle = `rgba(14, 165, 233, ${0.3 * (1 - eased)})`;
          ctx.fillText(c.char, drawX, drawY);
        }
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    const t1 = setTimeout(() => setPhase("converge"), 1800);
    const t2 = setTimeout(() => setPhase("reveal"), 2400);
    const t3 = setTimeout(() => setLoading(false), LOADER_DURATION);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [initChars]);
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ backgroundColor: "#0A0F1E" }}
          >
                        <canvas ref={canvasRef} className="absolute inset-0" />
                        <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === "reveal"
                  ? { opacity: 1, scale: 1 }
                  : phase === "converge"
                    ? { opacity: 0.8, scale: 0.9 }
                    : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 30px 8px rgba(14,165,233,0.15)",
                    "0 0 60px 16px rgba(14,165,233,0.35)",
                    "0 0 30px 8px rgba(14,165,233,0.15)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full p-6 bg-navy-950/80"
              >
                <DoSalesLogo />
              </motion.div>
              <p className="mt-5 font-mono text-sm tracking-widest text-brand-400/80">DoSales</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
