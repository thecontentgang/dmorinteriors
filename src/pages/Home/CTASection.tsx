import React from "react";
import { motion } from "framer-motion";
import { useEstimation } from "../../context/EstimationContext";

// ─── Floating Images Data ────────────────────────────────────────────────────
const floatingImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
    alt: "Interior details",
    // Top Left
    className: "top-[5%] left-[2%] md:top-[15%] md:left-[10%] w-28 md:w-48 lg:w-56 -rotate-6",
    delay: 0,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    alt: "Design consultation",
    // Top Right
    className: "top-[10%] right-[2%] md:top-[20%] md:right-[10%] w-24 md:w-40 lg:w-48 rotate-6",
    delay: 1.5,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    alt: "Modern architecture",
    // Bottom Left
    className: "bottom-[10%] left-[5%] md:bottom-[15%] md:left-[15%] w-24 md:w-40 lg:w-48 rotate-3",
    delay: 2.5,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600",
    alt: "Luxury living space",
    // Bottom Right
    className: "bottom-[5%] right-[5%] md:bottom-[20%] md:right-[15%] w-28 md:w-48 lg:w-56 -rotate-6",
    delay: 1,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const CTASection: React.FC = () => {
  const { openEstimation } = useEstimation();

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] bg-cream flex items-center justify-center overflow-hidden py-24 px-4">
      
      {/* ── Optional: Subtle Central Background Glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/40 rounded-full blur-[100px]" />
      </div>

      {/* ── Floating Images ── */}
      {floatingImages.map((image) => (
        <motion.div
          key={image.id}
          className={`absolute z-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(47,65,86,0.15)] border-4 border-white ${image.className}`}
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={openEstimation}
            type="button"
            className="group inline-flex items-center gap-4 md:gap-6 pl-8 pr-2 py-2 rounded-full border border-navy/20 bg-[#E8E2D5] hover:bg-brand shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
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

export default CTASection;