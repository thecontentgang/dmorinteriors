import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AnimatedRevealButton from '../../components/buttons/AnimatedRevealButton';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax translation for the full-screen hero
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[100dvh] bg-navy flex items-center justify-center overflow-hidden z-10 shadow-sm">
      {/* Background Parallax Image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="/images/projects/risiniaedge/risinia-edge-23.jpg"
          alt="DMOR Contact"
          className="w-full h-full object-cover filter brightness-[0.45] grayscale-[20%]"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />
      </motion.div>

      {/* Centered Editorial Quote */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-12">


        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight text-cream flex flex-col"
        >
          <span>Your sanctuary of</span>
          <span className="font-primary text-brand mt-1 md:-mt-2">refined elegance</span>
          <span className="-mt-1 md:-mt-4">awaits.</span>
        </motion.h1>
      </div>
    </section>
  );
};

// ─── Main Contact Page Component ─────────────────────────────────────────────

const servicesList = [
  "Residential Interiors",
  "House Re-Design",
  "Landscape Design",
  "Retail & Commercial",
  "Decor & Styling",
  "2D/3D Layouts",
  "Other"
];

const Contact: React.FC = () => {
  useDocumentTitle({
    title: 'Contact | DMOR Interiors',
    description: 'Get in touch with DMOR Interiors for premium residential and commercial interior design services in Hyderabad.',
    canonical: 'https://dmor.com/contact'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', service: '' });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-cream overflow-x-hidden">

      <HeroSection />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ─── Left Column: Editorial Contact Details ─── */}
          <div className="w-full lg:w-5/12 flex flex-col gap-10 md:gap-12 lg:pt-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-2 md:gap-3"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-navy/40 font-semibold">
                Direct Inquiry
              </span>
              <a href="mailto:dmorinterior17@gmail.com" className="font-primary text-xl sm:text-2xl md:text-3xl text-navy hover:text-brand transition-colors duration-300 break-all">
                dmorinterior17@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col gap-2 md:gap-3"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-navy/40 font-semibold">
                Telephone
              </span>
              <div className="flex flex-col gap-1">
                <a href="tel:+918977066990" className="font-primary text-2xl sm:text-3xl md:text-4xl text-navy hover:text-brand transition-colors duration-300 w-fit">
                  +91 89770 66990
                </a>
                <a href="tel:+918790246990" className="font-primary text-2xl sm:text-3xl md:text-4xl text-navy hover:text-brand transition-colors duration-300 w-fit">
                  +91 87902 46990
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-3 pt-6 md:pt-8 border-t border-navy/10"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-navy/40 font-semibold">
                Studio Location
              </span>
              <p className="font-body text-base md:text-lg text-navy leading-relaxed">
                5th Floor, Block-D, Sujay Srinivasam Near Dmart, <br /> Nizampet, Hyderbad
              </p>
            </motion.div>

          </div>

          {/* ─── Right Column: Interactive Form Card ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-7/12 bg-navy p-6 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] shadow-xl relative overflow-hidden"
          >

            <form className="flex flex-col gap-6 md:gap-8 relative z-10" onSubmit={handleSubmit}>

              <div className="flex flex-col gap-2">
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-b border-white/20 py-2.5 focus:outline-none focus:border-brand text-white font-body text-sm md:text-base transition-colors placeholder:text-white/20"
                  placeholder="Eleanor Vance"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-transparent border-b border-white/20 py-2.5 focus:outline-none focus:border-brand text-white font-body text-sm md:text-base transition-colors placeholder:text-white/20"
                    placeholder="+91 91000 00000"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-1">
                    Email Address <span className="opacity-50 lowercase tracking-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent border-b border-white/20 py-2.5 focus:outline-none focus:border-brand text-white font-body text-sm md:text-base transition-colors placeholder:text-white/20"
                    placeholder="eleanor@example.com"
                  />
                </div>
              </div>

              {/* ── Custom Dropdown for Services ── */}
              <div className="flex flex-col gap-2 relative">
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-white/50">Service Required *</label>

                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`bg-transparent border-b py-2.5 flex justify-between items-center cursor-pointer transition-colors ${isDropdownOpen ? 'border-brand' : 'border-white/20 hover:border-white/40'
                    }`}
                >
                  <span className={`font-body text-sm md:text-base ${formData.service ? 'text-white' : 'text-white/20'}`}>
                    {formData.service || "Select a service..."}
                  </span>
                  <motion.svg
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white/50"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </motion.svg>
                </div>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-full mt-1 bg-[#253445] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                    >
                      {servicesList.map((service) => (
                        <div
                          key={service}
                          onClick={() => {
                            setFormData({ ...formData, service });
                            setIsDropdownOpen(false);
                          }}
                          className="px-4 md:px-5 py-3 font-body text-sm text-white hover:bg-brand/20 hover:text-brand cursor-pointer transition-colors border-b border-white/5 last:border-none"
                        >
                          {service}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-start gap-4 mt-4">
                <AnimatedRevealButton
                  type="submit"
                  className="shadow-md hover:shadow-lg w-full sm:w-auto"
                  label={submitted ? "REQUEST SENT" : "SUBMIT REQUEST"}
                  gap={16}
                  padding="8px 8px 8px 24px"
                  font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  colors={{
                    fill: "transparent",
                    textColor: "#E8E2D5", // cream text
                    hoverTextColor: "#2F4156"
                  }}
                  border={{ borderColor: "rgba(255, 255, 255, 0.2)", borderWidth: 1 }}
                  icon={{
                    type: "icon",
                    icon: "arrow-diagonal",
                    background: "#C6A87C", // bg-brand
                    color: "#2F4156",      // text-navy
                    badgeSize: 48,
                    size: 16,
                    padding: 0
                  }}
                />

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-brand mt-1 ml-2"
                  >
                    Thank you. We will connect shortly.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ─── Smaller Embedded Map Section ─── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-[1100px] mx-auto w-full h-[250px] md:h-[350px] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-md relative z-0 border border-navy/10"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.7038178306525!2d78.3750848!3d17.5216465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d3a633fb22d%3A0xe89f2f5b01fd55e6!2sDmor%20Interiors!5e0!3m2!1sen!2sin!4v1790065783836!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.05) opacity(0.9)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DMOR Studio Location"
          />
        </motion.div>
      </div>

    </main>
  );
};

export default Contact;