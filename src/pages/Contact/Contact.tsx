import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../../components/layout/PageTransition';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] bg-navy flex items-end overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] z-10 shadow-sm">
      {/* Background Parallax Image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
          alt="DMOR Contact"
          className="w-full h-full object-cover filter brightness-[0.5] grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-8 pb-12 md:pb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
        <div className="flex flex-col w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-4 md:mb-6"
          >
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand">
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-cream flex flex-col"
          >
            <span className="font-primary">Start a</span>
            <span className="font-accent text-brand italic -mt-1 md:-mt-2">Project.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 lg:pb-2"
        >
          <p className="font-body text-sm md:text-base text-cream/90 leading-relaxed tracking-wide border-l border-brand/40 pl-5">
            We collaborate closely with clients to shape spaces that reflect character, utility, and refined aesthetics. Reach out to begin your design journey.
          </p>
        </motion.div>
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
  useDocumentTitle('Contact | DMOR Interiors');

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
    <PageTransition>
      <main className="min-h-screen bg-cream overflow-x-hidden">

        <HeroSection />

        {/* Adjusted padding for a more compact vertical rhythm */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16">
          {/* Reduced max-width to 1100px for a tighter, compact layout */}
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
                <a href="mailto:hello@dmorinteriors.com" className="font-primary text-2xl sm:text-3xl md:text-4xl text-navy hover:text-brand transition-colors duration-300 break-all">
                  hello@dmorinteriors.com
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
                <a href="tel:+918977066990" className="font-primary text-2xl sm:text-3xl md:text-4xl text-navy hover:text-brand transition-colors duration-300">
                  +91 89770 66990
                </a>
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
                   5th Floor, Block-D, Sujay Srinivasam Near Dmart, <br/> Nizampet, Hyderbad
                </p>
              </motion.div>

              

            </div>

            {/* ─── Right Column: Interactive Form Card ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              // Reduced padding and rounded corners for a tighter, mobile-friendly fit
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

                  {/* Dropdown Toggle */}
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

                  {/* Dropdown Menu */}
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
                  {/* Pill Shaped Submit Button */}
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 md:gap-4 pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full border border-white/20 bg-transparent hover:bg-brand shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-full sm:w-auto justify-between sm:justify-start"
                  >
                    <span className="font-body text-xs md:text-sm font-semibold text-cream group-hover:text-white transition-colors duration-300">
                      {submitted ? "Request Sent" : "Submit Request"}
                    </span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand flex items-center justify-center text-navy transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45 group-hover:bg-white shrink-0">
                      {submitted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Success Message */}
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

        {/* ─── Premium Full-Width Map Section ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full h-[40vh] min-h-[300px] md:h-[50vh] md:min-h-[400px] border-t border-navy/10 relative z-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.7038178306525!2d78.3750848!3d17.5216465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d3a633fb22d%3A0xe89f2f5b01fd55e6!2sDmor%20Interiors!5e0!3m2!1sen!2sin!4v1790065783836!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) opacity(0.85)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DMOR Studio Location"
          />
        </motion.div>

      </main>
    </PageTransition>
  );
};

export default Contact;