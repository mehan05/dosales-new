"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
const markers = [
  { location: [25.2048, 55.2708], size: 0.05 }, // Dubai
  { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
  { location: [24.7136, 46.6753], size: 0.05 }, // Riyadh
  { location: [19.076, 72.8777], size: 0.05 }, // Mumbai
  { location: [-6.2088, 106.8456], size: 0.05 }, // Jakarta
  { location: [13.7563, 100.5018], size: 0.05 }, // Bangkok
  { location: [3.139, 101.6869], size: 0.05 }, // Kuala Lumpur
  { location: [30.0444, 31.2357], size: 0.05 }, // Cairo
];
export default function MarketsGlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.15, 0.25],
      markerColor: [0.055, 0.647, 0.914],
      glowColor: [0.055, 0.4, 0.8],
      markers: markers as { location: [number, number]; size: number }[],
    });
    let frameId: number;
    const animate = () => {
      phi += 0.003;
      globe.update({ phi, width: width * 2, height: width * 2 });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Coverage across 12+ emerging markets
        </h2>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <canvas ref={canvasRef} className="size-full" style={{ contain: "layout paint size" }} />
        </div>
      </div>
    </section>
  );
}
