import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ================================================================
  // ARCH ANIMATION
  // ================================================================

  // Phase 1: Arch grows vertically from 80vh → 100vh
  const archHeight = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["80vh", "100vh"]
  );

  // Phase 2: Arch expands horizontally to fill the viewport
  const archMaxWidth = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8],
    ["550px", "550px", "4000px"]
  );

  // Rounded arch → full-screen rectangle
  const archBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8],
    ["275px", "275px", "0px"]
  );

  // ================================================================
  // CONTENT ANIMATIONS
  // ================================================================

  // Hero Text moves from center to top as user scrolls
  const heroTextY = useTransform(
    scrollYProgress,
    [0.4, 0.85],
    ["0vh", "-25vh"]
  );

  // Lower Content fades in right as the width expansion finishes
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.85, 1], 
    [0, 1, 1]        
  );

  // Lower Content slides up into place and locks securely
  const contentY = useTransform(
    scrollYProgress,
    [0.65, 0.85, 1],
    [40, 0, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-cream"
    >
      {/* ============================================================
          STICKY HERO
          ============================================================ */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-end overflow-hidden bg-cream">
        
        {/* ==========================================================
            ANIMATED ARCH CONTAINER
            ========================================================== */}
        <motion.div
          style={{
            height: archHeight,
            maxWidth: archMaxWidth,
            borderTopLeftRadius: archBorderRadius,
            borderTopRightRadius: archBorderRadius,
          }}
          className="relative w-full overflow-hidden shadow-2xl"
        >
          {/* ========================================================
              VIDEO
              ======================================================== */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          >
            <source src="/videos/dmor-hero.mp4" type="video/mp4" />
          </video>

          {/* ========================================================
              DARK OVERLAY
              ======================================================== */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/20 via-transparent to-black/65 z-10 pointer-events-none" />

          {/* ========================================================
              CENTERED HERO TYPOGRAPHY (Moves to top on scroll)
              ======================================================== */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-none pb-[10vh] md:pb-[15vh]">
            <motion.div style={{ y: heroTextY }}>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-primary text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-wide"
              >
                <span className="font-accent text-brand block mb-2 lowercase text-5xl md:text-7xl lg:text-8xl tracking-normal">
                  For the best
                </span>
                Interior Experience...
              </motion.h1>
            </motion.div>
          </div>

          {/* ========================================================
              LOWER CONTENT (Appears AFTER expansion)
              ======================================================== */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
            }}
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end gap-8 md:gap-12 px-6 pb-24 md:pb-36 lg:pb-48 z-[50] max-w-3xl lg:max-w-4xl mx-auto text-center pointer-events-auto"
          >
            {/* Description */}
            <p className="font-body text-cream/90 text-base md:text-lg lg:text-xl leading-relaxed tracking-wide drop-shadow-md">
              Transforming spaces into timeless sanctuaries. Experience unparalleled luxury with our bespoke interior design architecture, crafted specifically for the modern connoisseur.
            </p>

            {/* Centered Metrics */}
            <div className="flex items-center justify-center gap-12 md:gap-20">
              <div className="flex flex-col items-center">
                <span className="font-primary text-5xl md:text-6xl text-white tracking-wide drop-shadow-md">150+</span>
                <span className="font-body text-xs md:text-sm text-brand uppercase tracking-[0.2em] mt-1 drop-shadow-sm">Projects</span>
              </div>
              
              {/* Divider Line */}
              <div className="w-[1px] h-14 md:h-20 bg-brand/50"></div>
              
              <div className="flex flex-col items-center">
                <span className="font-primary text-5xl md:text-6xl text-white tracking-wide drop-shadow-md">25+</span>
                <span className="font-body text-xs md:text-sm text-brand uppercase tracking-[0.2em] mt-1 drop-shadow-sm">Awards</span>
              </div>
            </div>

            {/* Working Action Links */}
            <div className="flex gap-4 md:gap-6 mt-2">
              <Link
                to="/projects"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-8 py-3.5 md:px-10 md:py-4 border border-brand bg-brand text-navy rounded-full font-body text-sm md:text-base tracking-widest uppercase hover:bg-white hover:border-white transition-colors duration-300 cursor-pointer shadow-md text-center"
              >
                Explore
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-8 py-3.5 md:px-10 md:py-4 border border-white/30 bg-white/5 backdrop-blur-md text-white rounded-full font-body text-sm md:text-base tracking-widest uppercase hover:bg-white hover:text-navy transition-colors duration-300 cursor-pointer shadow-md text-center"
              >
                Contact
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;