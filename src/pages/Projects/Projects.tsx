import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/layout/PageTransition';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';
import { useEstimation } from '../../context/EstimationContext';

// ─── Floating CTA Data ───────────────────────────────────────────────────────

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

// ─── Sections ────────────────────────────────────────────────────────────────

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
          src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=2000"
          alt="DMOR Featured Projects"
          className="w-full h-full object-cover filter brightness-[0.6] grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 md:pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

        {/* Left: Titles */}
        <div className="flex flex-col w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
              Our Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[1.05] tracking-tight text-cream flex flex-col"
          >
            <span className="font-primary">Featured</span>
            <span className="font-accent text-brand italic -mt-2">Projects.</span>
          </motion.h1>
        </div>

        {/* Right: Intro Paragraph */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 lg:pb-4"
        >
          <p className="font-body text-base md:text-lg text-cream/90 leading-relaxed tracking-wide border-l border-brand/40 pl-6">
            A curated collection of our most defining work. From bespoke residential sanctuaries to innovative commercial environments, discover how we shape space and experience.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

const CTASection = () => {
  const { openEstimation } = useEstimation();

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-4 z-0">
      
      {/* ── Optional: Subtle Central Background Glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/40 rounded-full blur-[100px]" />
      </div>

      {/* ── Floating Images ── */}
      {floatingImages.map((image) => (
        <motion.div
          key={image.id}
          className={`absolute z-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(47,65,86,0.15)] border-4 border-[#E5E2DC] ${image.className}`}
          animate={{ y: [0, -15, 0] }}
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
            />
          </div>
        </motion.div>
      ))}

      {/* ── Central Content ── */}
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
          <span className="font-primary block">Ready to bring your</span>
          <span className="font-accent text-brand italic block mt-2">vision to life?</span>
        </motion.h2>

        {/* Pill Shaped CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={openEstimation}
            className="group inline-flex items-center gap-4 md:gap-6 pl-8 pr-2 py-2 rounded-full border border-navy/20 bg-transparent hover:bg-brand shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-full sm:w-auto"
          >
            <span className="font-body text-sm md:text-base font-semibold text-navy group-hover:text-white transition-colors duration-300">
              Get FREE consultation
            </span>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy flex items-center justify-center text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

// ─── Main Page Component ─────────────────────────────────────────────────────

const Projects: React.FC = () => {
  useDocumentTitle('Projects | DMOR Interiors');

  return (
    <PageTransition>
      {/* Set main container background to your preferred page color */}
      <main className="min-h-screen bg-[#E5E2DC] overflow-x-hidden">
        
        <HeroSection />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 md:mt-32 pb-16 md:pb-24">
          {/* Polaroid Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-16 lg:gap-y-24">
            {projects.map((project, index) => {
              const isEven = index % 2 !== 0;
              // Alternating starting rotations to mimic casually scattered physical photos
              const initialRotation = isEven ? 4 : -4;
              const hoverRotation = isEven ? 1 : -1;

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 150, rotate: initialRotation, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, rotate: initialRotation, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -15,
                    rotate: hoverRotation,
                    scale: 1.02,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  transition={{
                    duration: 1,
                    delay: isEven ? 0.2 : 0,
                    type: "spring",
                    bounce: 0.15
                  }}
                  className={`group block w-full max-w-[420px] mx-auto cursor-pointer ${isEven ? "md:mt-24" : ""
                    }`}
                >
                  <Link to={`/projects/${project.slug}`} className="block w-full h-full">
                    {/* Polaroid Physical Container */}
                    <div className="relative w-full bg-[#2F4156] p-3 pb-16 md:p-4 md:pb-20 shadow-[0_15px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500">

                      {/* Photo Frame */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-navy/5">
                        <img
                          src={project.images[0]} // Taking the first image from your projects data array
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>

                      {/* Handwritten Script Title Area */}
                      <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 flex flex-col items-center justify-center pointer-events-none">
                        <h3 className="font-accent text-[#F9F7F4] text-2xl md:text-4xl opacity-90 transition-colors duration-300 group-hover:text-brand">
                          {project.title}
                        </h3>
                        {/* Optional: Keeping the category/location as a tiny detail */}
                        <p className="font-body text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#F9F7F4]/40 mt-1">
                          {project.category} — {project.location}
                        </p>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <CTASection />

      </main>
    </PageTransition>
  );
};

export default Projects;