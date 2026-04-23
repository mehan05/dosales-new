"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
interface ParticlesProps {
  quantity?: number;
  color?: string;
  maxSize?: number;
  className?: string;
}
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseOpacity: number;
  phaseOffset: number;
}
const ATTRACT_RADIUS = 180;
const ATTRACT_STRENGTH = 0.015;
const PULSE_SPEED = 0.002;
const PULSE_AMPLITUDE = 0.25;
export function Particles({ quantity = 50, color = "14, 165, 233", maxSize = 1.5, className }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < quantity; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * maxSize + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          baseOpacity: Math.random() * 0.5 + 0.1,
          phaseOffset: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    },
    [quantity, maxSize],
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const handleResize = () => {
      const { clientWidth, clientHeight } = parent;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      setDimensions({ width: clientWidth, height: clientHeight });
      initParticles(clientWidth, clientHeight);
    };
    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);
    return () => {
      observer.disconnect();
    };
  }, [initParticles]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;
    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time++;
      const mouse = mouseRef.current;
      for (const particle of particlesRef.current) {
        if (mouse.active) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ATTRACT_RADIUS && dist > 1) {
            const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
            particle.speedX += (dx / dist) * force;
            particle.speedY += (dy / dist) * force;
          }
        }
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        const pulse = Math.sin(time * PULSE_SPEED + particle.phaseOffset) * PULSE_AMPLITUDE;
        const opacity = Math.max(0.05, Math.min(1, particle.baseOpacity + pulse));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, color]);
  return <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} />;
}
