import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/layout/PageTransition";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

// ─── Data ─────────────────────────────────────────────────────────────────────

const principles = [
  {
    id: "01",
    title: "Thoughtful",
    description: "Every element has a purpose, chosen intentionally to elevate daily life and seamlessly integrate into your routine.",
  },
  {
    id: "02",
    title: "Timeless",
    description: "Designed beyond passing trends, anchored in classic architectural balance and enduring materiality.",
  },
  {
    id: "03",
    title: "Personal",
    description: "Created around the unique routines and rhythms of the people who experience the space.",
  },
];

const team = [
  {
    name: "CH Swapna Reddy",
    role: "Founder & Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "D Nagamani",
    role: "Head Logistics | Customer Support",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Sreenivas SS",
    role: "Head Project Execution",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-navy flex items-end rounded-b-[2.5rem] md:rounded-b-[4rem] z-10 shadow-sm">
      {/* Full Background Image with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <img
          src="/images/backgrounds/dmor-about-hero.png"
          alt="DMOR Interior Architecture"
          className="w-full h-full object-cover filter brightness-[0.7] grayscale-[10%]"
        />
        {/* Dark gradient to ensure text readability at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" />
      </motion.div>

      {/* Bottom Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 md:pb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

        {/* Left: Headline */}
        <div className="flex flex-col w-full md:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
              About DMOR
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="leading-[1.05] tracking-tight flex flex-col text-cream"
          >
            <span className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7rem]">
              Designed With
            </span>
            <span className="font-accent text-brand italic text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] -mt-1 md:-mt-4">
              Intention.
            </span>
          </motion.h1>
        </div>

        {/* Right: Description */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5 md:pl-10 md:mb-4"
        >
          <p className="font-body text-base md:text-lg text-cream/90 leading-relaxed tracking-wide border-l border-brand/40 pl-6">
            DMOR is an interior design studio creating refined, functional, and deeply personal spaces. We bring together architecture, material, light, and detail to create environments that feel timeless and considered.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section className="relative w-full bg-[#F9F7F4] py-24 md:py-32 lg:py-40 px-6 lg:px-12 text-navy overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-navy/70">
              Our Philosophy
            </span>
            <span className="w-8 h-[1px] bg-brand" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8"
          >
            More Than Just <br className="hidden sm:block" />
            <span className="font-accent text-brand italic">Beautiful Spaces.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base md:text-lg text-navy/70 leading-relaxed max-w-xl"
          >
            We believe great interiors should feel as good as they look. Every project begins with understanding the people, the space, and the story behind it.
          </motion.p>
        </div>

        {/* 3-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="group flex flex-col pt-8 border-t border-navy/15 hover:border-brand transition-colors duration-500"
            >
              <div className="font-accent text-4xl md:text-5xl text-brand mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                {principle.id}.
              </div>
              <h3 className="font-primary text-3xl md:text-4xl text-navy mb-4 transition-transform duration-500 group-hover:translate-x-2">
                {principle.title}
              </h3>
              <p className="font-body text-base md:text-lg text-navy/60 leading-relaxed transition-transform duration-500 group-hover:translate-x-2 delay-75">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section className="relative w-full bg-navy py-24 md:py-32 lg:py-40 px-6 lg:px-12 text-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-cream/70">
              Our Team
            </span>
            <span className="w-8 h-[1px] bg-brand" />
          </div>
          <h2 className="font-primary text-5xl sm:text-6xl md:text-7xl tracking-tight max-w-2xl mb-6">
            The People Behind <span className="font-accent text-brand italic">DMOR.</span>
          </h2>
          <p className="font-body text-base md:text-lg text-cream/60 max-w-xl mx-auto">
            A collaborative team of leaders, strategists, and execution specialists working together to transform ideas into meaningful spaces.
          </p>
        </div>

        {/* Portrait Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 max-w-[1200px] mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="group flex flex-col items-center md:items-start cursor-default"
            >
              {/* Portrait Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1D2B3A] mb-6 shadow-xl rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale-[100%] opacity-90 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>

              {/* Minimalist Details */}
              <h3 className="font-primary text-2xl md:text-3xl text-cream mb-2 transition-colors duration-300 group-hover:text-brand">
                {member.name}
              </h3>
              <p className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-cream/50">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#EEEBE4] py-32 md:py-40 lg:py-48 px-6 lg:px-12 text-navy overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-4 mb-10">
          <span className="w-12 h-[1px] bg-brand" />
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
            Our Approach
          </span>
          <span className="w-12 h-[1px] bg-brand" />
        </div>

        <h2 className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 text-navy">
          From Vision to <br />
          <span className="font-accent text-brand italic">Reality.</span>
        </h2>

        <p className="font-body text-base md:text-lg lg:text-xl text-navy/80 max-w-2xl leading-relaxed mb-16">
          From the first conversation to the final detail, we work closely with our clients to create spaces that are thoughtful, functional, and uniquely theirs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          
          {/* Primary Action: Projects */}
          <motion.button
            onClick={() => navigate("/projects")}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-4 md:gap-6 pl-8 pr-2 py-2 rounded-full border border-navy bg-navy shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-full sm:w-auto justify-between"
          >
            <span className="font-body text-sm md:text-base font-semibold text-cream group-hover:text-white transition-colors duration-300">
              Discover Our Projects
            </span>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand flex items-center justify-center text-navy transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45 group-hover:bg-white shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </motion.button>

          {/* Secondary Action: Contact */}
          <motion.button
            onClick={() => navigate("/contact")}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-4 md:gap-6 pl-8 pr-2 py-2 rounded-full border border-navy/20 bg-transparent hover:bg-navy shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-full sm:w-auto justify-between"
          >
            <span className="font-body text-sm md:text-base font-semibold text-navy group-hover:text-cream transition-colors duration-300">
              Start a Conversation
            </span>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy flex items-center justify-center text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45 group-hover:bg-brand group-hover:text-navy shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </motion.button>

        </div>
      </motion.div>
    </section>
  );
};

// ─── Main Page Export ─────────────────────────────────────────────────────────

const AboutPage: React.FC = () => {
  useDocumentTitle("About DMOR | Interior Architecture & Design");

  return (
    <PageTransition>
      <main className="w-full bg-background overflow-x-hidden">
        <HeroSection />
        <PhilosophySection />
        <TeamSection />
        <CtaSection />
      </main>
    </PageTransition>
  );
};

export default AboutPage;