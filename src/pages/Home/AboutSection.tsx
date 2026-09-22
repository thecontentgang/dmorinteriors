import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Reusable Pill Button Component ──────────────────────────────────────────
const PillButton = ({ text, href, className = "" }: { text: string; href: string; className?: string }) => {
  return (
    <Link
      to={href}
      className={`group inline-flex items-center gap-4 md:gap-6 pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full border border-navy/20 bg-transparent hover:bg-brand shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-fit ${className}`}
    >
      <span className="font-body text-sm md:text-base font-semibold text-navy group-hover:text-white transition-colors duration-300">
        {text}
      </span>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-navy flex items-center justify-center text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-navy shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </Link>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background py-24 md:py-32 px-6 lg:px-12 overflow-hidden min-h-[90vh] flex items-center"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-20 lg:gap-32 relative z-10">

        {/* ── TOP ROW: Headline (Left) & Image (Right) ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">

          {/* Top Left: Massive Heading */}
          <motion.div
            style={{ y: textY }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8 lg:mb-12">
              <span className="w-12 h-[1px] bg-brand" />
              <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-navy/80">
                The Studio
              </span>
            </div>

            <h2 className="text-navy leading-[1.05] md:leading-[1] tracking-tight">
              <span className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] block text-navy">
                We design
              </span>
              <span className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] block text-navy lg:ml-12">
                more than
              </span>
              <span className="font-accent text-brand italic text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] block -mt-2 md:-mt-6 lg:-mt-8 lg:ml-24 drop-shadow-sm">
                interiors.
              </span>
            </h2>
          </motion.div>

          {/* Top Right: Masked Image */}
          <motion.div
            style={{ y: imageY }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[650px] aspect-square flex items-center justify-center">
              <div
                className="w-full h-full"
                style={{
                  WebkitMaskImage: "url('/images/backgrounds/swril-image.png')",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  maskImage: "url('/images/backgrounds/swril-image.png')",
                  maskSize: "contain",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                }}
              >
                <img
                  src="/images/hero/about.png"
                  alt="Editorial Interior by DMOR"
                  className="w-full h-full object-cover scale-110 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-navy/5 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: Centered Content & Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-10"
        >
          {/* Text Block */}
          <div className="flex flex-col gap-6 font-body text-navy/80 text-base md:text-lg leading-relaxed tracking-wide">
            <p>
              <strong>DMOR</strong> is a luxury architectural design practice rooted in the belief that spaces dictate how we feel and live. Our philosophy bridges the gap between minimalist elegance and profound, lived-in warmth.
            </p>
            <p className="text-sm md:text-base text-navy/70">
              By prioritizing tactile, authentic materials and an uncompromising attention to detail, we craft environments of enduring quality. Guided by a highly collaborative, client-first process, we go beyond aesthetics to deliver bespoke sanctuaries that truly feel like home.
            </p>
          </div>

          {/* Consistent Pill Button */}
          <PillButton text="Discover DMOR" href="/about" />
          
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;