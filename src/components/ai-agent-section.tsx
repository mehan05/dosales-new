"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, MapPin, Building2, Percent, Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PROMPT_TEXT = "Find Series A+ Fintech CTOs in UAE and Singapore with 50-500 employees, DFSA or MAS licensed";

const TYPING_SPEED = 40; // ms per character
const INITIAL_DELAY = 500;
const THINKING_DURATION = 1500;
const CARD_STAGGER = 200;

interface LeadResult {
  name: string;
  title: string;
  company: string;
  location: string;
  score: number;
}

const mockLeads: LeadResult[] = [
  {
    name: "Rania Al-Farsi",
    title: "Head of BD",
    company: "Sarwa",
    location: "Dubai",
    score: 96,
  },
  {
    name: "Marcus Teo",
    title: "Co-founder",
    company: "Propseller",
    location: "Singapore",
    score: 92,
  },
  {
    name: "Arun Krishnan",
    title: "CTO",
    company: "Rapyd",
    location: "Dubai",
    score: 88,
  },
];

function ScoreBadge({ score }: { score: number }) {
  const colorClass =
    score >= 90
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : "bg-blue-500/15 text-blue-400 border-blue-500/30";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 sm:px-2.5 py-0.5 font-mono text-xs font-semibold whitespace-nowrap ${colorClass}`}
    >
      <Percent className="h-3 w-3" />
      {score}% match
    </span>
  );
}

function LeadCard({ lead, index }: { lead: LeadResult; index: number }) {
  return (
    <motion.div
      className="flex items-center justify-between rounded-lg border border-navy-800/60 bg-navy-950/50 px-3 sm:px-4 py-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * (CARD_STAGGER / 1000),
        duration: 0.45,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800">
          <User className="h-4 w-4 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{lead.name}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {lead.title} at {lead.company}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {lead.location}
            </span>
          </div>
        </div>
      </div>
      <ScoreBadge score={lead.score} />
    </motion.div>
  );
}

type Phase = "idle" | "typing" | "thinking" | "results";

export default function AIAgentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedLength, setTypedLength] = useState(0);
  const hasTriggered = useRef(false);

  const runSequence = useCallback(() => {
  
    setPhase("typing");
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedLength(i);
      if (i >= PROMPT_TEXT.length) {
        clearInterval(typeInterval);
   
        setPhase("thinking");
        setTimeout(() => {
      
          setPhase("results");
        }, THINKING_DURATION);
      }
    }, TYPING_SPEED);
  }, []);

  useEffect(() => {
    if (hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setTimeout(runSequence, INITIAL_DELAY);
        }
      },
      { threshold: 0.3 },
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [runSequence]);
  return (
    <section className="border-t border-navy-800/50 bg-navy-950 py-24">
      <div className="mx-auto max-w-4xl px-6">
                <div className="mb-14 text-center">
          <Badge variant="outline" className="mb-4 inline-flex items-center gap-1.5 border-brand-500/30 text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            AI Outbound Agent
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From ICP definition to booked meetings
          </h2>
        </div>
                <div ref={sectionRef} className="overflow-hidden rounded-xl border border-navy-800 bg-navy-900">
                    <div className="border-b border-navy-800 px-4 py-3">
            <div className="flex items-center gap-3 rounded-xl border border-navy-700/60 bg-navy-950/60 px-4 py-3">
              <Sparkles className="h-4 w-4 shrink-0 text-brand-400" />
              <p className="flex-1 font-mono text-sm text-slate-300 min-h-[1.25rem]">
                {phase === "idle" ? (
                  <span className="text-slate-500">{PROMPT_TEXT}</span>
                ) : (
                  PROMPT_TEXT.slice(0, typedLength)
                )}
                {phase === "typing" && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-brand-400 align-middle" />
                )}
              </p>
              <button
                className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 sm:py-1.5 min-h-[44px] sm:min-h-0 text-xs font-medium transition-all ${
                  phase === "idle" || phase === "results"
                    ? "bg-brand-500 text-white hover:bg-brand-400 cursor-pointer"
                    : "bg-brand-500/20 text-brand-400 cursor-default"
                }`}
                onClick={() => {
                  if (phase === "idle") {
                    hasTriggered.current = true;
                    runSequence();
                  } else if (phase === "results") {
                    setPhase("idle");
                    setTypedLength(0);
                    hasTriggered.current = false;
                    setTimeout(() => {
                      hasTriggered.current = true;
                      runSequence();
                    }, 300);
                  }
                }}
              >
                {phase === "results" ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {phase === "idle"
                  ? "Generate"
                  : phase === "typing"
                    ? "Searching..."
                    : phase === "thinking"
                      ? "Analyzing..."
                      : "Run Again"}
              </button>
            </div>
          </div>
                    <AnimatePresence>
            {phase === "thinking" && (
              <motion.div
                className="flex items-center gap-2 border-b border-navy-800 px-5 py-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-brand-400"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-brand-400"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
                <span className="text-sm text-slate-400">Agent thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>
                    <AnimatePresence>
            {phase === "results" && (
              <motion.div
                className="space-y-3 border-t border-navy-800 px-5 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {mockLeads.map((lead, i) => (
                  <LeadCard key={lead.name} lead={lead} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
