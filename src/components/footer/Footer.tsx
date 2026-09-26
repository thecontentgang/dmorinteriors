import React from "react";
import { Link } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────
interface IconProps {
  className?: string;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const LinkedinIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// ─── Content Data ────────────────────────────────────────────────────────────
const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Designs", href: "/designs" },

  { label: "Contact", href: "/contact" },
];

const secondaryLinks = [
  { 
    label: "INSTAGRAM", 
    href: "https://www.instagram.com/YOUR_INSTAGRAM_HANDLE", 
    icon: InstagramIcon 
  }, 
  { 
    label: "YOUTUBE", 
    href: "https://www.youtube.com/", 
    icon: YoutubeIcon 
  },
  { 
    label: "LINKEDIN", 
    href: "https://www.linkedin.com/", 
    icon: LinkedinIcon 
  },
  { 
    label: "DMORINTERIOR17@GMAIL.COM", 
    href: "mailto:dmorinterior17@gmail.com", 
    icon: MailIcon 
  },
  { 
    label: "+91 89770 66990", 
    href: "tel:+918977066990", 
    icon: PhoneIcon 
  },
  { 
    label: "+91 87902 46990", 
    href: "tel:+918790246990", 
    icon: PhoneIcon 
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-navy text-cream py-16 md:py-24 flex flex-col items-center justify-center px-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      
      {/* 1. Logo Section */}
      <div className="flex flex-col items-center justify-center gap-1 md:gap-2 mb-10 md:mb-14">
        <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.25em] ml-[0.25em]">
          D'MOR
        </h2>
        <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand/80 ml-[0.4em]">
          Interior Studio
        </span>
        
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

      {/* 3. Secondary Links (Icons + Text) */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 md:gap-x-10 max-w-5xl mx-auto mb-16 px-4">
        {secondaryLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/50 hover:text-brand transition-colors duration-300 text-center group"
            >
              <Icon className="text-base md:text-lg group-hover:text-brand transition-colors duration-300" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>

      {/* 4. Copyright */}
      <div className="text-center font-body text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-cream/30">
        © {currentYear} DMOR INTERIORS. ALL RIGHTS RESERVED. DESIGNED BY THECONTENTGANG.
      </div>

    </footer>
  );
}