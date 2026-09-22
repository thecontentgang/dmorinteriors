import React from "react";
import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    quote: "DMOR transformed our bare apartment into a warm, inviting home. Their eye for detail is unmatched.",
    author: "Karthik Reddy",
    project: "Jubilee Hills Villa",
  },
  {
    id: 2,
    quote: "Flawless execution from start to finish. They truly understood our vision and brought it to life perfectly.",
    author: "Ananya Rao",
    project: "Banjara Hills Residence",
  },
  {
    id: 3,
    quote: "Our office space now feels both luxurious and highly functional. The team exceeded all our expectations.",
    author: "Sandeep Varma",
    project: "Hitech City Workspace",
  },
  {
    id: 4,
    quote: "Incredible craftsmanship and material selection. Every corner of our home feels uniquely tailored to us.",
    author: "Priya Desai",
    project: "Kokapet Penthouse",
  },
  {
    id: 5,
    quote: "They beautifully balanced modern aesthetics with traditional elements. We absolutely love our new space.",
    author: "Vikram & Neha Ahuja",
    project: "Gachibowli Condo",
  },
  {
    id: 6,
    quote: "A masterclass in spatial planning. They made our compact apartment feel incredibly spacious and breathable.",
    author: "Meghana K",
    project: "Madhapur Loft",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const TestimonialsSection: React.FC = () => {
  const SCROLL_SPEED = 45; // Faster scroll for smaller cards
  const EDGE_FADE = "10%";

  return (
    <section className="relative w-full bg-cream py-20 md:py-28 lg:py-32 overflow-hidden">
      
      {/* ── Section Header ── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col items-center text-center mb-12 md:mb-16 w-full">
        
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-navy/20 bg-white/40 backdrop-blur-sm mb-5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span className="font-body text-[10px] md:text-xs font-medium text-navy uppercase tracking-wider">
            Client Stories
          </span>
        </div>

        <h2 className="text-navy leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl">
          <span className="font-primary block">Words from our</span>
          <span className="font-accent text-brand italic block mt-1">clients.</span>
        </h2>
      </div>

      {/* ── Infinite Marquee Track ── */}
      <div
        className="relative w-full flex overflow-hidden py-4"
        style={{
          WebkitMaskImage: `linear-gradient(to right, transparent 0, black ${EDGE_FADE}, black calc(100% - ${EDGE_FADE}), transparent 100%)`,
          maskImage: `linear-gradient(to right, transparent 0, black ${EDGE_FADE}, black calc(100% - ${EDGE_FADE}), transparent 100%)`,
        }}
      >
        <motion.div
          className="flex w-max cursor-grab active:cursor-grabbing"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: SCROLL_SPEED,
          }}
        >
          {/* Two sets of cards for seamless infinite scroll */}
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex gap-5 md:gap-6 pr-5 md:pr-6">
              
              {testimonials.map((testimonial, idx) => (
                <article
                  key={`${setIndex}-${idx}`}
                  // Reduced width and padding to make it much more compact
                  className="relative flex flex-col justify-between w-[280px] md:w-[340px] shrink-0 bg-navy text-white p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg overflow-hidden group hover:-translate-y-1.5 transition-transform duration-500"
                >
                  {/* Decorative Background Accent */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand/10 rounded-full blur-2xl group-hover:bg-brand/20 transition-colors duration-700 pointer-events-none" />

                  {/* Top Row: Quote Mark & Project Tag */}
                  <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
                    <span className="font-accent text-brand text-5xl md:text-6xl leading-[0.5] mt-3">
                      “
                    </span>
                    <span className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-navy bg-brand px-3 py-1.5 rounded-full whitespace-nowrap font-semibold">
                      {testimonial.project}
                    </span>
                  </div>

                  {/* Main Quote Text (Smaller text, tighter margins) */}
                  <p className="font-primary text-lg md:text-xl text-cream/95 leading-relaxed mb-6 relative z-10">
                    {testimonial.quote}
                  </p>

                  {/* Author Info */}
                  <div className="flex flex-col pt-4 border-t border-white/10 relative z-10">
                    <span className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                      {testimonial.author}
                    </span>
                  </div>
                </article>
              ))}

            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default TestimonialsSection;