import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import AnimatedRevealButton from "../../components/buttons/AnimatedRevealButton";

// ─── Data ─────────────────────────────────────────────────────────────────────

const principles = [
  {
    id: "01",
    title: "Thoughtful",
    description: "Every element has a purpose, chosen intentionally to elevate daily life and seamlessly integrate into your routine.",
  },
  {
    id: "02",
    title: "Timeless",
    description: "Designed beyond passing trends, anchored in classic architectural balance and enduring materiality.",
  },
  {
    id: "03",
    title: "Personal",
    description: "Created around the unique routines and rhythms of the people who experience the space.",
  },
];

const team = [
  {
    name: "CH Swapna Reddy",
    role: "Founder & Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "D Nagamani",
    role: "Co-Founder | Managing Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  },
];

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] } }
};

// ─── Sections ─────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-navy flex items-end z-10 shadow-sm rounded-b-[2rem] md:rounded-b-[4rem]">
      {/* Full Background Image with Parallax & Scale */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 origin-bottom">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src="/images/backgrounds/dmor-about-hero.png"
          alt="DMOR Interior Architecture"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.1] grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
      </motion.div>

      {/* Bottom Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 md:pb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        {/* Left: Headline */}
        <div className="flex flex-col w-full md:w-[55%]">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
              About DMOR
            </span>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col text-cream">
            <div className="overflow-hidden pb-2">
              <motion.span variants={fadeUp} className="inline-block font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[1]">
                Designed With
              </motion.span>
            </div>
            <div className="overflow-hidden pb-4 -mt-2 md:-mt-4">
              <motion.span variants={fadeUp} className="inline-block font-accent text-brand italic text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-[1] pr-4">
                Intention.
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Right: Description */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
          className="w-full md:w-[45%] md:pl-12 md:mb-6"
        >
          <div className="relative border-l border-brand/40 pl-6 py-2 before:absolute before:left-[-1px] before:top-0 before:w-[1px] before:h-0 before:bg-brand before:animate-[drawLine_1.5s_ease-out_0.8s_forwards]">
            <p className="font-body text-base md:text-xl text-cream/90 leading-relaxed tracking-wide">
              DMOR is an interior design studio creating refined, functional, and deeply personal spaces. We bring together architecture, material, light, and detail to create environments that feel timeless and considered.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  
  return (
    <section ref={ref} className="relative w-full bg-cream py-32 md:py-48 px-6 lg:px-12 text-navy overflow-hidden">
      <motion.div style={{ y }} className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <svg className="w-12 h-12 md:w-16 md:h-16 text-brand mb-10 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 22h20L12 2z"/>
          </svg>
        </motion.div>

        <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.3] text-navy/90">
          "We don't just design spaces; we curate experiences that resonate with your soul and stand the test of time."
        </h2>
        <p className="mt-10 font-accent text-brand text-2xl md:text-4xl italic">
          — The DMOR Ethos
        </p>
      </motion.div>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section className="relative w-full bg-navy py-24 md:py-40 px-6 lg:px-12 text-cream overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.03]">
        <span className="font-primary text-[20vw] whitespace-nowrap text-white leading-none">PHILOSOPHY</span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-cream/70">
              Our Philosophy
            </span>
            <span className="w-8 h-[1px] bg-brand" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8"
          >
            More Than Just <br className="hidden sm:block" />
            <span className="font-accent text-brand italic">Beautiful Spaces.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base md:text-lg text-cream/70 leading-relaxed max-w-xl"
          >
            We believe great interiors should feel as good as they look. Every project begins with understanding the people, the space, and the story behind it.
          </motion.p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
              className="group relative flex flex-col p-8 md:p-12 border border-cream/10 bg-cream/5 hover:bg-brand rounded-2xl transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Animated Background Reveal */}
              <div className="absolute inset-0 bg-brand translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="font-accent text-5xl md:text-6xl text-brand group-hover:text-navy mb-10 transition-colors duration-500">
                  {principle.id}.
                </div>
                <h3 className="font-primary text-3xl md:text-4xl text-cream group-hover:text-navy mb-6 transition-colors duration-500">
                  {principle.title}
                </h3>
                <p className="font-body text-base md:text-lg text-cream/60 group-hover:text-navy/80 leading-relaxed transition-colors duration-500 mt-auto">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section className="relative w-full bg-cream py-24 md:py-40 px-6 lg:px-12 text-navy overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-navy/70">
              Our Team
            </span>
            <span className="w-8 h-[1px] bg-brand" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-primary text-5xl sm:text-6xl md:text-7xl tracking-tight max-w-2xl mb-6"
          >
            The People Behind <span className="font-accent text-brand italic">DMOR.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base md:text-lg text-navy/60 max-w-xl mx-auto"
          >
            A collaborative team of leaders, strategists, and execution specialists working together to transform ideas into meaningful spaces.
          </motion.p>
        </div>

        {/* Portrait Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 max-w-[1000px] mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className="group flex flex-col items-center md:items-start cursor-default"
            >
              {/* Portrait Image with Mask Animation */}
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-8 rounded-2xl shadow-lg">
                <motion.div 
                  variants={clipReveal} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full h-full"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale-[40%] contrast-[1.05] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                </motion.div>
              </div>

              {/* Minimalist Details */}
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="font-primary text-3xl md:text-4xl text-navy mb-3 transition-colors duration-300 group-hover:text-brand"
                >
                  {member.name}
                </motion.h3>
              </div>
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-navy/50"
                >
                  {member.role}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section className="relative w-full bg-navy py-32 md:py-48 px-6 lg:px-12 text-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-4 mb-10">
          <span className="w-12 h-[1px] bg-brand" />
          <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-brand">
            Our Approach
          </span>
          <span className="w-12 h-[1px] bg-brand" />
        </div>

        <h2 className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 text-cream">
          From Vision to <br />
          <span className="font-accent text-brand italic">Reality.</span>
        </h2>

        <p className="font-body text-base md:text-lg lg:text-xl text-cream/70 max-w-2xl leading-relaxed mb-16">
          From the first conversation to the final detail, we work closely with our clients to create spaces that are thoughtful, functional, and uniquely theirs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          <AnimatedRevealButton
            className="shadow-xl"
            to="/projects"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            label="DISCOVER OUR PROJECTS"
            gap={16}
            padding="12px 12px 12px 32px"
            font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}
            colors={{
              fill: "#C6A87C", // brand
              textColor: "#2F4156", // navy
              hoverTextColor: "#FFFFFF"
            }}
            border={{ borderColor: "#C6A87C", borderWidth: 1 }}
            icon={{
              type: "icon",
              icon: "arrow-diagonal",
              background: "#2F4156", // navy
              color: "#C6A87C", // brand
              badgeSize: 48,
              size: 18,
              padding: 0
            }}
          />

          <AnimatedRevealButton
            className="shadow-xl"
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            label="START A CONVERSATION"
            gap={16}
            padding="12px 12px 12px 32px"
            font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}
            colors={{
              fill: "transparent",
              textColor: "#E8E2D5", // cream
              hoverTextColor: "#2F4156"
            }}
            border={{ borderColor: "rgba(255, 255, 255, 0.2)", borderWidth: 1 }}
            icon={{
              type: "icon",
              icon: "arrow-diagonal",
              background: "#E8E2D5", // cream
              color: "#2F4156", // navy
              badgeSize: 48,
              size: 18,
              padding: 0
            }}
          />
        </div>
      </motion.div>
      
      {/* Decorative background element */}
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

// ─── Main Page Export ─────────────────────────────────────────────────────────

const AboutPage: React.FC = () => {
  useDocumentTitle({
    title: "About DMOR | Interior Architecture & Design",
    description: "Learn about DMOR Interiors' philosophy, our design process, and our commitment to crafting environments of enduring quality.",
    canonical: "https://dmor.com/about"
  });

  return (
    <main className="w-full bg-cream overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <TeamSection />
      <CtaSection />
    </main>
  );
};

export default AboutPage;