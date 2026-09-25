import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedRevealButton from "../../components/buttons/AnimatedRevealButton";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const featuredProjects = [
  {
    id: "01",
    title: "Dental 360",
    location: "Hyderabad, India",
    category: "Commercial Clinic",
    image: "/images/projects/dental360/dental-360-1.jpg",
  },
  {
    id: "02",
    title: "Risinia Edge",
    location: "Hyderabad, India",
    category: "Luxury Residential",
    image: "/images/projects/risiniaedge/risinia-edge-1.jpg",
  },
  {
    id: "03",
    title: "Nyla Project",
    location: "Hyderabad, India",
    category: "Bespoke Interior",
    image: "/images/projects/nyla/nyla-1.jpg",
  },
  {
    id: "04",
    title: "Akruthi Arcadia",
    location: "Hyderabad, India",
    category: "Modern Architecture",
    image: "/images/projects/akruthi/akruthi-2.jpg",
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────
const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get all sections and images
      const sections = gsap.utils.toArray(".project-section") as HTMLElement[];
      const images = gsap.utils.toArray(".project-image") as HTMLElement[];

      // Set the initial clipPath for all items EXCEPT the very last one (which stays at the bottom)
      gsap.set(sections.slice(0, -1), { clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" });
      gsap.set(images.slice(0, -1), { clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" });

      // Create the Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Scroll length scales with the number of projects
          end: () => `+=${window.innerHeight * (featuredProjects.length - 1)}`,
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
        },
      });

      // Loop through all items (except the last one) and animate their clipPath to 0% height
      sections.slice(0, -1).forEach((section, i) => {
        // We use the same label `wipe${i}` so the background and floating image wipe simultaneously
        tl.to(section, {
          clipPath: "polygon(0 0, 0 0%, 100% 0%, 100% 0)",
          ease: "none",
        }, `wipe${i}`);

        tl.to(images[i], {
          clipPath: "polygon(0 0, 0 0%, 100% 0%, 100% 0)",
          ease: "none",
        }, `wipe${i}`);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-cream">
      {/* ── Centered Section Header ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 md:pt-32 pb-16">
        <div className="flex flex-col items-center justify-center text-center gap-6">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-brand" />
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-navy/70">
              Selected Works
            </span>
            <span className="w-12 h-[1px] bg-brand" />
          </div>

          {/* Main Headline */}
          <h2 className="text-navy leading-none flex flex-col items-center">
            <span className="font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] block text-navy">
              Spaces We've
            </span>
            <span className="font-accent text-brand italic text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] block mt-1 md:mt-2">
              shaped.
            </span>
          </h2>

        </div>
      </div>

      {/* ── Parallax Wipe Container (Pins to screen) ── */}
      <div ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden text-navy">

        {/* Absolute Left Images Container */}
        <div className="absolute z-20 w-[75%] md:w-[35%] aspect-square left-1/2 -translate-x-1/2 top-[10%] md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-[10%] overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(47,65,86,0.15)]">
          {featuredProjects.map((project, index) => (
            <div
              key={`img-${project.id}`}
              className="project-image absolute inset-0"
              style={{ zIndex: featuredProjects.length - index }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full block object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Absolute Full-Screen Text Sections */}
        {featuredProjects.map((project, index) => {
          const slug = project.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <section
              key={`sec-${project.id}`}
              className="project-section absolute inset-0 flex max-w-full h-[100dvh] overflow-hidden"
              style={{ zIndex: featuredProjects.length - index }}
            >
              {/* Dynamic Light Blurred Background */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-cream">
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-full object-cover block blur-[40px] scale-125 opacity-20"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-cream/80" />
              </div>

              {/* Text Content (Right side on desktop, bottom on mobile) */}
              <div className="relative z-10 w-full md:w-1/2 md:ml-[50%] flex flex-col justify-end md:justify-center px-6 pb-20 md:pb-0 md:px-12 lg:px-24 h-full gap-8 md:gap-10">

                {/* Project Number */}
                <div className="flex items-center gap-4 text-brand font-body text-sm tracking-[0.2em]">
                  <span className="font-semibold">{project.id}</span>
                  <span className="w-12 h-[1px] bg-brand/50" />
                </div>

                {/* Project Title */}
                <h3 className="font-primary text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] text-navy">
                  {project.title}
                </h3>

                {/* Project Details */}
                <ul className="flex flex-col gap-4 font-body text-xs md:text-sm uppercase tracking-[0.15em] text-navy/70">
                  <li className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" /> {project.location}
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" /> {project.category}
                  </li>
                </ul>

                {/* CTA - Originkit Animated Reveal Button */}
                <div className="pt-6">
                  <AnimatedRevealButton
                    className="rounded-full shadow-sm hover:shadow-lg transition-shadow duration-300"
                    to={`/projects/${slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    label="VIEW PROJECT"
                    gap={12}
                    padding="6px 6px 6px 20px"
                    font={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    colors={{
                      fill: "transparent",
                      textColor: "#2F4156", // Navy Text
                      hoverTextColor: "#FFFFFF" // Turns White on Hover
                    }}
                    border={{ borderColor: "rgba(47, 65, 86, 0.2)", borderWidth: 1 }} // Light Navy Border
                    icon={{
                      type: "icon",
                      icon: "arrow-diagonal",
                      background: "#2F4156", // Navy expanding circle
                      color: "#FFFFFF",      // White arrow
                      badgeSize: 40,
                      size: 14,
                      padding: 0
                    }}
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
};

export default FeaturedProjects;