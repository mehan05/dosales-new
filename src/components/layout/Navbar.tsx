"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const navLinks = [
  { label: "FEATURES", href: "#features", hasDropdown: true },
  { label: "ABOUT", href: "#about" },
  { label: "PRICING", href: "#pricing" },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.some(entry => entry.isIntersecting);
        setIsDark(intersecting);
      },
      { rootMargin: "-82px 0px 0px 0px", threshold: 0 }
    );
    document.querySelectorAll(".dark-section").forEach((section) => {
      observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const navWrapper = cn(
    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
    scrolled
      ? cn(
          "backdrop-blur-[44px] shadow-sm",
          isDark ? "bg-black/40" : "bg-white/40"
        )
      : "bg-transparent border-b border-white/10"
  );
  const navLinkStyle =
    isDark
      ? "flex items-center gap-1 text-[16px] font-medium leading-[24px] text-white hover:text-gray-300 transition-colors"
      : "flex items-center gap-1 text-[16px] font-medium leading-[24px] text-[var(--color-text-nav)] hover:text-gray-600 transition-colors";
  return (
    <header className={navWrapper}>
      <nav
        className="mx-auto flex items-center justify-between px-4 sm:px-10 h-[80px]"
        aria-label="Main navigation"
      >
                        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logos/dosales-logo.svg"
            alt="DoSales logo"
            width={32}
            height={32}
            unoptimized
          />
          <span className={cn(
            "text-[22px] font-bold leading-none tracking-normal transition-colors",
            isDark ? "text-white" : "text-[var(--color-text-nav)]"
          )}>
            DoSales
          </span>
        </Link>
                <ul className="hidden md:flex items-center gap-3 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link 
                href={link.href} 
                className={cn(navLinkStyle, "text-[14px] lg:text-[16px]")}
                title={link.label}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M1 1L5 4L9 1" stroke={isDark ? "#FFFFFF" : "#0B0F1A"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
                <Button 
          className={cn(
            "hidden md:inline-flex w-[110px] lg:w-[144px] h-[40px] lg:h-[51px] rounded-[10px] p-2 lg:p-4 gap-[6px] lg:gap-[10px] text-[11px] lg:text-[14px] font-medium leading-[100%] text-center shrink-0 cursor-pointer transition-colors",
            isDark 
              ? "bg-[var(--color-white)] text-[var(--color-text-primary)] hover:bg-gray-200" 
              : "bg-[var(--color-text-primary)] text-[var(--color-white)] hover:bg-gray-800"
          )}
        >
          Schedule a Demo
        </Button>
                <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
            {mobileOpen && (
        <div 
          className="md:hidden border-t border-gray-100 px-4 pb-6 shadow-xl backdrop-blur-xl bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(240,249,255,0.98)_100%)]"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-3 text-[16px] font-medium leading-[24px] text-[var(--color-text-nav)] hover:text-gray-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && (
                  <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M1 1L5 4L9 1" stroke="#0B0F1A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                </Link>
              </li>
            ))}
          </ul>
          <Button className="mt-3 w-full h-[51px] bg-[var(--color-text-primary)] text-[var(--color-white)] hover:bg-gray-800 rounded-[10px] p-4 gap-[10px] text-[14px] font-medium leading-[100%] text-center cursor-pointer">
            Schedule a Demo
          </Button>
        </div>
      )}
    </header>
  );
}
