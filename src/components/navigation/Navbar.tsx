import AnimatedRevealButton from '../buttons/AnimatedRevealButton';
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

const Navbar: React.FC<NavbarProps> = ({ theme = 'transparent' }) => {
  const navigate = useNavigate();
  const { openEstimation } = useEstimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarMode, setNavbarMode] = useState<'normal' | 'menu'>('normal');

  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine if we are at the top of the page
    if (latest < 50) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }

    // Hide navbar if scrolling down and past 100px. Show if scrolling up.
    const previous = scrollY.getPrevious() ?? 0;
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
    navigate(href);
  };

  const handleInquireClick = () => {
    closeMenu();
    navigate('/contact');
  };

  const getThemeClasses = () => {
    // 1. Menu overlay open
    if (navbarMode === 'menu') {
      return 'bg-transparent border-transparent text-cream';
    }
    // 2. Starting position (Top of page) - strictly transparent
    if (isAtTop) {
      return 'bg-transparent text-white pt-2'; // Changed from text-navy to text-white for visibility on dark backgrounds
    }
    // 3. Scrolled state - apply theme
    if (theme === 'dark') {
      return 'bg-navy text-cream rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-sm';
    }
    if (theme === 'light') {
      return 'bg-brand text-navy rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-sm';
    }
    // Default scrolled fallback
    return 'bg-transparent text-navy';
  };

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
        initial="hidden"
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${getThemeClasses()}`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2 md:px-12 md:py-2 max-w-[1920px] mx-auto w-full">
          
          {/* Left: Menu Toggle */}
          <div className="flex justify-start z-50">
            <button
              onClick={handleMenuToggle}
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
              className="flex items-center gap-2 md:gap-3 group cursor-pointer outline-none"
            >
              <div className="flex flex-col gap-1.5 p-2 relative w-8 h-8 justify-center items-center">
                <span
                  className={`absolute h-[2px] bg-current transition-all duration-300 ease-in-out ${navbarMode === 'menu'
                    ? 'w-6 rotate-45 group-hover:text-brand'
                    : 'w-6 -translate-y-1 group-hover:translate-x-1 group-hover:bg-brand'
                    }`}
                />
                <span
                  className={`absolute h-[2px] bg-current transition-all duration-300 ease-in-out ${navbarMode === 'menu'
                    ? 'w-6 -rotate-45 group-hover:text-brand'
                    : 'w-4 translate-y-1 group-hover:w-6 group-hover:bg-brand'
                    }`}
                />
              </div>
              <span className="font-body text-xs md:text-sm tracking-[0.2em] uppercase hidden sm:block transition-colors duration-300">
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
                className="h-10 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300 hover:opacity-80 lg:scale-110"
              />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex justify-end z-50 gap-2 md:gap-4 items-center">
            <AnimatedRevealButton
              className="hidden sm:inline-flex shadow-sm hover:shadow-md"
              onClick={() => {
                closeMenu();
                openEstimation();
              }}
              label="ESTIMATE"
              gap={8}
              padding="4px 4px 4px 16px"
              font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}
              colors={
                navbarMode === 'menu' 
                  ? { fill: "transparent", textColor: "#E8E2D5", hoverTextColor: "#2F4156" }
                  : { fill: "#E8E2D5", textColor: "#2F4156", hoverTextColor: "#FFFFFF" }
              }
              border={{ 
                borderColor: navbarMode === 'menu' ? "rgba(255, 255, 255, 0.2)" : "rgba(47, 65, 86, 0.2)", 
                borderWidth: 1 
              }} 
              icon={{
                type: "icon",
                icon: "arrow-diagonal",
                background: navbarMode === 'menu' ? "#C6A87C" : "#2F4156", 
                color: navbarMode === 'menu' ? "#2F4156" : "#FFFFFF",      
                badgeSize: 32,
                size: 12,
                padding: 0
              }}
            />

            <AnimatedRevealButton
              className="shadow-sm hover:shadow-md"
              onClick={handleInquireClick}
              label="INQUIRE"
              gap={8}
              padding="4px 4px 4px 16px"
              font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}
              colors={
                navbarMode === 'menu' 
                  ? { fill: "transparent", textColor: "#E8E2D5", hoverTextColor: "#2F4156" }
                  : { fill: "#E8E2D5", textColor: "#2F4156", hoverTextColor: "#FFFFFF" }
              }
              border={{ 
                borderColor: navbarMode === 'menu' ? "rgba(255, 255, 255, 0.2)" : "rgba(47, 65, 86, 0.2)", 
                borderWidth: 1 
              }} 
              icon={{
                type: "icon",
                icon: "arrow-diagonal",
                background: navbarMode === 'menu' ? "#C6A87C" : "#2F4156", 
                color: navbarMode === 'menu' ? "#2F4156" : "#FFFFFF",      
                badgeSize: 32,
                size: 12,
                padding: 0
              }}
            />
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
            <motion.img
              variants={imageVariants}
              initial="closed"
              animate="open"
              exit="closed"
              src="/images/backgrounds/placeholder-left.png"
              alt="Decorative left"
              className="absolute top-0 left-0 w-auto object-cover z-0 pointer-events-none origin-top-left h-[25vh] md:h-[35vh] lg:h-[65vh]"
            />

            <motion.img
              variants={imageVariants}
              initial="closed"
              animate="open"
              exit="closed"
              src="/images/backgrounds/placeholder-right.png"
              alt="Decorative right"
              className="absolute right-0 w-auto object-cover z-0 pointer-events-none bottom-0 top-auto h-[25vh] origin-bottom-right md:h-[35vh] lg:top-0 lg:bottom-auto lg:h-[100vh] lg:origin-top-right"
            />

            <motion.nav className="relative z-10 w-full max-w-3xl mt-12 md:mt-16 pointer-events-auto flex flex-col gap-6 md:gap-10">
              <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4">
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
                    className="flex items-center justify-center py-2 md:py-4 group"
                  >
                    <span className="font-primary text-3xl md:text-5xl lg:text-6xl tracking-wide text-white group-hover:text-brand transition-colors duration-300 relative z-10">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              <motion.div
                variants={linkVariants}
                custom={menuLinks.length}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-center justify-center gap-2 pt-4 md:pt-6 text-white font-body text-xs md:text-sm tracking-widest uppercase border-t border-cream/10"
              >
                <a href="mailto:dmorinterior17@gmail.com" className="hover:text-brand transition-colors duration-300">
                  dmorinterior17@gmail.com
                </a>
                <div className="flex gap-4">
                  <a href="tel:+918977066990" className="hover:text-brand transition-colors duration-300">
                    +91 89770 66990
                  </a>
                  <span className="text-white/20">|</span>
                  <a href="tel:+918790246990" className="hover:text-brand transition-colors duration-300">
                    +91 87902 46990
                  </a>
                </div>
              </motion.div>
            </motion.nav>

            <motion.div
              variants={linkVariants}
              custom={menuLinks.length + 1}
              initial="closed"
              animate="open"
              exit="closed"
              className="z-10 absolute bottom-6 md:bottom-12 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-cream font-body text-[10px] md:text-xs tracking-widest uppercase gap-3 md:gap-4"
            >
              <span className="opacity-50">Dmor Interiors © 2026</span>
              <div className="flex gap-4 md:gap-6">
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
