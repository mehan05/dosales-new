"use client";
import React from "react";
import { motion } from "motion/react";
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}
export const TestimonialsColumn = (props: { className?: string; testimonials: Testimonial[]; duration?: number }) => {
  return (
    <div className={`overflow-hidden ${props.className}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-4 rounded-2xl border border-[var(--color-bg-dark-surface-alt)] bg-[var(--color-bg-dark)] backdrop-blur-[44px] w-[312px] min-h-[186px] flex flex-col gap-[18px] shrink-0"
                  key={i}
                >
                  <p 
                    className="text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi"
                  >
                    {text}
                  </p>
                  <div className="flex items-center gap-[12px]">
                    <img 
                      src={image} 
                      alt={name} 
                      className="h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                    />
                    <div className="flex flex-col">
                      <h4 
                        className="font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi"
                      >
                        {name}
                      </h4>
                      <p 
                        className="text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi"
                      >
                        {role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
