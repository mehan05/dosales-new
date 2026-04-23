"use client";
import { Zap, Send, Globe, ArrowLeftRight, BarChart3 } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Badge } from "@/components/ui/badge";
function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
            <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
            <div className="absolute -top-8 right-12 h-32 w-32 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute top-16 right-32 h-16 w-16 rounded-full bg-cyan-400/15 blur-2xl" />
    </div>
  );
}
function PulseRings() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 animate-ping"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        />
        <div
          className="absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5 animate-ping"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>
      <div className="absolute top-4 right-8 h-20 w-20 rounded-full bg-cyan-500/15 blur-3xl" />
    </div>
  );
}
function WaveLines() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M0,100 C100,50 200,150 400,100" stroke="rgba(16,185,129,0.4)" strokeWidth="1" fill="none" />
        <path d="M0,120 C100,70 200,170 400,120" stroke="rgba(16,185,129,0.25)" strokeWidth="1" fill="none" />
        <path d="M0,80 C100,30 200,130 400,80" stroke="rgba(16,185,129,0.15)" strokeWidth="1" fill="none" />
      </svg>
      <div className="absolute -bottom-4 left-12 h-28 w-28 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute top-4 left-1/2 h-16 w-48 rounded-full bg-emerald-400/10 blur-2xl" />
    </div>
  );
}
function DataFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
            <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 200">
        <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" strokeDasharray="4 8" />
        <line
          x1="0"
          y1="140"
          x2="400"
          y2="140"
          stroke="rgba(139,92,246,0.15)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
                <rect x="40" y="80" width="12" height="60" rx="2" fill="rgba(139,92,246,0.2)" />
        <rect x="70" y="60" width="12" height="80" rx="2" fill="rgba(139,92,246,0.25)" />
        <rect x="100" y="90" width="12" height="50" rx="2" fill="rgba(139,92,246,0.15)" />
        <rect x="130" y="50" width="12" height="90" rx="2" fill="rgba(139,92,246,0.3)" />
        <rect x="160" y="70" width="12" height="70" rx="2" fill="rgba(139,92,246,0.2)" />
        <rect x="300" y="70" width="12" height="70" rx="2" fill="rgba(139,92,246,0.15)" />
        <rect x="330" y="50" width="12" height="90" rx="2" fill="rgba(139,92,246,0.2)" />
        <rect x="360" y="80" width="12" height="60" rx="2" fill="rgba(139,92,246,0.25)" />
      </svg>
      <div className="absolute -top-6 right-20 h-24 w-24 rounded-full bg-violet-500/15 blur-3xl" />
    </div>
  );
}
const features = [
  {
    Icon: Zap,
    name: "Vertical Lead Discovery",
    description:
      "Search 2M+ contacts across Fintech, PropTech, and Trade Finance. Filter by funding stage, tech stack, company size, and regulatory status.",
    href: "#",
    cta: "Explore database",
    className: "md:col-span-2",
    background: <GridPattern />,
  },
  {
    Icon: Send,
    name: "Buying Signal Detection",
    description:
      "AI monitors job changes, funding rounds, hiring patterns, tech stack shifts, and regulatory filings across 12 emerging markets.",
    href: "#",
    cta: "See signals",
    className: "md:col-span-1",
    background: <PulseRings />,
  },
  {
    Icon: Globe,
    name: "AI Outbound Agent",
    description:
      "Autonomous multi-channel sequences across email, LinkedIn, and WhatsApp. Personalized at scale — books meetings while you sleep.",
    href: "#",
    cta: "Watch demo",
    className: "md:col-span-1",
    background: <WaveLines />,
  },
  {
    Icon: ArrowLeftRight,
    name: "Pipeline Analytics",
    description:
      "Track conversion from discovery to closed-won. Optimize your ICP in real-time with market-specific benchmarks.",
    href: "#",
    cta: "View analytics",
    className: "md:col-span-2",
    background: <DataFlow />,
  },
];
export default function SolutionsBento() {
  return (
    <section className="border-t border-navy-800/50 bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-navy-700 text-slate-300">
            <BarChart3 className="mr-1.5 size-3.5" />
            Platform
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">From ICP to meetings in 3 steps</h2>
        </div>
        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
