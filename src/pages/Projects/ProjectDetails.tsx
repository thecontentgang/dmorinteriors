import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/layout/PageTransition';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { projects } from '../../data/projects';

// ─── Shared easing ───────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  startIndex: number;
  projectTitle: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, projectTitle, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const touchStartX = useRef<number>(0);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + images.length) % images.length);
    },
    [images.length]
  );

  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.45, ease: EASE },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-[#0C0C0B]/96 flex flex-col"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); }
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A68A64]">
            {projectTitle}
          </span>
          <span className="w-4 h-[1px] bg-white/20" />
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">
            {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
        <button
          onClick={onClose}
          className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:border-white/30 transition-colors duration-300"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Image Stage */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center px-4 md:px-16">
        {/* Prev / Next Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 z-10 group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
          aria-label="Previous image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white transition-transform duration-300 group-hover:-translate-x-0.5">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative w-full h-full max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={images[current]}
                alt={`${projectTitle} — ${current + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          className="absolute right-4 md:right-8 z-10 group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
          aria-label="Next image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="shrink-0 px-6 md:px-10 py-5 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`relative shrink-0 w-12 h-9 md:w-16 md:h-11 rounded-md overflow-hidden transition-all duration-300 ${
                i === current
                  ? 'ring-1 ring-[#A68A64] ring-offset-1 ring-offset-[#0C0C0B]'
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Gallery Card ─────────────────────────────────────────────────────────────
interface GalleryCardProps {
  img: string;
  title: string;
  index: number;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ img, title, index, onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.85, delay: (index % 2) * 0.08, ease: EASE }}
    onClick={onClick}
    className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A64] rounded-[1.5rem] md:rounded-[2rem]"
    aria-label={`Open ${title} — image ${index + 1}`}
  >
    {/* Rectangle card: 4:3 */}
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#1A1B1A]">
      {/* Image — fully covers */}
      <img
        src={img}
        alt={`${title} — ${index + 1}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
      />

      {/* Subtle vignette always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0B]/60 via-[#0C0C0B]/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

      {/* Project name — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex items-end justify-between">
        <span className="font-primary text-white text-lg md:text-xl leading-tight tracking-[-0.02em] translate-y-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          {title}
        </span>
        {/* Frame count */}
        <span className="font-body text-[10px] tracking-[0.25em] text-white/50">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Expand icon on hover */}
      <div className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 opacity-0 scale-90 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  </motion.button>
);

// ─── Component ───────────────────────────────────────────────────────────────
const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useDocumentTitle(
    project ? `${project.title} | DMOR Interiors` : 'Project Not Found | DMOR Interiors'
  );

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  if (!project) return <Navigate to="/404" replace />;

  const heroImage = project.images?.[0];
  const galleryImages = project.images?.slice(1) ?? [];

  // Lightbox cycles through gallery images only
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;

  const meta = [
    { label: 'Category', value: project.category },
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
  ].filter((item) => Boolean(item.value));

  return (
    <PageTransition>
      <main className="w-full bg-[#E5E2DC] overflow-x-hidden pb-24 md:pb-40">

        {/* ─── Hero: Full-bleed Cinematic ─── */}
        <section
          ref={heroRef}
          className="relative w-full h-[92svh] min-h-[560px] max-h-[960px] overflow-hidden bg-[#0C0C0B]"
        >
          {/* Parallax image */}
          {heroImage && (
            <motion.div
              style={{ y }}
              className="absolute inset-0 -top-[6%] h-[112%] w-full"
            >
              <img
                src={heroImage}
                alt={project.title}
                className="w-full h-full object-cover brightness-[0.72]"
              />
            </motion.div>
          )}

          {/* Gradient veil — heavier at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0B]/90 via-[#0C0C0B]/20 to-[#0C0C0B]/10 pointer-events-none" />

          {/* Top bar: back button + index */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 lg:px-14 pt-7 md:pt-9">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  className="text-white transition-transform duration-300 group-hover:-translate-x-0.5">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 group-hover:text-white/80 hidden sm:block">
                Portfolio
              </span>
            </Link>

            {/* Project index pill */}
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">
              {String(projects.findIndex((p) => p.slug === project.slug) + 1).padStart(2, '0')}
              &nbsp;/&nbsp;
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          {/* Bottom content: category + title + meta strip */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 lg:px-14 pb-10 md:pb-14">

            {/* Category eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-[1px] bg-[#A68A64]" />
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A68A64]">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease: EASE }}
              className="font-primary text-white text-[clamp(3rem,7vw,7.5rem)] leading-[0.92] tracking-[-0.03em] max-w-[14ch] mb-8 md:mb-10"
            >
              {project.title}
            </motion.h1>

            {/* Meta strip — horizontal rule + inline pairs */}
            {meta.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6"
              >
                {meta.map((item, i) => (
                  <React.Fragment key={item.label}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[#A68A64]">
                        {item.label}
                      </span>
                      <span className="font-primary text-white/80 text-base md:text-lg leading-none">
                        {item.value}
                      </span>
                    </div>
                    {i < meta.length - 1 && (
                      <span className="w-[1px] h-3 bg-white/15 hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ─── The Brief ─── */}
        <section className="max-w-[1300px] mx-auto px-6 lg:px-12 mt-24 md:mt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-[#1A1B1A]/10 pt-12 md:pt-16"
          >
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#A68A64]" />
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#A68A64]">
                  The Brief
                </span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="font-primary text-[clamp(1.25rem,2vw,1.85rem)] leading-[1.65] tracking-[-0.01em] text-[#1A1B1A]/80">
                {project.description}
              </p>
            </div>
          </motion.div>
        </section>

        {/* ─── Gallery: Full-cover cards in 2-column grid ─── */}
        {galleryImages.length > 0 && (
          <section className="max-w-[1300px] mx-auto px-6 lg:px-12 mt-24 md:mt-40">
            {/* Section header */}
            <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#A68A64]" />
                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#A68A64]">
                  Gallery
                </span>
              </div>
              <span className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#1A1B1A]/40">
                {String(galleryImages.length).padStart(2, '0')} Frames
              </span>
            </div>

            {/* 2-column grid — odd cards offset down */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-10">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={index % 2 === 1 ? 'md:mt-20 lg:mt-28' : ''}
                >
                  <GalleryCard
                    img={img}
                    title={project.title}
                    index={index}
                    onClick={() => openLightbox(index)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Next Project ─── */}
        {nextProject && (
          <section className="max-w-[1300px] mx-auto px-6 lg:px-12 mt-28 md:mt-40">
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group block border-t border-[#1A1B1A]/10 pt-10 md:pt-14"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#A68A64]">
                Next Project
              </span>
              <div className="flex items-end justify-between gap-6 mt-5">
                <h2 className="font-primary text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-[#1A1B1A] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {nextProject.title}
                </h2>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                  className="shrink-0 mb-1 text-[#A68A64] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </section>
        )}
      </main>

      {/* ─── Lightbox Portal ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            startIndex={lightboxIndex}
            projectTitle={project.title}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ProjectDetails;