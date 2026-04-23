"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
const productLinks = [
  "Lead Database",
  "AI Prospecting",
  "Data Enrichment",
  "CRM Sync",
  "Market Intelligence",
];
const companyLinks = ["About", "Careers", "Contact", "Partners"];
export default function Footer() {
  return (
    <footer className="w-full bg-white pt-10 md:pt-0 pb-10 md:pb-16 px-5 lg:px-[60px] mt-0 md:mt-[60px] flex justify-center">
      <div className="w-full w-full bg-[var(--color-bg-subtle)] rounded-[32px] p-8 lg:pt-[64px] lg:px-[44px] lg:pb-[32px] shadow-sm flex flex-col justify-between">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between gap-6 md:gap-10 lg:gap-0">
                    <div className="flex flex-col gap-6 lg:max-w-[243px]">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos/dosales-logo.svg"
                alt="DoSales"
                width={28}
                height={28}
                unoptimized
              />
              <span className="text-[22px] md:text-[22px] font-bold text-[var(--color-text-primary)] font-sans">DoSales</span>
            </Link>
            <p
              className="font-normal text-[14px] leading-[22px] text-[var(--color-text-footer-sub)] max-w-[320px] font-satoshi tracking-[-0.24px]"
            >
              AI-powered sales intelligence for emerging markets. Verified B2B data across MENA and Southeast Asia.
            </p>
          </div>
                    <div className="flex flex-col gap-3 md:gap-8">
            <h4 className="font-sans font-bold text-[20px] text-[var(--color-text-primary)]">Product</h4>
            <ul className="flex flex-col gap-4">
              {productLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="font-sans font-normal text-[16px] md:text-[20px] leading-[30px] text-[var(--color-text-gray)] hover:text-[var(--color-text-primary)] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
                    <div className="flex flex-col gap-3 md:gap-8">
            <h4 className="font-sans font-bold text-[20px] text-[var(--color-text-primary)]">Company</h4>
            <ul className="flex flex-col gap-4">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="font-sans font-normal text-[16px] md:text-[20px] leading-[30px] text-[var(--color-text-gray)] hover:text-[var(--color-text-primary)] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
                    <div className="flex flex-col gap-3 md:gap-6 lg:ml-[126px]">
                        <div className="bg-white rounded-[32px] p-3 flex items-center gap-4 shadow-sm w-full max-w-[350px]">
              <div className="bg-black w-[64px] h-[64px] md:w-[90px] md:h-[90px] rounded-[24px] flex items-center justify-center shrink-0">
                <Image
                  src="/logos/dosales-logo.svg"
                  alt="Early Access"
                  width={40}
                  height={40}
                  className="brightness-0 invert"
                  unoptimized
                />
              </div>
              <div
                className="flex flex-col font-bold text-[var(--color-text-primary)] font-satoshi text-[23.81px] leading-[32px] tracking-[-0.24px]"
              >
                <span>Apply for early</span>
                <span>access</span>
              </div>
            </div>
                        <div className="bg-white rounded-[14px] p-3 md:p-[12px_20px] flex items-center gap-4 md:gap-[16px] shadow-sm w-full max-w-[350px]">
              <span className="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-black)] whitespace-nowrap">Follow us on</span>
              <div className="flex items-center gap-4">
                <Link 
                  href="#" 
                  title="Follow DoSales on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:opacity-70 transition-opacity"
                >
                  <Image src="/icons/Linkedin.svg" alt="LinkedIn — DoSales Official" width={20} height={20} loading="lazy" decoding="async" />
                </Link>
                <Link 
                  href="#" 
                  title="Follow DoSales on Instagram"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:opacity-70 transition-opacity"
                >
                  <Image src="/icons/instagram.svg" alt="Instagram — DoSales Official" width={20} height={20} loading="lazy" decoding="async" />
                </Link>
                <Link 
                  href="#" 
                  title="Follow DoSales on X"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:opacity-70 transition-opacity"
                >
                  <Image src="/icons/x-icon.svg" alt="X (Twitter) — DoSales Official" width={20} height={20} loading="lazy" decoding="async" />
                </Link>
              </div>
            </div>
          </div>
        </div>
                <div className="mt-6 md:mt-10 pt-8 border-t border-[var(--color-border-footer)] -mx-8 lg:-mx-[44px] px-8 lg:px-[44px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:justify-between font-sans">
            <p
              className="font-normal text-[14px] leading-[20px] text-[var(--color-text-gray)] opacity-70 font-satoshi tracking-[0%]"
            >
              © 2026 — Copyright. All Rights reserved
            </p>
            <div className="grid grid-cols-2 lg:flex lg:items-center gap-x-8 gap-y-4 lg:gap-10">
              {["Privacy policy", "Terms of service", "Cookie Settings"].map((item) => (
                <Link key={item} href="#" className="font-medium text-[14px] md:text-[16px] text-[var(--color-text-gray)] hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
