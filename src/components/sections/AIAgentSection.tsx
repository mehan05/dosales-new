"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

const discoveryFields = [
  { label: "TARGET COMPANY", placeholder: "e.g. Stripe, Coinbase" },
  { label: "JOB TITLES", placeholder: "CTO, VP Engineering" },
  { label: "LOCATION", placeholder: "San Francisco, London" },
  { label: "INDUSTRY", placeholder: "Fintech, SaaS" },
  { label: "COMPANY SIZE", placeholder: "50-200" },
  { label: "MAX RESULTS", placeholder: "25" },
];

const fallbackTestimonials = [
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Marcaus Teo", title: "VP Sales, Nium", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Talan Septimus", title: "Sales Director, Razorpay", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Jocelyn Kenter", title: "Growth Lead, Funding Societies", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Zain Septimus", title: "Head of BD, Sarwa", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Paityn Vaccaro", title: "Co-founder, Propseller", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Cristofer Curtis", title: "SDR Manager, Tabby", avatar: null },
];

export default function AIAgentSection({ data, testimonials: sanityTestimonials }: { data: any, testimonials: any[] }) {
  const [showLeads, setShowLeads] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [activeButton, setActiveButton] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 300, opacity: 0 });

  const mockupImage = data?.mockupImage ? urlFor(data.mockupImage).url() : null;
  const mappedSanity = (sanityTestimonials || []).map(t => ({
    quote: t.quote || "No quote provided",
    name: t.author || "Anonymous",
    title: t.role || "Sales Leader",
    avatar: t.avatar ? urlFor(t.avatar).url() : null
  }));

  // Combine them: Sanity versions first, then fill with fallbacks
  const displayTestimonials = mappedSanity.length > 0 
    ? [...mappedSanity, ...fallbackTestimonials].slice(0, Math.max(mappedSanity.length, 6))
    : fallbackTestimonials;

  useEffect(() => {
    if (mockupImage) return;
    let timeoutId: NodeJS.Timeout;
    const startAnimation = async () => {
      setShowLeads(false);
      setIsDiscovering(false);
      setFormValues({});
      setActiveButton(false);
      setCursorPos({ x: 500, y: 100, opacity: 0 });
      await new Promise(r => setTimeout(r, 400));
      setCursorPos({ x: 100, y: 65, opacity: 1 });
      const company = "Revolut";
      for (let i = 0; i <= company.length; i++) {
        setFormValues(prev => ({ ...prev, "TARGET COMPANY": company.slice(0, i) }));
        await new Promise(r => setTimeout(r, 40));
      }
      setCursorPos({ x: 400, y: 65, opacity: 1 });
      const jobs = "Head of Growth";
      for (let i = 0; i <= jobs.length; i++) {
        setFormValues(prev => ({ ...prev, "JOB TITLES": jobs.slice(0, i) }));
        await new Promise(r => setTimeout(r, 30));
      }
      setCursorPos({ x: 100, y: 125, opacity: 1 });
      const loc = "Dubai, UAE";
      for (let i = 0; i <= loc.length; i++) {
        setFormValues(prev => ({ ...prev, "LOCATION": loc.slice(0, i) }));
        await new Promise(r => setTimeout(r, 40));
      }
      setCursorPos({ x: 400, y: 125, opacity: 1 });
      const industry = "Fintech";
      for (let i = 0; i <= industry.length; i++) {
        setFormValues(prev => ({ ...prev, "INDUSTRY": industry.slice(0, i) }));
        await new Promise(r => setTimeout(r, 40));
      }
      setCursorPos({ x: 100, y: 185, opacity: 1 });
      const size = "50-200";
      for (let i = 0; i <= size.length; i++) {
        setFormValues(prev => ({ ...prev, "COMPANY SIZE": size.slice(0, i) }));
        await new Promise(r => setTimeout(r, 40));
      }
      setCursorPos({ x: 400, y: 185, opacity: 1 });
      const res = "25";
      for (let i = 0; i <= res.length; i++) {
        setFormValues(prev => ({ ...prev, "MAX RESULTS": res.slice(0, i) }));
        await new Promise(r => setTimeout(r, 40));
      }
      await new Promise(r => setTimeout(r, 300));
      setCursorPos({ x: 80, y: 260, opacity: 1 });
      await new Promise(r => setTimeout(r, 600));
      setActiveButton(true);
      await new Promise(r => setTimeout(r, 200));
      setCursorPos(prev => ({ ...prev, opacity: 0 }));
      setIsDiscovering(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsDiscovering(false);
      setShowLeads(true);
      setActiveButton(false);
      timeoutId = setTimeout(startAnimation, 6000);
    };
    startAnimation();
    return () => clearTimeout(timeoutId);
  }, [mockupImage]);

  const handleInputChange = (label: string, value: string) => {
    setFormValues(prev => ({ ...prev, [label]: value }));
  };
  const handleRunDiscovery = () => {
    setIsDiscovering(true);
    setTimeout(() => {
      setIsDiscovering(false);
      setShowLeads(true);
    }, 1200);
  };
  const leads = [
    { name: "David Kim", title: "CEO", company: "Axe Infinity", sub: "201-500 Emps", tier: "HOT", score: 94 },
    { name: "Priya Nair", title: "CFO", company: "Axe Infinity", sub: "201-500 Emps", tier: "HOT", score: 89 },
    { name: "Marcus Oei", title: "Director of Engineering", company: "Revolut Ltd.", sub: "Fintech & Digital Finance", tier: "HOT", score: 86 },
    { name: "Zoe Serova", title: "Head of Technology", company: "Revolut Ltd.", sub: "Fintech & Digital Finance", tier: "HOT", score: 74 },
  ];
  return (
    <section className="w-full lg:pt-40 pt-20 flex flex-col items-center align-center">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 w-full max-w-7xl lg:max-w-[1360px] px-4 md:px-10 lg:px-10 mb-16 md:mb-36">
        <div className="flex flex-col justify-center items-start gap-[20px] md:gap-[28px] md:max-w-[700px] lg:max-w-[464px] order-first lg:order-last">
          <div
            className="w-auto h-[32px] rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] flex items-center justify-center shrink-0 bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] px-[14px] py-[5px] gap-[10px]"
          >
            <span className="font-sans font-medium text-[16px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap">
              {data?.headingBadge || "AI Outbound Agent"}
            </span>
          </div>
          <div className="max-w-[440px]">
            <h2
              className="font-sans font-bold text-[42px] lg:text-[52px] leading-[100%] tracking-tight text-[var(--color-text-primary)] w-full font-satoshi"
            >
              {(data?.heading || "From Ideal\nProspects to\nBooked Meetings\n- Automatically").split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i !== (data?.heading || "From Ideal\nProspects to\nBooked Meetings\n- Automatically").split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <p className="font-sans font-normal text-[18px] md:text-[19px] leading-[1.5] text-[var(--color-text-secondary)] max-w-[420px] lg:max-w-[310px] opacity-90">
            {data?.subheading || "From ICP targeting to follow-ups, DoSales handles the entire outbound process. So your team spends time closing, not chasing."}
          </p>
        </div>
        <div
          className="relative shrink-0 w-full md:max-w-[720px] lg:w-[720px] h-auto lg:h-[420px] p-[6px] rounded-[30px] shadow-[0px_12px_44px_rgba(0,0,0,0.08)] bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] border-2 border-white order-last lg:order-first pointer-events-none select-none bg-[linear-gradient(89.72deg,_#E2F2F8_0.4%,_#D2DCF9_99.93%)]"
        >
          <div
            className="w-full h-full min-h-[350px] lg:min-h-0 rounded-[24px] bg-[var(--color-bg-surface)] flex flex-col items-center lg:items-center px-6 lg:px-[14px] pt-8 lg:pt-[12px] pb-[22.3px] relative overflow-hidden"
          >
            {mockupImage ? (
                <img src={mockupImage} alt="Discovery Mockup" className="w-full h-full object-contain p-4" />
            ) : (
                <>
                <motion.div
                animate={{
                    x: cursorPos.x,
                    y: cursorPos.y,
                    opacity: cursorPos.opacity
                }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="absolute pointer-events-none z-[100] hidden md:block"
                >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.5"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></svg>
                </motion.div>
                {!showLeads ? (
                <>
                    <div className="w-full lg:max-w-[684px] mx-auto">
                    <h3 className="font-sans font-semibold text-[16px] md:text-[18px] text-[var(--color-text-heading-dark)] mb-[10px] h-[24px] lg:ml-1.5">
                        Discovery Search
                    </h3>
                    <div
                        className="bg-white rounded-[7.54px] border-[0.75px] border-[var(--color-border-subtle)] px-6 md:px-[18.86px] pt-4 md:pt-[18.86px] pb-4 md:pb-6 shadow-sm flex flex-col relative w-full lg:h-[340px]"
                    >
                        <div className="flex flex-col gap-4 md:gap-[18.11px]">
                        <div className="grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-3 md:gap-[10px]">
                            {discoveryFields.map((field: any) => (
                            <div key={field.label}>
                                <label
                                className="block font-sans font-medium text-[9.05px] leading-[12.07px] tracking-[0.45px] text-[var(--color-text-secondary)] uppercase mb-1.5 font-inter"
                                >
                                {field.label}
                                </label>
                                <div className="w-full h-[28px] md:h-[34px] rounded-lg border border-[var(--color-border-light)] bg-[var(--color-bg-surface)] flex items-center group focus-within:border-[var(--color-brand-focus)] focus-within:bg-white focus-within:ring-1 focus-within:ring-[var(--color-brand-focus)] transition-all overflow-hidden">
                                <input
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={formValues[field.label] || ""}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    className="w-full h-full bg-transparent border-none outline-none shadow-none px-3 md:px-4 text-[12px] md:text-[13px] text-[var(--color-text-heading-dark)] placeholder:text-[var(--color-text-placeholder)] font-sans focus:ring-0 flex-1 min-w-0"
                                />
                                </div>
                            </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 pt-0 md:pt-1">
                            <div className="w-[12.07px] h-[12.07px] rounded-[1.5px] border-[0.75px] border-[var(--color-border-input)] bg-white flex items-center justify-center shadow-sm cursor-pointer">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0BA5E9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <span className="text-[12px] text-[var(--color-text-secondary)] font-sans font-medium">Auto-enrich discovered leads</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <button
                            onClick={handleRunDiscovery}
                            disabled={isDiscovering}
                            className={cn(
                                "bg-[var(--color-brand-alt)] text-white w-full sm:w-[119.7px] h-[30.2px] px-[15.09px] rounded-[7.54px] text-[10px] font-medium flex items-center justify-center gap-[6.04px] hover:bg-[var(--color-brand-alt-hover)] transition-all disabled:opacity-50 font-inter whitespace-nowrap cursor-pointer leading-[15.09px] tracking-[-0.11px]",
                                activeButton && "scale-95 brightness-110 shadow-inner"
                            )}
                            >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                            {isDiscovering ? "Running..." : "Run Discovery"}
                            </button>
                            <div className="flex gap-2 items-center">
                            <button className="bg-[var(--color-text-slate)] text-white w-[47.9px] h-[30.2px] rounded-[7.54px] font-bold flex items-center justify-center gap-1 text-[12px] hover:opacity-90 cursor-pointer">
                                0 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                            </button>
                            <button className="border border-[var(--color-border-light)] text-[var(--color-text-slate-dark)] w-[108.7px] h-[31.7px] px-4 rounded-[7.54px] text-[12px] font-semibold bg-white shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                Save Preset
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
                ) : (
                <div className="flex flex-col w-full h-full lg:max-w-[684px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start justify-between mb-[14px] lg:ml-1.5 h-[48px]">
                    <div>
                        <h3 className="font-sans font-bold text-[18px] md:text-[20px] text-[var(--color-text-heading-dark)] leading-none mb-1">Leads</h3>
                        <p className="text-[12px] text-[var(--color-text-tertiary)] font-medium">0 of 6 leads</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-[var(--color-border-light)] rounded-lg text-[12px] font-medium text-[var(--color-text-slate-dark)] bg-white shadow-sm cursor-pointer">
                        Shown <span className="font-bold">25</span> <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                        <div className="hidden sm:flex bg-[var(--color-bg-gray-light)] p-1 rounded-lg border border-[var(--color-border-light)]">
                        <div className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0BA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /></svg>
                        </div>
                        <div className="w-7 h-7 flex items-center justify-center text-[var(--color-text-tertiary)] cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></svg>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-white rounded-[7.54px] border-[0.75px] border-[var(--color-border-subtle)] shadow-sm flex-1 overflow-hidden lg:h-[340px]">
                    <table className="w-full text-left border-collapse h-full">
                        <thead>
                        <tr className="bg-[var(--color-bg-surface)] border-bottom border-[var(--color-border-light)]">
                            <th className="px-5 py-3 text-[9px] md:text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase">
                            <div className="flex items-center gap-1.5">
                                Name / Title <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5-5" /></svg>
                            </div>
                            </th>
                            <th className="px-5 py-3 text-[9px] md:text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase">
                            <div className="flex items-center gap-1.5">
                                Company <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5-5" /></svg>
                            </div>
                            </th>
                            <th className="hidden md:table-cell px-5 py-3 text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase text-center">
                            <div className="flex items-center justify-center gap-1.5">
                                Tier <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5-5" /></svg>
                            </div>
                            </th>
                            <th className="hidden md:table-cell px-5 py-3 text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase text-center">
                            <div className="flex items-center justify-center gap-1.5">
                                Score <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><line x1="21" x2="3" y1="6" y2="6" /><line x1="15" x2="3" y1="12" y2="12" /><line x1="10" x2="3" y1="18" y2="18" /></svg>
                            </div>
                            </th>
                            <th className="w-8"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-light)]">
                        {leads.map((lead: any, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-[var(--color-border-light)] last:border-b-0">
                            <td className="px-5 py-2.5">
                                <p className="text-[11.5px] font-bold text-[var(--color-text-heading-dark)] mb-0.5">{lead.name}</p>
                                <p className="text-[10px] text-[var(--color-text-tertiary)] font-medium">{lead.title}</p>
                            </td>
                            <td className="px-5 py-2.5">
                                <p className="text-[11.5px] font-bold text-[var(--color-text-heading-dark)] mb-0.5">{lead.company}</p>
                                <p className="text-[10px] text-[var(--color-text-tertiary)] font-medium">{lead.sub}</p>
                            </td>
                            <td className="hidden md:table-cell px-5 py-2.5 text-center">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[var(--color-bg-blue-light)] text-[var(--color-text-blue-dark)] text-[9.5px] font-bold">
                                {lead.tier}
                                </span>
                            </td>
                            <td className="hidden md:table-cell px-5 py-2.5 text-center">
                                <span className="text-[12px] font-bold text-[var(--color-text-green-dark)]">{lead.score}</span>
                            </td>
                            <td className="px-4 py-2.5 text-right opacity-30">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                )}
                </>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-[calc(100%-40px)] md:w-[calc(100%-90px)] h-[auto] md:h-[1080px] rounded-[30px] border-[2px] border-white relative overflow-hidden mb-32 flex flex-col md:flex-row items-center md:items-start p-8 md:pl-16 md:pr-0 gap-12 mx-auto md:mx-10 shadow-[0px_12px_40px_rgba(0,0,0,0.02)] pt-16 mt-6 md:mt-12 bg-[linear-gradient(114.57deg,_#F0F9FF_0.89%,_#C5E6F6_45.83%,_#F1FAFF_100%)] [border-image-source:linear-gradient(90.3deg,_#FFFFFF_0.28%,_#AEDEF7_52.97%,_#FDFEFF_99.77%)] [border-image-slice:1]"
      >
        <div className="absolute top-0 left-0 p-4 z-0 pointer-events-none grid grid-cols-6 gap-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-[66px] h-[66px] rounded-[16px] bg-[var(--color-bg-white-alpha-20)]"
            />
          ))}
        </div>
        <div className="flex-[0.6] relative z-10 shrink-0 w-full">
          <div className="max-w-full md:max-w-[620px] mb-10 md:mb-20">
            <div
              className="w-[168px] h-[32px] rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] flex items-center justify-center shrink-0 mb-6 md:mb-10 bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] px-[14px] py-[5px] gap-[10px]"
            >
              <span className="font-sans font-medium text-[16px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap">
                Real Pain Points
              </span>
            </div>
            <h2 className="text-[38px] md:text-[52px] font-sans font-bold text-[var(--color-text-nav)] leading-none md:leading-[1.2] mb-6 md:mb-10 tracking-tight">
              Existing tools weren&apos;t built for emerging markets
            </h2>
            <p className="text-[14px] md:text-[16px] text-[var(--color-text-secondary)] font-medium leading-[1.5] md:leading-[28.5px] opacity-90 w-100">
              <span className="md:hidden">Hear from sales leaders who&apos;ve burned through Apollo, ZoomInfo, and Cognism trying to sell into MENA and Southeast Asia.</span>
              <span className="hidden md:inline">
                Hear from sales leaders who&apos;ve burned through Apollo,<br />
                ZoomInfo, and Cognism trying to sell into MENA and<br />
                Southeast Asia.
              </span>
            </p>
          </div>
        </div>
        <div
          className="w-[calc(100%+32px)] md:w-[800px] lg:w-[1100px] h-[660px] rounded-l-[30px] rounded-r-none border-[1.5px] border-[var(--color-white)] md:border-r-0 backdrop-blur-[34px] relative z-10 p-[12px] md:p-[16px] overflow-hidden ml-auto -mr-8 md:-mr-2 mt-8 md:mt-70 bg-white/50"
        >
          <div className="w-full h-full bg-[var(--color-black)] rounded-l-[30px] rounded-r-none relative overflow-hidden flex items-center">
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
            <div
              className="flex gap-[18px] p-[24px] animate-marquee whitespace-nowrap mask-[linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]"
            >
              {[1, 2].map((set: number) => (
                <div key={`set-${set}`} className="flex gap-[18px] shrink-0">
                  <div className="flex flex-col gap-[18px]">
                    {[0, 1, 2].map((i: number) => (
                      <div key={`c1-${i}-${set}`} className="w-[312px] min-h-[186px] rounded-[16px] border border-[var(--color-bg-dark-surface-alt)] backdrop-blur-[44px] p-[16px] flex flex-col gap-[18px] shadow-lg shrink-0 whitespace-normal bg-[var(--color-bg-dark)]">
                        <p
                          className="text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi"
                        >
                          {displayTestimonials[i % displayTestimonials.length].quote}
                        </p>
                        <div className="flex items-center gap-[12px] mt-auto">
                          <img
                            src={displayTestimonials[i % displayTestimonials.length].avatar || `/profile/profile${(i % 6) + 1}.svg`}
                            alt={`Profile`}
                            width={46}
                            height={46}
                            loading="lazy"
                            decoding="async"
                            className="h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                          />
                          <div className="flex flex-col">
                            <h4
                              className="font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi"
                            >
                              {displayTestimonials[i % displayTestimonials.length].name}
                            </h4>
                            <p
                              className="text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi"
                            >
                              {displayTestimonials[i % displayTestimonials.length].title}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-[18px]">
                    {[3, 4, 5].map((i: number) => (
                      <div key={`c2-${i}-${set}`} className="w-[312px] min-h-[186px] rounded-[16px] border border-[var(--color-bg-dark-surface-alt)] backdrop-blur-[44px] p-[16px] flex flex-col gap-[18px] shadow-lg shrink-0 whitespace-normal bg-[var(--color-bg-dark)]">
                        <p
                          className="text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi"
                        >
                          {displayTestimonials[i % displayTestimonials.length].quote}
                        </p>
                        <div className="flex items-center gap-[12px] mt-auto">
                          <img
                            src={displayTestimonials[i % displayTestimonials.length].avatar || `/profile/profile${(i % 6) + 1}.svg`}
                            alt={`Profile`}
                            width={46}
                            height={46}
                            loading="lazy"
                            decoding="async"
                            className="h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                          />
                          <div className="flex flex-col">
                            <h4
                              className="font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi"
                            >
                              {displayTestimonials[i % displayTestimonials.length].name}
                            </h4>
                            <p
                              className="text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi"
                            >
                              {displayTestimonials[i % displayTestimonials.length].title}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-[18px]">
                    {[0, 2, 4].map((i: number) => (
                      <div key={`c3-${i}-${set}`} className="w-[312px] min-h-[186px] rounded-[16px] border border-[var(--color-bg-dark-surface-alt)] backdrop-blur-[44px] p-[16px] flex flex-col gap-[18px] shadow-lg shrink-0 whitespace-normal bg-[var(--color-bg-dark)]">
                        <p
                          className="text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi"
                        >
                          {displayTestimonials[i % displayTestimonials.length].quote}
                        </p>
                        <div className="flex items-center gap-[12px] mt-auto">
                          <img
                            src={displayTestimonials[i % displayTestimonials.length].avatar || `/profile/profile${(i % 6) + 1}.svg`}
                            alt={`Profile`}
                            width={46}
                            height={46}
                            loading="lazy"
                            decoding="async"
                            className="h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                          />
                          <div className="flex flex-col">
                            <h4
                              className="font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi"
                            >
                              {displayTestimonials[i % displayTestimonials.length].name}
                            </h4>
                            <p
                              className="text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi"
                            >
                              {displayTestimonials[i % displayTestimonials.length].title}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
