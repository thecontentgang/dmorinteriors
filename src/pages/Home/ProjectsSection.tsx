import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────
const featuredProjects = [
  {
    id: "01",
    title: "Dental 360",
    image: "/images/projects/dental360/dental-360-1.jpg",
  },
  {
    id: "02",
    title: "Risinia Edge",
    image: "/images/projects/risiniaedge/risinia-edge-1.jpg",
  },
  {
    id: "03",
    title: "Nyla Project",
    image: "/images/projects/nyla/nyla-1.jpg",
  },
  {
    id: "04",
    title: "Akruthi Arcadia",
    image: "/images/projects/akruthi/akruthi-2.jpg",
  },
];

// ─── Reusable Pill Button Component ──────────────────────────────────────────
const PillButton = ({ text, href, className = "" }: { text: string; href: string; className?: string }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
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
    </button>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────
const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background py-24 md:py-32 px-6 lg:px-12 overflow-hidden"
    >
      <motion.div style={{ y: sectionY }} className="max-w-[1400px] mx-auto w-full">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-brand" />
              <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-navy/70">
                Selected Works
              </span>
            </div>

            <h2 className="text-navy leading-none">
              <span className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl block">
                Spaces We've
              </span>
              <span className="font-accent text-brand italic text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] block mt-2 pr-4">
                shaped.
              </span>
            </h2>
          </div>

          <PillButton text="View All" href="/projects" className="hidden md:flex" />
        </div>

        {/* ── Polaroid Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-16 lg:gap-y-24">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 !== 0;
            const initialRotation = isEven ? 4 : -4;
            const hoverRotation = isEven ? 1 : -1;
            const slug = project.title.toLowerCase().replace(/\s+/g, "-");

            return (
              <motion.div
                key={project.id}
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
                className={`group block w-full max-w-[420px] mx-auto cursor-pointer ${isEven ? "md:mt-24" : ""}`}
              >
                <Link 
                  to={`/projects/${slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="block w-full h-full"
                >
                  {/* Polaroid Physical Container */}
                  <div className="relative w-full bg-[#2F4156] p-3 pb-16 md:p-4 md:pb-20 shadow-[0_15px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-500">

                    {/* Photo Frame */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-navy/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Handwritten Script Title Area */}
                    <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 flex items-center justify-center pointer-events-none">
                      <h3 className="font-accent text-[#F9F7F4] text-2xl md:text-4xl opacity-90 transition-colors duration-300 group-hover:text-brand">
                        {project.title}
                      </h3>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Quote & CTA Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-32 md:mt-48 flex flex-col items-center text-center gap-10 md:gap-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-primary text-3xl sm:text-4xl md:text-5xl text-navy">
              Every space tells a story.
            </h3>
            <h3 className="font-accent text-brand italic text-4xl sm:text-5xl md:text-6xl">
              Let us help you write yours.
            </h3>
          </div>

          <PillButton text="Explore Portfolio" href="/projects" />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default FeaturedProjects;