import React from "react";
import { Link } from "react-router-dom";

// ─── Content Data ────────────────────────────────────────────────────────────
const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Designs", href: "/designs" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

const secondaryLinks = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "PINTEREST", href: "https://pinterest.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
  { label: "DMORINTERIORSTUDIO@GMAIL.COM", href: "mailto:dmorinteriorstudio@gmail.com" },
  { label: "+91 89770 66990", href: "tel:+918977066990" },
  { label: "+91 87902 46990", href: "tel:+918790246990" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-navy text-cream py-16 md:py-24 flex flex-col items-center justify-center px-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      
      {/* 1. Logo Section */}
      <div className="flex flex-col items-center justify-center gap-1 md:gap-2 mb-10 md:mb-14">
        <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand/80 ml-[0.4em]">
          Interior Studio
        </span>
        <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.25em] ml-[0.25em]">
          DMOR
        </h2>
      </div>

      {/* 2. Primary Links (with dots) */}
      <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 md:gap-x-5 mb-8 max-w-5xl mx-auto">
        {primaryLinks.map((link, index) => (
          <React.Fragment key={link.label}>
            <Link
              to={link.href}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-primary text-lg md:text-2xl text-cream/90 hover:text-brand transition-colors duration-300"
            >
              {link.label}
            </Link>
            {index < primaryLinks.length - 1 && (
              <span className="text-brand/40 text-sm md:text-lg hidden sm:inline-block select-none">•</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* 3. Secondary Links (small uppercase tracking wide) */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 md:gap-x-10 max-w-5xl mx-auto mb-16 px-4">
        {secondaryLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/50 hover:text-brand transition-colors duration-300 text-center"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* 4. Copyright */}
      <div className="text-center font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/30">
        © {currentYear} DMOR INTERIORS. ALL RIGHTS RESERVED. DESIGNED BY THECONTENTGANG.
      </div>

    </footer>
  );
}