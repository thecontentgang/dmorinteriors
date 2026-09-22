import React from "react";
import { Link } from "react-router-dom";

// ─── Content Data ────────────────────────────────────────────────────────────
const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-white text-navy overflow-hidden pt-12 md:pt-16 lg:pt-20 flex flex-col">
      
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-20 flex flex-col flex-grow z-10">
        
        {/* ─── Uniform 4-Column Layout ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 w-full">
          
          {/* Column 1: Logo */}
          <div className="flex flex-col">
            <img 
              src="/images/logo.png" 
              alt="DMOR Interiors" 
              className="h-12 sm:h-14 lg:h-32 w-auto object-cover self-center" 
            />
          </div>

          {/* Column 2: Company Links */}
          <div className="flex flex-col">
            <span className="font-body text-xs md:text-sm text-navy/40 mb-3 md:mb-4">Company</span>
            <nav className="flex flex-col gap-2">
              {pages.map((page) => (
                <Link
                  key={page.label}
                  to={page.href}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="font-body text-base md:text-lg font-medium text-navy hover:text-brand transition-colors duration-300 w-fit"
                >
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Support & Social */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span className="font-body text-xs md:text-sm text-navy/40 mb-3 md:mb-4">Support</span>
              <a 
                href="mailto:hello@dmorinteriors.com" 
                className="font-body text-base md:text-lg font-medium text-navy hover:text-brand transition-colors duration-300 break-all w-fit"
              >
                hello@dmorinteriors.com
              </a>
            </div>
            
            <div className="flex flex-col">
              <span className="font-body text-xs md:text-sm text-navy/40 mb-3 md:mb-4">Social</span>
              <p className="font-body text-base md:text-lg font-medium text-navy flex flex-wrap gap-x-1.5">
                {socials.map((social, index) => (
                  <React.Fragment key={social.label}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-brand transition-colors duration-300"
                    >
                      {social.label}
                    </a>
                    {index < socials.length - 1 && <span className="text-navy">,</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>

          {/* Column 4: Head Quarter */}
          <div className="flex flex-col">
            <span className="font-body text-xs md:text-sm text-navy/40 mb-3 md:mb-4">Head Quarter</span>
            <p className="font-body text-base md:text-lg font-medium text-navy leading-relaxed">
              Jubilee Hills, Hyderabad <br />
              Telangana, India
            </p>
          </div>

        </div>

        {/* ─── Copyright (Full Width Alignment) ─── */}
        <div className="w-full mt-12 md:mt-16 mb-4 md:mb-8">
          <p className="font-body text-xs md:text-sm text-navy/50">
            © {currentYear} DMOR Interiors. All rights reserved. Designed by thecontentgang.
          </p>
        </div>

      </div>

      {/* ─── Massive Bottom Typography (Cut in Half) ─── */}
      <div className="w-full flex justify-center mt-auto pointer-events-none select-none z-0">
        <h1 className="font-primary text-[35vw] md:text-[28vw] leading-[0.6] text-navy whitespace-nowrap tracking-tighter translate-y-[45%] md:translate-y-[40%] opacity-90">
          DMOR
        </h1>
      </div>

    </footer>
  );
}