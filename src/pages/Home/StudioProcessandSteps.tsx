import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "8+",  label: "Years of Experience" },
  { number: "15+", label: "Design Experts" },
  { number: "4",   label: "Cities Served" },
];

const processSteps = [
  {
    id: "01",
    title: "Discover",
    description:
      "We begin by listening — understanding your lifestyle, your aesthetic sensibilities, and what you truly need from a space.",
  },
  {
    id: "02",
    title: "Concept",
    description:
      "A spatial narrative takes shape: mood, material direction, proportion, and the emotional quality of every room.",
  },
  {
    id: "03",
    title: "Design",
    description:
      "Detailed drawings, material boards, and curated selections give the concept a tangible, buildable form.",
  },
  {
    id: "04",
    title: "Execute",
    description:
      "We coordinate every craftsman, vendor, and site decision so the work reflects the design with precision.",
  },
  {
    id: "05",
    title: "Deliver",
    description:
      "The space is handed over complete — finished with the care and attention that made it worth doing.",
  },
];

// ─── Clip reveal variant with tuple easing cast ──────────────────────────────

const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (i: number) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      clipPath: { 
        duration: 0.75, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], 
        delay: i * 0.1 
      },
      opacity: { duration: 0.3, delay: i * 0.1 },
    },
  }),
};

// ─── Component ───────────────────────────────────────────────────────────────

const StudioProcessAndStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ruleScaleY = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy"
    >
      {/* Ambient brand glow — top left */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-[480px] h-[480px] opacity-[0.055]"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, #C9C265 0%, transparent 68%)",
        }}
      />

      {/* Vertical brand rule — far left edge, grows on scroll */}
      <motion.div
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-brand/20"
        style={{ scaleY: ruleScaleY, originY: 0 }}
      />

      {/* ── Inner grid ── */}
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-0">

          {/* ══════════════════════════════
              LEFT — Stats + CTA
          ══════════════════════════════ */}
          <div className="relative lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between py-20 md:py-28 lg:py-32 lg:pr-16">

            {/* Vertical separator */}
            <div className="hidden lg:block absolute right-0 top-24 bottom-24 w-px bg-cream/[0.07]" />

            {/* Top — label + stats */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col"
            >
              <span className="font-body text-[9px] tracking-[0.38em] text-cream/30 uppercase mb-14">
                Studio in Numbers
              </span>

              <div className="flex flex-col gap-10 md:gap-12">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group flex flex-col gap-2 cursor-default"
                  >
                    <span className="font-primary text-[3.5rem] sm:text-[4.5rem] lg:text-[5.25rem] leading-none text-cream group-hover:text-brand transition-colors duration-500">
                      {stat.number}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-px bg-brand/40 group-hover:w-10 group-hover:bg-brand transition-all duration-500 ease-out" />
                      <span className="font-body text-[9px] tracking-[0.26em] text-cream/30 uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom — CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-16 lg:mt-0"
            >
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-0 overflow-hidden border border-brand/40 hover:border-brand transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-brand translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-body text-[10px] tracking-[0.28em] uppercase text-brand group-hover:text-navy transition-colors duration-500 px-8 py-4">
                  Start a Project
                </span>
                <span className="relative z-10 flex items-center justify-center border-l border-brand/40 group-hover:border-navy/20 transition-colors duration-500 px-4 py-4 self-stretch">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand group-hover:text-navy transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <line x1="1" y1="13" x2="13" y2="1" />
                    <polyline points="4 1 13 1 13 10" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          {/* ══════════════════════════════
              RIGHT — Process
          ══════════════════════════════ */}
          <div className="py-20 md:py-28 lg:py-32 lg:pl-16 flex flex-col">

            {/* Heading */}
            <motion.div
              className="mb-16 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <span className="font-body text-[9px] tracking-[0.38em] text-cream/30 uppercase block mb-8">
                Our Process
              </span>

              <h2 className="leading-none tracking-tight">
                <span className="block font-primary text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] text-cream">
                  From Vision
                </span>
                <span className="block font-accent text-[3rem] sm:text-[3.75rem] md:text-[4.75rem] lg:text-[5.5rem] text-brand leading-none mt-1">
                  to Reality.
                </span>
              </h2>

              <p className="font-body text-sm text-cream/35 leading-relaxed mt-6 max-w-[400px]">
                Every project follows a clear, collaborative sequence — from
                first conversation to final reveal.
              </p>
            </motion.div>

            {/* Steps */}
            <div className="flex flex-col">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  custom={i}
                  variants={clipReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.12 }}
                  className="group relative flex gap-7 md:gap-10 py-8 border-b border-cream/[0.07] hover:border-cream/20 transition-colors duration-400 cursor-default"
                >
                  {/* Ghost watermark number */}
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-primary text-[5rem] md:text-[6.5rem] leading-none select-none pointer-events-none"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(201,194,101,0.07)",
                    }}
                    aria-hidden="true"
                  >
                    {step.id}
                  </span>

                  {/* Step id */}
                  <div className="flex-none pt-[3px] w-8">
                    <span className="font-body text-[9px] tracking-[0.3em] text-brand/40 group-hover:text-brand transition-colors duration-400">
                      {step.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 pr-16 md:pr-24">
                    <h3 className="font-primary text-[1.65rem] sm:text-[2rem] md:text-[2.5rem] leading-none text-cream group-hover:text-brand transition-colors duration-400 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-cream/35 leading-relaxed group-hover:text-cream/60 transition-colors duration-400 max-w-[420px]">
                      {step.description}
                    </p>
                  </div>

                  {/* Accent dot — right */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioProcessAndStats;