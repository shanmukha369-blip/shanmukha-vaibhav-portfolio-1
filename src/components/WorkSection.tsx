import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROJECTS, type ProjectItem } from '@/src/data/portfolio';

export function WorkSection() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [spotCoords, setSpotCoords] = useState<Record<string, { x: number; y: number }>>({});

  const selectedProject: ProjectItem | null =
    selectedIndex !== null ? PROJECTS[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % PROJECTS.length));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev - 1 + PROJECTS.length) % PROJECTS.length
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <section
      id="work"
      className="relative border-t border-white/10 bg-[#050505] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#DC1E2E]">
                02.
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
                Selected Work
              </h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
              Four flagship builds spanning assistive computer vision, planetary data exploration, institutional platforms, and gaming UI architecture.
            </p>
          </div>

          <p className="font-mono-tabular text-xs tracking-[0.16em] text-zinc-400 uppercase">
            04 Case Studies · 2025 — 2026
          </p>
        </div>

        {/* Staggered Asymmetrical 2-Column Editorial Gallery */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-20">
          {PROJECTS.map((project, index) => {
            const isOffsetColumn = index % 2 === 1;
            const hasFailed = failedImages[project.id];
            const spot = spotCoords[project.id];

            return (
              <motion.article
                key={project.id}
                data-work-card={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.38,
                  delay: (index % 2) * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group flex flex-col ${isOffsetColumn ? 'lg:mt-16' : ''}`}
              >
                <button
                  type="button"
                  data-cursor="project"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    setSpotCoords((prev) => ({
                      ...prev,
                      [project.id]: { x, y },
                    }));
                    const rotY = ((x / rect.width) - 0.5) * 5;
                    const rotX = -((y / rect.height) - 0.5) * 5;
                    e.currentTarget.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
                  }}
                  onClick={() => setSelectedIndex(index)}
                  className="relative w-full text-left transition-transform duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC1E2E]"
                >
                  {/* Image Preview Frame with Curtain Reveal */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { clipPath: 'inset(10% 0% 0% 0%)', opacity: 0.5 }
                    }
                    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[#0B0B0C] transition-colors duration-300 group-hover:border-[#DC1E2E]/60"
                  >
                    {/* Futuristic Optical Corner Brackets */}
                    <span aria-hidden="true" className="pointer-events-none absolute top-2 left-2 z-20 h-3 w-3 border-t border-l border-[#DC1E2E] opacity-0 transition-all duration-200 group-hover:top-3 group-hover:left-3 group-hover:opacity-100" />
                    <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 z-20 h-3 w-3 border-t border-r border-[#DC1E2E] opacity-0 transition-all duration-200 group-hover:top-3 group-hover:right-3 group-hover:opacity-100" />
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 z-20 h-3 w-3 border-b border-l border-[#DC1E2E] opacity-0 transition-all duration-200 group-hover:bottom-3 group-hover:left-3 group-hover:opacity-100" />
                    <span aria-hidden="true" className="pointer-events-none absolute right-2 bottom-2 z-20 h-3 w-3 border-r border-b border-[#DC1E2E] opacity-0 transition-all duration-200 group-hover:right-3 group-hover:bottom-3 group-hover:opacity-100" />
                    {!hasFailed ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#141417] via-[#0B0B0C] to-[#1f070a] p-8 text-center">
                        <span className="font-mono-tabular text-sm tracking-[0.2em] text-[#DC1E2E]">
                          {project.number}
                        </span>
                        <p className="mt-2 font-display text-3xl font-bold text-white uppercase">
                          {project.title}
                        </p>
                      </div>
                    )}

                    {/* Mouse-Tracking Crimson Spotlight */}
                    {spot && (
                      <div
                        aria-hidden="true"
                        style={{
                          background: `radial-gradient(380px circle at ${spot.x}px ${spot.y}px, rgba(220, 30, 46, 0.22), transparent 65%)`,
                        }}
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}

                    {/* Subtle Dark Scrim + Number Index */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
                    />

                    <div className="absolute top-4 left-4 flex items-center gap-3">
                      <span className="font-mono-tabular border border-white/15 bg-[#050505]/85 px-2.5 py-1 text-xs font-medium tracking-[0.14em] text-white">
                        {project.number}
                      </span>
                    </div>

                    <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center border border-white/25 bg-[#050505]/85 text-white transition-all duration-200 group-hover:border-[#DC1E2E] group-hover:bg-[#DC1E2E]">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.div>

                  {/* Metadata & Editorial Title */}
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{project.year}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-white uppercase transition-colors duration-150 group-hover:text-[#DC1E2E] sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>

                    <span className="hidden text-xs font-medium tracking-[0.14em] text-zinc-400 uppercase transition-colors group-hover:text-white sm:inline-block shrink-0">
                      Case Study
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                    {project.summary}
                  </p>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Case-Study Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-white/15 bg-[#0B0B0C]"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0B0B0C]/95 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="font-mono-tabular font-medium text-[#DC1E2E]">
                    {selectedProject.number}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{selectedProject.year}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close project details"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-zinc-300 transition-colors hover:border-[#DC1E2E] hover:bg-[#DC1E2E] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Media Preview */}
                <div className="border-b border-white/10 bg-[#050505] lg:col-span-7 lg:border-r lg:border-b-0">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.imageAlt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Case Study Details */}
                <div className="flex flex-col justify-between p-6 md:p-8 lg:col-span-5">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs tracking-[0.14em] text-zinc-400 uppercase">
                        {selectedProject.role}
                      </p>
                      <h3
                        id="project-modal-title"
                        className="mt-2 font-display text-4xl font-bold tracking-tight text-white uppercase"
                      >
                        {selectedProject.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-zinc-300">
                      {selectedProject.description}
                    </p>

                    <div className="border-t border-white/10 pt-5">
                      <p className="text-xs font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                        Engineering Highlights
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm text-zinc-300">
                        {selectedProject.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#DC1E2E]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-white/10 pt-5">
                      <p className="text-xs font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                        Technologies
                      </p>
                      <p className="mt-2 text-sm text-zinc-200">
                        {selectedProject.stack.join(' · ')}
                      </p>
                    </div>
                  </div>

                  {/* Next / Prev Case Study Controls */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex - 1 + PROJECTS.length) % PROJECTS.length
                        )
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-zinc-300 uppercase transition-colors hover:text-[#DC1E2E]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex((selectedIndex + 1) % PROJECTS.length)
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-zinc-300 uppercase transition-colors hover:text-[#DC1E2E]"
                    >
                      <span>Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
