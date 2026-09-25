import AnimatedRevealButton from '../../components/buttons/AnimatedRevealButton';
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useEstimation } from "../../context/EstimationContext";

// ─── Data ────────────────────────────────────────────────────────────────────

const designSystems = [
    {
        id: "01",
        title: "Minimalist Zen",
        subtitle: "Clarity through reduction.",
        description: "Rooted in Japanese and Scandinavian philosophies, this system prioritizes natural light, organic materials, and spatial breathing room. It strips away the unnecessary, leaving only what is functional and beautiful.",
        elements: ["Natural Oak & Ash Wood", "Textured Linen Fabrics", "Diffused, Ambient Lighting", "Earthy, Neutral Palettes"],
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?auto=format&fit=crop&q=80&w=1600",
    },
    {
        id: "02",
        title: "Industrial Elegance",
        subtitle: "Raw materials, refined finish.",
        description: "A sophisticated take on brutalism. We celebrate the structural integrity of a space by exposing concrete and metals, then softening the atmosphere with rich, moody lighting, plush leathers, and warm wood tones.",
        elements: ["Exposed Cast Concrete", "Brushed Gunmetal & Steel", "Warm Amber Task Lighting", "Rich Aniline Leathers"],
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1600",
    },
    {
        id: "03",
        title: "Neo-Classical Luxury",
        subtitle: "Timeless architectural grace.",
        description: "Bridging historical grandeur with contemporary restraint. This system utilizes classical proportions, intricate moldings, and premium stone, counterbalanced by minimalist furniture and striking modern art.",
        elements: ["Calacatta & Nero Marquina Marble", "Fluted Glass Partitions", "Aged Brass Hardware", "Custom Plaster Moldings"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    },
];

// ─── Floating Images Data ────────────────────────────────────────────────────
const floatingImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
    alt: "Interior details",
    className: "top-[5%] left-[2%] md:top-[15%] md:left-[10%] w-28 md:w-48 lg:w-56 -rotate-6",
    delay: 0,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    alt: "Design consultation",
    className: "top-[10%] right-[2%] md:top-[20%] md:right-[10%] w-24 md:w-40 lg:w-48 rotate-6",
    delay: 1.5,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    alt: "Modern architecture",
    className: "bottom-[10%] left-[5%] md:bottom-[15%] md:left-[15%] w-24 md:w-40 lg:w-48 rotate-3",
    delay: 2.5,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600",
    alt: "Luxury living space",
    className: "bottom-[5%] right-[5%] md:bottom-[20%] md:right-[15%] w-28 md:w-48 lg:w-56 -rotate-6",
    delay: 1,
  },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative w-full h-[75vh] min-h-[600px] bg-navy flex items-end overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] z-10 shadow-sm">
            {/* Background Parallax Image */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
                    alt="DMOR Design Systems"
                    className="w-full h-full object-cover filter brightness-[0.7] grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 md:pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div className="flex flex-col w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-4 mb-6 md:mb-8"
                    >
                        <span className="w-8 h-[1px] bg-brand" />
                        <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
                            Methodology
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[1.05] tracking-tight text-cream flex flex-col"
                    >
                        <span className="font-primary">Design</span>
                        <span className="font-accent text-brand italic -mt-2">Systems.</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-5/12 lg:pb-4"
                >
                    <p className="font-body text-base md:text-lg text-cream/80 leading-relaxed tracking-wide border-l border-brand/40 pl-6">
                        A cohesive language of materials, lighting, and spatial geometry. Explore the core aesthetic frameworks that guide our interior architecture.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// ─── Design Systems List ─────────────────────────────────────────────────────

const DesignSystemsList = () => {
    return (
        <section className="relative w-full bg-[#E5E2DC] py-24 md:py-32 lg:py-48 px-6 lg:px-12 overflow-hidden z-0">
            <div className="mx-auto w-full max-w-[1300px] flex flex-col gap-20 lg:gap-32">

                {designSystems.map((system, index) => {
                    return (
                        <motion.div
                            key={system.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-br from-navy via-[#1A1B1A] to-black p-8 md:p-14 lg:p-20 overflow-hidden shadow-2xl border border-white/5"
                        >

                            <div className="relative z-10 flex flex-col gap-12 lg:gap-16">

                                {/* Top Row: Header & Title info */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="font-accent text-2xl md:text-3xl text-brand">
                                                {system.id}
                                            </span>
                                            <span className="w-12 h-[1px] bg-brand" />
                                            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-brand">
                                                Design Framework
                                            </span>
                                        </div>
                                        <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl text-cream tracking-tight">
                                            {system.title}
                                        </h2>
                                    </div>

                                    <p className="font-accent italic text-xl md:text-2xl text-cream/50">
                                        {system.subtitle}
                                    </p>
                                </div>

                                {/* Middle Row: Immersive Image Showcase */}
                                <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[1.75rem] overflow-hidden bg-navy/20 relative group">
                                    <img
                                        src={system.image}
                                        alt={system.title}
                                        className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </div>

                                {/* Bottom Row: Description & Specifications Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-4">

                                    {/* Description */}
                                    <div className="lg:col-span-7">
                                        <p className="font-body text-base md:text-lg text-cream/80 leading-[1.8]">
                                            {system.description}
                                        </p>
                                    </div>

                                    {/* Specifications / Key Elements */}
                                    <div className="lg:col-span-5 flex flex-col gap-6 bg-white/[0.03] p-8 rounded-[1.5rem] border border-white/5">
                                        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-brand">
                                            System Specifications
                                        </span>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                            {system.elements.map((element, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                                                    <span className="font-body text-sm text-cream/90">{element}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </motion.div>
                    );
                })}

            </div>
        </section>
    );
};

// ─── Floating Images CTA Section ─────────────────────────────────────────────

const CTASection = () => {
    const { openEstimation } = useEstimation();
  
    return (
      <section className="relative w-full min-h-[70vh] md:min-h-[85vh] bg-[#E5E2DC] flex items-center justify-center overflow-hidden py-24 px-4">
        
        {/* Subtle Central Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/40 rounded-full blur-[100px]" />
        </div>
  
        {/* Floating Images */}
        {floatingImages.map((image) => (
          <motion.div
            key={image.id}
            className={`absolute z-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(47,65,86,0.15)] border-4 border-[#E5E2DC] ${image.className}`}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: image.delay,
            }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3]">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        ))}
  
        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-8 md:mt-0">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-navy/20 bg-white/70 backdrop-blur-md mb-8 shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
            <span className="font-body text-xs md:text-sm font-medium text-navy uppercase tracking-wider">
              Get started
            </span>
          </motion.div>
  
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-navy leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-12"
          >
            <span className="font-primary block">Ready to elevate</span>
            <span className="font-accent text-brand italic block mt-2">your space?</span>
          </motion.h2>
  
          {/* Pill Shaped CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center md:justify-start"
          >
            <AnimatedRevealButton
              className="shadow-xl w-full sm:w-auto"
              onClick={openEstimation}
              label="GET A CONSULTATION"
              gap={16}
              padding="8px 8px 8px 24px"
              font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}
              colors={{
                fill: "transparent", 
                textColor: "#2F4156", 
                hoverTextColor: "#2F4156" 
              }}
              border={{ borderColor: "rgba(47, 65, 86, 0.2)", borderWidth: 1 }} 
              icon={{
                type: "icon",
                icon: "arrow-diagonal",
                background: "#C6A87C", 
                color: "#FFFFFF",      
                badgeSize: 48,
                size: 16,
                padding: 0
              }}
            />
          </motion.div>
  
        </div>
      </section>
    );
};

// ─── Main Page Export ────────────────────────────────────────────────────────

const DesignsPage: React.FC = () => {
    useDocumentTitle("Design Systems | DMOR Interiors");

    return (
            <main className="w-full bg-[#E5E2DC] overflow-x-hidden">
                <HeroSection />
                <DesignSystemsList />
                <CTASection />
            </main>
    );
};

export default DesignsPage;
