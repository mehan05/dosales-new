"use client";
import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/blocks/testimonials-columns-1";
import { Badge } from "@/components/ui/badge";
import { MessageSquareQuote } from "lucide-react";
const testimonials = [
  {
    text: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Marcaus Teo",
    role: "VP Sales, Nium",
  },
  {
    text: "Every prospecting tool is built for a San Francisco SDR cold-emailing SaaS companies. We're selling PropTech in Southeast Asia. The overlap is maybe 20% of what we need.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Marcus Teo",
    role: "Co-founder, Propseller",
  },
  {
    text: "I'd pay $200/month for verified contacts at DFSA-licensed firms in the Gulf. That list simply doesn't exist in any tool right now. We build it manually every quarter.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "James Whitfield",
    role: "VP Sales, Nium",
  },
  {
    text: "Our SDR team spends 60% of their time on research instead of outreach. In emerging markets, even basic company data requires manual investigation.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Priya Sharma",
    role: "Sales Director, Razorpay",
  },
  {
    text: "We tried 4 different tools before giving up on automated outreach for the Singapore market. None of them had accurate mobile numbers for SEA contacts.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Wei Chen",
    role: "Growth Lead, Funding Societies",
  },
  {
    text: "Compliance is the hidden killer. Every tool we evaluate fails on PDPA and UAE data protection requirements. We can't risk it.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Fatima Al-Sayed",
    role: "Legal & BD, Tarabut Gateway",
  },
  {
    text: "The Indian market alone has 25,000+ Fintech companies. Finding the right decision-makers at the right funding stage is like finding needles in a haystack.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Raj Patel",
    role: "VP Sales, Pine Labs",
  },
  {
    text: "LinkedIn Sales Navigator gives us names but not verified emails. Apollo gives us emails but they bounce 40% of the time in the Gulf region.",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    name: "Ahmed Hassan",
    role: "SDR Manager, Tabby",
  },
  {
    text: "We need buying signals specific to our market — regulatory approvals, central bank licenses, funding rounds in MENA. No tool tracks these.",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    name: "Sarah Chen",
    role: "RevOps, Airwallex",
  },
];
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);
export default function TestimonialsSection() {
  return (
    <section className="bg-navy-950 border-t border-navy-800/50 py-24 relative z-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-10"
        >
          <Badge variant="outline" className="border-brand-500/30 text-brand-400 gap-1.5 bg-brand-500/5 mb-4">
            <MessageSquareQuote className="h-3 w-3" />
            Real Pain Points
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading text-center">
            Existing tools weren&apos;t built for
            <span className="brand-gradient-text"> emerging markets</span>
          </h2>
          <p className="text-slate-400 mt-4 text-center leading-relaxed bg-black">
            Hear from sales leaders who've burned through Apollo, ZoomInfo, and Cognism trying to sell into MENA and
            Southeast Asia.
          </p>
        </motion.div>
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={20} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
        </div>
      </div>
    </section>
  );
}
