import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SignatureProject: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. REFINED PARALLAX: A subtle, elegant scroll speed
  // Traveling from -15% to 15% creates a smooth, professional pace.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-navy"
    >
      {/* ── Background Image with Parallax ── */}
      <motion.div
        style={{ y: imageY }}
        // Height is 130% (just 30% taller than the screen).
        // -top-[15%] pulls it up exactly half of that extra height so it's perfectly centered.
        className="absolute inset-0 w-full h-[130%] -top-[15%] z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=2000"
          alt="Signature Project by DMOR"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default SignatureProject;