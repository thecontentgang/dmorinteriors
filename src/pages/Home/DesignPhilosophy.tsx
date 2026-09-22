import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const principles = [
  {
    id: "01",
    title: "Context",
    description: "Every space begins with understanding its people and surroundings.",
    image: "/images/projects/dental360/dental-360-9.jpg",
  },
  {
    id: "02",
    title: "Material",
    description: "Textures and materials are selected to create depth and character.",
    image: "/images/projects/nyla/nyla-7.jpg",
  },
  {
    id: "03",
    title: "Light",
    description: "Natural and architectural lighting shape how every space feels.",
    image: "/images/projects/risiniaedge/risinia-edge-7.jpg",
  },
  {
    id: "04",
    title: "Detail",
    description: "The smallest details complete the larger experience.",
    image: "/images/projects/risiniaedge/risinia-edge-26.jpg",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const DesignPhilosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  const [activeId, setActiveId] = useState<string | null>(null);

  // Background fade effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // ─── Mouse Tracking Logic for the Floating Card ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply a spring for that smooth, delayed "gliding" feeling
  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the list container
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: bgOpacity }}
      className="relative w-full bg-navy py-24 md:py-32 lg:py-40 px-6 lg:px-12 overflow-hidden text-cream"
    >
      <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center">
        
        {/* ── 1. Monumental Centered Heading ── */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-32 w-full max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-cream/60">
              Our Philosophy
            </span>
            <span className="w-8 h-[1px] bg-brand" />
          </div>

          <h2 className="leading-[1.1] tracking-tight flex flex-col items-center">
            <span className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream">
              Design With
            </span>
            <span className="font-accent text-brand italic text-6xl sm:text-7xl md:text-8xl lg:text-9xl mt-2 drop-shadow-lg pr-4">
              Intention.
            </span>
          </h2>
        </div>

        {/* ── 2. Interactive List Container ── */}
        <div 
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveId(null)}
          className="relative w-full flex flex-col border-t border-cream/15" 
        >
          
          {/* Mouse-Following Floating Card (Hidden on Mobile) */}
          <motion.div 
            style={{ 
              x: springX, 
              y: springY, 
              translateX: "-50%", 
              translateY: "-50%" 
            }}
            className="pointer-events-none absolute top-0 left-0 w-[240px] lg:w-[280px] aspect-[4/5] z-30 hidden md:block"
          >
            <AnimatePresence mode="wait">
              {activeId && (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-navy rounded-3xl overflow-hidden"
                >
                  <img
                    src={principles.find(p => p.id === activeId)?.image}
                    alt="Design Philosophy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/10 mix-blend-multiply" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* List Items */}
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              onMouseEnter={() => setActiveId(principle.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-cream/15 items-start md:items-center cursor-pointer transition-opacity duration-300 ${
                activeId && activeId !== principle.id ? "md:opacity-30" : "opacity-100"
              }`}
            >
              
              {/* Number (Left Column) */}
              <div className="md:col-span-2 flex md:justify-start">
                <span className="font-accent text-3xl md:text-4xl lg:text-5xl text-cream/30 transition-colors duration-500 group-hover:text-brand">
                  {principle.id}.
                </span>
              </div>

              {/* Title (Middle Column) */}
              <div className="md:col-span-4 flex md:justify-start relative z-10">
                <h3 className="font-primary text-4xl md:text-5xl lg:text-6xl text-cream transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-3">
                  {principle.title}
                </h3>
              </div>

              {/* Description (Right Column) */}
              <div className="md:col-span-6 flex md:justify-end mt-4 md:mt-0 relative z-10">
                <p className="font-body text-base md:text-lg lg:text-xl text-cream/60 leading-relaxed tracking-wide md:text-right max-w-sm lg:max-w-md transition-colors duration-500 group-hover:text-cream/90">
                  {principle.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default DesignPhilosophy;