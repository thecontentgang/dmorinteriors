import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  {
    id: "01",
    title: "Interior Design",
    description: "Curating bespoke environments that reflect your lifestyle and harmonize with architectural intent.",
    image: "/images/backgrounds/interior-design.png",
  },
  {
    id: "02",
    title: "House Renovation",
    description: "Transforming existing footprints into revitalized, contemporary sanctuaries built for modern living.",
    image: "/images/backgrounds/house-redesign.png",
  },
  {
    id: "03",
    title: "Landscape Design",
    description: "Bridging the gap between indoor luxury and natural outdoor serenity through organic planning.",
    image: "/images/backgrounds/lanscape-design.png",
  },
  {
    id: "04",
    title: "Retail & Commercial",
    description: "Designing immersive commercial spaces and experiential environments that elevate brand identity.",
    image: "/images/backgrounds/retail-commercial.png",
  },
  {
    id: "05",
    title: "Decor & Styling",
    description: "The final layer of refinement, meticulously selecting artifacts, art, and custom furnishings.",
    image: "/images/backgrounds/decor-styling.png",
  },
  {
    id: "06",
    title: "2D/3D Layouts",
    description: "Precise spatial planning and hyper-realistic visualizations to guide the project vision seamlessly.",
    image: "/images/backgrounds/2d-3d-layout.png",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle background shift for depth
  const sectionY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={containerRef}
      // Increased py (top/bottom) and px (left/right) for much wider spacing
      className="relative w-full bg-cream py-24 md:py-36 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 overflow-hidden"
    >
      <motion.div style={{ y: sectionY }} className="max-w-[1600px] mx-auto w-full">
        
        {/* ── Section Header (Split Layout) ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 lg:mb-28">
          
          {/* Left Side: Title & Badge */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-navy/20 bg-white/40 backdrop-blur-sm mb-6 lg:mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              <span className="font-body text-xs md:text-sm font-medium text-navy uppercase tracking-wider">
                Our services
              </span>
            </div>
            
            <h2 className="text-navy leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="font-primary block">What we can do</span>
              <span className="font-accent text-brand italic block mt-2">for you</span>
            </h2>
          </div>

          {/* Right Side: Description & Button */}
          <div className="max-w-md flex flex-col items-start lg:items-end text-left lg:text-right gap-8 lg:pb-4">
            <p className="font-body text-navy/80 text-base md:text-lg lg:text-xl leading-relaxed">
              From design to installation, we provide quality interior solutions tailored to your unique lifestyle and needs.
            </p>
            
            <a href="/services" className="group inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-navy/20 bg-brand/10 hover:bg-brand transition-all duration-300 cursor-pointer">
              <span className="font-body text-sm font-semibold text-navy group-hover:text-white transition-colors duration-300">
                See our services
              </span>
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* ── 3-Column Grid ── */}
        {/* Capped at lg:grid-cols-3 to ensure exactly 3 items per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.a
              href={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="group relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden cursor-pointer block"
            >
              
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              
              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Top Right Hover Arrow Button */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-3">
                <h3 className="font-primary text-2xl lg:text-3xl text-white leading-tight pr-4">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-white/80 line-clamp-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {service.description}
                </p>
              </div>

            </motion.a>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default ServicesSection;