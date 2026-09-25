import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  "/images/projects/risiniaedge/risinia-edge-18.jpg",
  "/images/projects/nyla/nyla-15.jpg",
  "/images/projects/dental360/dental-360-8.jpg"
];

const texts = [
  "Better Design",
  "Flawless Execution",
  "Bespoke Experience"
];

const SignatureProject: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── Image Sliding Transforms ───
  // Image 1 slides up from bottom (100%) to top (0%)
  const img1Y = useTransform(scrollYProgress, [0.15, 0.45], ["100%", "0%"]);

  // Image 2 slides up from bottom (100%) to top (0%)
  const img2Y = useTransform(scrollYProgress, [0.55, 0.85], ["100%", "0%"]);

  return (
    // Height 300vh creates a long scrollable track for the sticky element
    <section ref={containerRef} className="relative w-full h-[300vh] bg-navy">

      {/* ── Sticky Viewport (Locks perfectly without breaking layout) ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-navy">

        {/* ── Image 0 (Base layer) ── */}
        <motion.div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          <img src={images[0]} alt="Project 1" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-navy/40" />

          <h2 className="relative z-10 font-primary text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-cream tracking-tight text-center w-full drop-shadow-xl px-4">
            {texts[0]}
          </h2>
        </motion.div>

        {/* ── Image 1 (Slides up over base layer) ── */}
        <motion.div style={{ y: img1Y }} className="absolute inset-0 w-full h-full z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center">
          <img src={images[1]} alt="Project 2" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-navy/40" />

          <h2 className="relative z-10 font-primary text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-cream tracking-tight text-center w-full drop-shadow-xl px-4">
            {texts[1]}
          </h2>
        </motion.div>

        {/* ── Image 2 (Slides up over layer 1) ── */}
        <motion.div style={{ y: img2Y }} className="absolute inset-0 w-full h-full z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center">
          <img src={images[2]} alt="Project 3" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-navy/40" />

          <h2 className="relative z-10 font-primary text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-cream tracking-tight text-center w-full drop-shadow-xl px-4">
            {texts[2]}
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

export default SignatureProject;