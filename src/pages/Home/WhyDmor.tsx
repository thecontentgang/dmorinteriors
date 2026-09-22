import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const reasons = [
  {
    id: "01",
    title: "Personalised Design",
    description: "Every project is developed around the people who inhabit it, reflecting individual rhythms and lifestyles.",
    bullets: [
      "Focus on individual routines",
      "Custom spatial planning",
      "Lifestyle-driven layouts",
      "Seamless daily functionality"
    ]
  },
  {
    id: "02",
    title: "Refined Materiality",
    description: "A carefully curated palette of raw textures, natural stones, and bespoke finishes engineered for longevity.",
    // Middle card gets a striking bottom-anchored image instead of bullets
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "End-to-End Execution",
    description: "Design conceptualization and flawless on-site execution managed seamlessly through one unified team.",
    bullets: [
      "On-time project completion",
      "Consistent quality assurance",
      "Clear daily communication",
      "Efficient on-site workflow"
    ]
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const WhyDmor: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle background shift for depth
  const sectionY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 md:py-32 lg:py-40 px-6 lg:px-12 overflow-hidden text-navy"
    >
      <motion.div style={{ y: sectionY }} className="max-w-[1400px] mx-auto w-full">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 w-full">
          <h2 className="text-navy leading-[1.1] tracking-tight max-w-4xl">
            <span className="font-primary text-4xl sm:text-5xl md:text-6xl block mb-2">
              Here Are Some Reasons Why
            </span>
            <span className="font-primary text-4xl sm:text-5xl md:text-6xl block">
              You Should Choose <span className="font-accent text-brand italic">DMOR</span>
            </span>
          </h2>
        </div>

        {/* ── 3-Column Highlight Grid ── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => {
            const isCenter = index === 1;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className={`group relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  isCenter 
                    ? "bg-navy text-cream shadow-2xl" 
                    : "bg-cream text-navy border border-navy/5 shadow-sm"
                }`}
              >
                {/* ── Card Content Padding ── */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col flex-grow">
                  
                  {/* Top Branding Logo/Icon */}
                  <div className="flex items-center gap-2 mb-8">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isCenter ? "text-brand" : "text-navy"}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="font-primary text-lg tracking-wide">
                      DMOR
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`font-primary text-3xl md:text-4xl mb-4 ${isCenter ? "text-white" : "text-navy"}`}>
                    {reason.title}
                  </h3>
                  <p className={`font-body text-base md:text-lg leading-relaxed tracking-wide ${isCenter ? "text-cream/80" : "text-navy/70"}`}>
                    {reason.description}
                  </p>

                  {/* ── Conditional Bottom Content ── */}
                  <div className="mt-12 flex-grow flex flex-col justify-end">
                    
                    {/* Bullet Points for Outer Cards */}
                    {!isCenter && reason.bullets && (
                      <ul className="flex flex-col gap-4">
                        {reason.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="font-body text-navy/50 mt-1">*</span>
                            <span className="font-body text-navy/80 text-sm md:text-base">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                </div>

                {/* Bottom Image for Center Card */}
                {isCenter && reason.image && (
                  <div className="relative w-full h-[250px] md:h-[300px] mt-auto">
                    {/* Top gradient fade to blend the image into the navy background */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy to-transparent z-10" />
                    <img
                      src={reason.image}
                      alt="Refined Materiality"
                      className="absolute inset-0 w-full h-full object-cover object-top rounded-t-3xl border-t border-white/10 scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

export default WhyDmor;