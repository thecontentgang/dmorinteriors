import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type Variants } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useEstimation } from '../../context/EstimationContext';

interface NavbarProps {
  theme?: 'light' | 'dark' | 'transparent';
}

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Designs', href: '/designs' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const { openEstimation } = useEstimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarMode, setNavbarMode] = useState<'normal' | 'menu'>('normal');

  // State for hiding/showing navbar on scroll
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar if scrolling down and past 100px. Show if scrolling up.
    // Prevent hiding if the menu overlay is currently open.
    if (latest > previous && latest > 100 && !isMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
      setNavbarMode('menu');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    // Navigate immediately without the delay/zoom animation
    navigate(href);
  };

  const handleInquireClick = () => {
    closeMenu();
    navigate('/contact');
  };

  // ─── Theme & Background Logic ───
  const getThemeClasses = () => {
    if (navbarMode === 'menu') {
      return 'bg-transparent border-transparent text-cream';
    }
    // Using the theme prop to fix the ESLint unused-vars warning
    if (theme === 'dark') {
      return 'bg-navy text-cream rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-sm';
    }
    if (theme === 'transparent') {
      return 'bg-transparent text-current';
    }
    // Default light theme
    return 'bg-brand text-navy rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-sm';
  };

  // ─── Animation Variants ───
  const overlayVariants: Variants = {
    closed: {
      clipPath: 'circle(0px at 40px 40px)',
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    open: {
      clipPath: 'circle(3000px at 40px 40px)',
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
  };

  const linkVariants: Variants = {
    closed: { y: 20, opacity: 0, scale: 0.95 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4 + (i * 0.05),
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number]
      }
    })
  };

  const imageVariants: Variants = {
    closed: { opacity: 0, scale: 0.95 },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        initial="hidden" // Initial load hides it above screen, then animates in
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        // Removed transition-all duration-500 here since Framer Motion handles the y axis positioning
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${getThemeClasses()}`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2 md:px-12 md:py-2 max-w-[1920px] mx-auto w-full">

          {/* Left: Menu Toggle */}
          <div className="flex justify-start z-50">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2 md:gap-3 group cursor-pointer outline-none"
            >
              <div className="flex flex-col gap-1.5 p-2 relative w-8 h-8 justify-center items-center">
                <span
                  className={`absolute h-[2px] bg-current transition-all duration-300 ease-in-out ${navbarMode === 'menu'
                    ? 'w-6 rotate-45 group-hover:text-brand'
                    : 'w-6 -translate-y-1 group-hover:translate-x-1 group-hover:bg-cream'
                    }`}
                />
                <span
                  className={`absolute h-[2px] bg-current transition-all duration-300 ease-in-out ${navbarMode === 'menu'
                    ? 'w-6 -rotate-45 group-hover:text-brand'
                    : 'w-4 translate-y-1 group-hover:w-6 group-hover:bg-cream'
                    }`}
                />
              </div>
              <span className="font-body text-sm md:text-base tracking-[0.2em] uppercase hidden sm:block transition-colors duration-300">
                {navbarMode === 'menu' ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>

          {/* Center: Elevated Logo */}
          <div className="flex justify-center items-center z-50 h-full">
            <Link to="/" onClick={closeMenu} className="flex items-center justify-center outline-none">
              <img
                src="/images/logo.png"
                alt="DMOR"
                className="h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300 hover:opacity-80 lg:scale-110"
              />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex justify-end z-50 gap-2 md:gap-4 items-center">
            {/* Get Estimate Button */}
            <button
              onClick={() => {
                closeMenu();
                openEstimation();
              }}
              className={`group items-center gap-3 md:gap-4 pl-4 md:pl-5 pr-1.5 py-1.5 rounded-full border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer outline-none hidden sm:inline-flex ${navbarMode === 'menu'
                  ? 'border-white/20 bg-transparent hover:bg-brand'
                  : 'border-navy/20 bg-[#E8E2D5] hover:bg-brand'
                }`}
            >
              <span className={`font-body text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${navbarMode === 'menu' ? 'text-cream group-hover:text-white' : 'text-navy group-hover:text-white'
                }`}>
                Get Estimate
              </span>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45 ${navbarMode === 'menu' ? 'bg-brand text-navy group-hover:bg-white' : 'bg-navy text-white'
                }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </button>

            {/* Inquire Button */}
            <button
              onClick={handleInquireClick}
              className={`group inline-flex items-center gap-3 md:gap-4 pl-4 md:pl-5 pr-1.5 py-1.5 rounded-full border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer outline-none ${navbarMode === 'menu'
                  ? 'border-white/20 bg-transparent hover:bg-brand'
                  : 'border-navy/20 bg-[#E8E2D5] hover:bg-brand'
                }`}
            >
              <span className={`font-body text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-colors duration-300 hidden sm:block ${navbarMode === 'menu' ? 'text-cream group-hover:text-white' : 'text-navy group-hover:text-white'
                }`}>
                Inquire
              </span>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45 ${navbarMode === 'menu' ? 'bg-brand text-navy group-hover:bg-white' : 'bg-navy text-white'
                }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </button>
          </div>

        </div>
      </motion.header>

      <AnimatePresence
        onExitComplete={() => {
          setNavbarMode('normal');
        }}
      >
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 w-full h-screen bg-navy z-40 flex flex-col justify-center items-center px-4 md:px-12 overflow-hidden"
          >
            {/* LEFT IMAGE */}
            <motion.img
              variants={imageVariants}
              initial="closed"
              animate="open"
              exit="closed"
              src="/images/backgrounds/placeholder-left.png"
              alt="Decorative left"
              className="absolute top-0 left-0 w-auto object-cover z-0 pointer-events-none origin-top-left h-[25vh] md:h-[35vh] lg:h-[65vh]"
            />

            {/* RIGHT IMAGE */}
            <motion.img
              variants={imageVariants}
              initial="closed"
              animate="open"
              exit="closed"
              src="/images/backgrounds/placeholder-right.png"
              alt="Decorative right"
              className="absolute right-0 w-auto object-cover z-0 pointer-events-none bottom-0 top-auto h-[25vh] origin-bottom-right md:h-[35vh] lg:top-0 lg:bottom-auto lg:h-[100vh] lg:origin-top-right"
            />

            {/* Navigation Grid (Compact 2-Column) */}
            <motion.nav
              className="relative z-10 w-full max-w-3xl mt-16 pointer-events-auto flex flex-col gap-10"
            >
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                {menuLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center justify-center py-4 group"
                  >
                    <span className="font-primary text-4xl md:text-5xl lg:text-6xl tracking-wide text-cream group-hover:text-brand transition-colors duration-300 relative z-10">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Contact Information */}
              <motion.div
                variants={linkVariants}
                custom={menuLinks.length}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-center justify-center gap-3 pt-6 text-cream font-body text-sm md:text-base tracking-widest uppercase border-t border-cream/10"
              >
                <a href="mailto:support@dmorinteriors.com" className="hover:text-brand transition-colors duration-300">
                  support@dmorinteriors.com
                </a>
                <a href="tel:+918977066990" className="hover:text-brand transition-colors duration-300">
                  +91 89770 66990
                </a>
              </motion.div>
            </motion.nav>

            {/* Bottom Footer Details */}
            <motion.div
              variants={linkVariants}
              custom={menuLinks.length + 1}
              initial="closed"
              animate="open"
              exit="closed"
              className="z-10 absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-cream font-body text-xs md:text-sm tracking-widest uppercase gap-4"
            >
              <span className="opacity-50">Dmor Interiors © 2026</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-brand transition-colors">Instagram</a>
                <a href="#" className="hover:text-brand transition-colors">Youtube</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;