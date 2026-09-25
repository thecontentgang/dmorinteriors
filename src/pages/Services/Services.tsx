import AnimatedRevealButton from '../../components/buttons/AnimatedRevealButton';
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useEstimation } from "../../context/EstimationContext";

// ─── Data ────────────────────────────────────────────────────────────────────
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

const services = [
  {
    id: "01",
    title: "Residential Interiors",
    description: "Curating bespoke environments that reflect your lifestyle and harmonize with architectural intent.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "02",
    title: "House Re-Design",
    description: "Transforming existing footprints into revitalized, contemporary sanctuaries built for modern living.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "03",
    title: "Landscape Design",
    description: "Bridging the gap between indoor luxury and natural outdoor serenity through organic planning.",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f0a?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "04",
    title: "Retail & Commercial",
    description: "Designing immersive commercial spaces and experiential environments that elevate brand identity.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "05",
    title: "Decor & Styling",
    description: "The final layer of refinement, meticulously selecting artifacts, art, and custom furnishings.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "06",
    title: "2D/3D Layouts",
    description: "Precise spatial planning and hyper-realistic visualizations to guide the project vision seamlessly.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1600",
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
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="/images/backgrounds/dmor-service-hero.png"
          alt="DMOR Services"
          className="w-full h-full object-cover filter brightness-[0.6] grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 md:pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
              Expertise
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[1.05] tracking-tight text-cream flex flex-col"
          >
            <span className="font-primary">Mastering</span>
            <span className="font-accent text-brand italic -mt-2">the space.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 lg:pb-4"
        >
          <p className="font-body text-base md:text-lg text-cream/90 leading-relaxed tracking-wide border-l border-brand/40 pl-6">
            Our multi-disciplinary practice covers every aspect of interior architecture and styling. From the first structural layout to the final curated artifact, we deliver complete, turn-key luxury.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesList = () => {
  return (
    <section className="relative w-full bg-cream px-6 py-24 md:px-8 md:py-32 lg:px-12 lg:py-40 overflow-hidden z-0">
      <div className="mx-auto w-full max-w-[1600px]">

        
        {/* SERVICES GRID - Redesigned to match your tall elegant cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const slug = service.title
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="w-full"
              >
                <Link
                  to={`/services/${slug}`}
                  className="group relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden block"
                >
                  {/* Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
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
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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
            label="GET FREE CONSULTATION"
            gap={16}
            padding="8px 8px 8px 24px"
            font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}
            colors={{
              fill: "#E8E2D5", 
              textColor: "#2F4156", 
              hoverTextColor: "#FFFFFF" 
            }}
            border={{ borderColor: "rgba(47, 65, 86, 0.2)", borderWidth: 1 }} 
            icon={{
              type: "icon",
              icon: "arrow-diagonal",
              background: "#2F4156", 
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

const ServicesPage: React.FC = () => {
  useDocumentTitle("Services | DMOR Interiors");

  return (
      <main className="w-full bg-cream overflow-x-hidden">
        <HeroSection />
        <ServicesList />
        <CTASection />
      </main>
  );
};

export default ServicesPage;
