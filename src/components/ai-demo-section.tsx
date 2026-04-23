"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const mockPrompt = "Find fintech CTOs in UAE with 50+ employees";
const mockResponse =
  "Searching 12 data sources... Found 47 verified contacts matching your criteria across 23 companies in the UAE fintech ecosystem.";
const mockResults = [
  { name: "Khalid Al-Mansoori", title: "CTO", company: "PayGulf Technologies", score: 96 },
  { name: "Nadia Hasan", title: "CTO & Co-founder", company: "FinBridge MENA", score: 93 },
  { name: "James Liu", title: "Chief Technology Officer", company: "RemitFlow", score: 89 },
];
export default function AIDemoSection() {
  const [typedText, setTypedText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTypedText(mockResponse.slice(0, i));
            if (i >= mockResponse.length) {
              clearInterval(interval);
              setTimeout(() => setShowResults(true), 400);
            }
          }, 25);
        }
      },
      { threshold: 0.3 },
    );
    const el = document.getElementById("ai-demo-trigger");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);
  return (
    <section className="border-t border-navy-800/50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          See AI prospecting in action
        </h2>
        <div id="ai-demo-trigger" className="overflow-hidden rounded-xl border border-navy-800 bg-navy-900">
                    <div className="flex items-center gap-3 border-b border-navy-800 px-5 py-4">
            <span className="shrink-0 rounded bg-brand-500/20 px-2 py-0.5 font-mono text-xs text-brand-400">
              AI&gt;
            </span>
            <p className="font-mono text-sm text-slate-300">{mockPrompt}</p>
          </div>
                    <div className="px-5 py-4">
            <p className="font-mono text-sm text-slate-400">
              {typedText}
              {typedText.length < mockResponse.length && (
                <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-brand-400" />
              )}
            </p>
          </div>
                    <AnimatePresence>
            {showResults && (
              <motion.div
                className="space-y-3 border-t border-navy-800 px-5 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {mockResults.map((r, i) => (
                  <motion.div
                    key={r.name}
                    className="flex items-center justify-between rounded-lg border border-navy-800/60 bg-navy-950/50 px-4 py-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{r.name}</p>
                      <p className="text-xs text-slate-500">
                        {r.title} at {r.company}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-brand-400">
                      {r.score}% match
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
