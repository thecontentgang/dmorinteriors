import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedRevealButton from "../../components/buttons/AnimatedRevealButton";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Track if the intro has played during this session/reload


const HeroSection: React.FC = () => {
  const compRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ================================================================
      // 1. INITIAL ENTRANCE ANIMATION (DMOR Fade -> Content Reveal)
      // ================================================================
      const tl = gsap.timeline();

      tl.to(".intro-text", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .to(".intro-text", { opacity: 0, y: -20, duration: 0.8, delay: 0.6, ease: "power3.in" })
        .to(".intro-overlay", {
          opacity: 0, duration: 1.2, ease: "power2.inOut",
          onComplete: () => gsap.set(".intro-overlay", { display: "none" })
        })
        .fromTo(".hero-video", { scale: 1.15 }, { scale: 1, duration: 3, ease: "power3.out" }, "-=1")
        .fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=2.2")
        .fromTo(".hero-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=1.6")
        .fromTo(".hero-stat", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" }, "-=0.6");

      // ================================================================
      // 2. SCROLL ANIMATION (Tablet, Laptop, Desktop only)
      // ================================================================
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(".hero-video", {
          scale: 1.25, ease: "none",
          scrollTrigger: { trigger: compRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} className="relative w-full h-screen bg-navy flex flex-col items-center justify-center overflow-hidden">

      {/* Intro Overlay */}
      <div className="intro-overlay absolute inset-0 z-50 bg-navy flex items-center justify-center">
        <h2 className="intro-text font-primary text-cream tracking-[0.3em] uppercase text-4xl md:text-6xl opacity-0 translate-y-8">
          DMOR
        </h2>
      </div>

      {/* Video Background */}
      <video autoPlay muted loop playsInline preload="auto" className="hero-video absolute inset-0 w-full h-full object-cover z-0">
        <source src="/videos/dmor-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/40 md:bg-navy/30 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 text-center w-full">
        <h1 className="hero-title opacity-0 font-primary text-cream leading-[1.1] tracking-tight text-5xl md:text-7xl lg:text-[7.5rem] max-w-5xl mx-auto drop-shadow-lg">
          Elevating the <span className="text-brand font-accent italic px-2">art</span> of living.
        </h1>

        {/* ================================================================
            ORIGINKIT BUTTONS (Matching Original Styling Precisely)
            ================================================================ */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 md:mt-16">

          <AnimatedRevealButton
            className="hero-btn opacity-0 backdrop-blur-sm rounded-full shadow-lg"
            to="/projects"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            label="EXPLORE"
            gap={12} // Matches gap-3
            padding="6px 6px 6px 20px" // Exactly matches py-1.5, pr-1.5, pl-5
            font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
            colors={{
              fill: "rgba(255, 255, 255, 0.1)", // Matches bg-white/10
              textColor: "#FFFFFF",
              hoverTextColor: "#2F4156"
            }}
            border={{ borderColor: "rgba(255, 255, 255, 0.2)", borderWidth: 1 }} // Matches border-white/20
            icon={{
              type: "icon",
              icon: "arrow-diagonal",
              background: "#FFFFFF", // White expanding circle
              color: "#2F4156",      // Navy arrow
              badgeSize: 40,         // Exactly matches w-10 h-10
              size: 14,              // Exactly matches your 14px svg icon
              padding: 0
            }}
          />

          <AnimatedRevealButton
            className="hero-btn opacity-0 backdrop-blur-sm rounded-full shadow-lg"
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            label="CONTACT"
            gap={12}
            padding="6px 6px 6px 20px"
            font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
            colors={{
              fill: "rgba(255, 255, 255, 0.1)",
              textColor: "#FFFFFF",
              hoverTextColor: "#2F4156"
            }}
            border={{ borderColor: "rgba(255, 255, 255, 0.2)", borderWidth: 1 }}
            icon={{
              type: "icon",
              icon: "arrow-diagonal",
              background: "#FFFFFF",
              color: "#2F4156",
              badgeSize: 40,
              size: 14,
              padding: 0
            }}
          />

        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-16 z-20 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-end gap-8 md:gap-0">
        <div className="hero-stat opacity-0 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-primary text-2xl md:text-3xl lg:text-4xl text-brand leading-none mb-1">15+</span>
          <span className="font-body text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/60 font-medium">Years of Excellence</span>
        </div>
        <div className="hero-stat opacity-0 flex flex-col items-center text-center">
          <span className="font-primary text-2xl md:text-3xl lg:text-4xl text-brand leading-none mb-1">200+</span>
          <span className="font-body text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/60 font-medium">Curated Spaces</span>
        </div>
        <div className="hero-stat opacity-0 flex flex-col items-center md:items-end text-center md:text-right">
          <span className="font-primary text-2xl md:text-3xl lg:text-4xl text-brand leading-none mb-1">12+</span>
          <span className="font-body text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/60 font-medium">Designers</span>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
