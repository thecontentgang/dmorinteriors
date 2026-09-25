import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Array ref to store all individual character spans
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // The text to display in the horizontal scroll
  const contentText = "We design more than interiors. We craft environments of enduring quality.";

  // A collection of images to fill the top and bottom space
  const floatingImages = [
    { src: "/images/projects/akruthi/akruthi-9.jpg", top: "5%", left: "110vw", width: "w-[40vw] md:w-[22vw]", aspect: "aspect-[3/4]" },
    { src: "/images/projects/nyla/nyla-4.jpg", bottom: "5%", left: "150vw", width: "w-[45vw] md:w-[28vw]", aspect: "aspect-[16/9]" },
    { src: "/images/projects/nyla/nyla-10.jpg", top: "12%", left: "210vw", width: "w-[35vw] md:w-[20vw]", aspect: "aspect-square" },
    { src: "/images/projects/risiniaedge/risinia-edge-7.jpg", bottom: "8%", left: "270vw", width: "w-[38vw] md:w-[24vw]", aspect: "aspect-[4/3]" },
    { src: "/images/projects/risiniaedge/risinia-edge-19.jpg", top: "8%", left: "330vw", width: "w-[40vw] md:w-[22vw]", aspect: "aspect-[3/4]" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return scrollContainerRef.current ? scrollContainerRef.current.scrollWidth - window.innerWidth : 0;
      };

      // 1. The main horizontal scrolling tween targeting the entire container (text + images)
      const scrollTween = gsap.to(scrollContainerRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2. Animate each character as it enters the viewport horizontally
      charsRef.current.forEach((char) => {
        if (char) {
          gsap.from(char, {
            yPercent: "random(-200, 200)",
            rotation: "random(-20, 20)",
            opacity: 0,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 95%",
              end: "left 40%",
              scrub: 1,
            },
          });
        }
      });

      // 3. Add stunning parallax to the floating background images
      // Fixed TS Error: Cast to HTMLElement[] instead of using 'any'
      const imageContainers = gsap.utils.toArray(".parallax-img-container") as HTMLElement[];

      imageContainers.forEach((container) => {
        const img = container.querySelector("img");

        if (img) {
          // Subtle image zoom and shift tied to the horizontal scroll
          gsap.fromTo(img,
            { scale: 1.25, xPercent: -15, rotation: -2 },
            {
              scale: 1,
              xPercent: 15,
              rotation: 2,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              }
            }
          );
        }
      });

    }, wrapperRef);

    return () => ctx.revert(); // Cleanup GSAP and ScrollTrigger instances on unmount
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative z-0 w-full h-screen bg-cream overflow-hidden flex items-center"
    >
      {/* 
        This is the container that actually moves horizontally. 
        It holds both the text in the middle and the absolute images above and below.
      */}
      <div
        ref={scrollContainerRef}
        className="relative h-full flex items-center w-max pl-[100vw] pr-[30vw]"
      >

        {/* ================================================================
            FLOATING BACKGROUND IMAGES
            ================================================================ */}
        {floatingImages.map((img, index) => (
          <div
            key={index}
            // Removed rounded-2xl and shadow-2xl for flat, sharp floating blocks
            className={`parallax-img-container absolute overflow-hidden ${img.width} ${img.aspect}`}
            style={{
              top: img.top,
              bottom: img.bottom,
              left: img.left,
            }}
          >
            <img
              src={img.src}
              alt="DMOR Interior"
              className="w-full h-full object-cover origin-center"
              loading="lazy"
              decoding="async"
            />
            {/* Elegant overlay to ensure text stays dominant if they overlap slightly */}
            <div className="absolute inset-0 bg-navy/10 mix-blend-multiply pointer-events-none" />
          </div>
        ))}

        {/* ================================================================
            SCROLLING TEXT
            ================================================================ */}
        <h3
          className="relative z-10 font-primary flex w-max whitespace-nowrap gap-[2vw] md:gap-[4vw] font-primary text-navy leading-[1.1] tracking-tight drop-shadow-md"
          style={{ fontSize: "clamp(3rem, 10vw, 12rem)" }}
        >
          {/* We split by words first to apply the gap, then by characters for the animation */}
          {contentText.split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className="flex">
              {word.split("").map((char, charIndex) => {
                const index = wordIndex * 100 + charIndex;
                return (
                  <span
                    key={charIndex}
                    ref={(el) => { charsRef.current[index] = el; }}
                    className="inline-block origin-center font-primary"
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </h3>

      </div>
    </section>
  );
};

export default AboutSection;