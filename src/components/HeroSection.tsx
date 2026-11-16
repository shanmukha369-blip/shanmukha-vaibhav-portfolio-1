import { useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { PROFILE } from '@/src/data/portfolio';

interface HeroSectionProps {
  onReplayTour: () => void;
}

export function HeroSection({ onReplayTour }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const baseUrl = import.meta.env.BASE_URL;
  const primaryPortrait = `${baseUrl}assets/portrait-cutout.png`;
  const fallbackPortrait = `${baseUrl}assets/aistudio/ing_9d9ebe66.jpeg`;
  const [portraitSrc, setPortraitSrc] = useState(primaryPortrait);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backdropTextY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 95]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 42]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.04]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-10 md:pt-28 md:pb-12"
    >
      {/* Subtle Breathing Radial Crimson Studio Backlight */}
      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,30,46,0.24)_0%,rgba(220,30,46,0.05)_50%,transparent_72%)] blur-2xl md:h-[780px] md:w-[780px]"
      />

      {/* Top Editorial Frame: Greeting & Professional Title */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-6 px-6 md:flex-row md:items-end md:px-10">
        <div className="space-y-1.5">
          <p
            data-tour="label"
            className="tour-typeme font-mono-tabular text-xs font-medium tracking-[0.22em] text-zinc-400 uppercase"
          >
            {PROFILE.greeting}
          </p>
          <h1
            data-tour="h1"
            className="tour-typeme font-display text-2xl font-bold tracking-[0.06em] text-white uppercase sm:text-3xl"
          >
            {PROFILE.fullName}
          </h1>
        </div>

        <div className="md:text-right">
          <p
            data-tour="role"
            className="tour-typeme text-xs font-semibold tracking-[0.18em] text-[#F5F5F7] uppercase sm:text-sm"
          >
            {PROFILE.title}
          </p>
          <p
            data-tour="edu"
            className="tour-typeme mt-1 text-xs tracking-[0.14em] text-zinc-400 uppercase"
          >
            {PROFILE.education} · {PROFILE.institution}
          </p>
        </div>
      </div>

      {/* Center Stage: Futuristic Orbital HUD Rings + Oversized Red Typography + Cutout Portrait */}
      <div className="relative my-auto flex w-full flex-1 flex-col items-center justify-center py-6 md:py-0">
        {/* Futuristic Concentric Geometric Orbital Rings Behind Portrait */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-[5] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 opacity-50 sm:h-[480px] sm:w-[480px] lg:h-[620px] lg:w-[620px]"
        >
          <svg viewBox="0 0 400 400" className="animate-orbit-cw h-full w-full">
            <circle
              cx="200"
              cy="200"
              r="188"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="18 12 4 12"
            />
            <circle
              cx="200"
              cy="200"
              r="166"
              fill="none"
              stroke="rgba(220,30,46,0.34)"
              strokeWidth="1.2"
              strokeDasharray="60 190"
              strokeLinecap="round"
            />
          </svg>
          <svg
            viewBox="0 0 400 400"
            className="animate-orbit-ccw absolute inset-0 h-full w-full"
          >
            <circle
              cx="200"
              cy="200"
              r="142"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="3 9"
            />
            <circle
              cx="200"
              cy="200"
              r="194"
              fill="none"
              stroke="rgba(220,30,46,0.22)"
              strokeWidth="1"
              strokeDasharray="24 220"
            />
          </svg>
        </div>

        {/* Oversized Bold Red Name Layer with Masked Reveal */}
        <motion.div
          style={{ y: backdropTextY }}
          aria-hidden="true"
          className="pointer-events-none relative z-10 flex w-full max-w-[1440px] flex-col items-center justify-center px-2 select-none"
        >
          <div className="w-full overflow-hidden">
            <motion.span
              initial={shouldReduceMotion ? false : { y: '105%', opacity: 0.2 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-display block w-full text-center text-[20vw] leading-[0.82] font-extrabold tracking-[-0.02em] text-[#DC1E2E] uppercase sm:text-[18vw] lg:text-[14.5vw] xl:text-[13.5rem]"
            >
              {PROFILE.displayFirst}
            </motion.span>
          </div>
          <div className="w-full overflow-hidden">
            <motion.span
              initial={shouldReduceMotion ? false : { y: '105%', opacity: 0.2 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display block w-full text-center text-[20vw] leading-[0.82] font-extrabold tracking-[-0.02em] text-[#DC1E2E] uppercase sm:text-[18vw] lg:text-[14.5vw] xl:text-[13.5rem]"
            >
              {PROFILE.displaySecond}
            </motion.span>
          </div>
        </motion.div>

        {/* Centered Real Cutout Portrait Layered Over Typography + Biometric Laser Scan */}
        <motion.div
          data-tour="photo"
          style={{ y: portraitY, scale: portraitScale }}
          className="tour-ia tour-photo-sim pointer-events-none relative z-20 -mt-16 flex justify-center transition-all duration-500 md:absolute md:inset-x-0 md:bottom-[-3.5rem] md:mt-0"
        >
          <div className="relative overflow-hidden">
            <img
              src={portraitSrc}
              alt="Portrait of Shanmukha Vaibhav Tatipaka in formal black blazer and white shirt"
              referrerPolicy="no-referrer"
              onError={() => {
                if (portraitSrc !== fallbackPortrait) {
                  setPortraitSrc(fallbackPortrait);
                }
              }}
              className="portrait-fade-mask h-[40vh] w-auto max-w-[88vw] object-contain object-bottom contrast-105 drop-shadow-[0_24px_48px_rgba(0,0,0,0.85)] sm:h-[52vh] md:h-[64vh] lg:h-[70vh]"
            />
            {/* Subtle Crimson Laser Scan Beam */}
            <div
              aria-hidden="true"
              className="animate-laser-scan pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#DC1E2E] to-transparent shadow-[0_0_16px_rgba(220,30,46,0.9)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Asymmetric Anchor: Intro + Explore My Work CTA + Replay Tour */}
      <div className="relative z-30 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-end gap-6 border-t border-white/10 px-6 pt-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p
            data-tour="intro"
            className="tour-typeme max-w-md text-sm leading-relaxed text-zinc-300 sm:text-[15px]"
          >
            {PROFILE.intro}
          </p>
        </div>

        <div
          data-tour="btns"
          className="tour-ia flex flex-wrap items-center gap-3 sm:gap-4 md:col-span-7 md:justify-end"
        >
          <button
            type="button"
            onClick={onReplayTour}
            className="group inline-flex items-center gap-2 border border-white/15 bg-[#0B0B0C]/80 px-4 py-3.5 text-xs font-medium tracking-[0.14em] text-zinc-300 uppercase whitespace-nowrap shrink-0 transition-all duration-150 hover:border-[#DC1E2E] hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-90" />
            <span>Replay Tour</span>
          </button>

          <button
            type="button"
            onClick={scrollToWork}
            className="group inline-flex items-center gap-3 bg-[#DC1E2E] px-6 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#b91624] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Explore My Work</span>
            <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="tour-cta group inline-flex items-center gap-2 border border-white/20 bg-[#0B0B0C]/80 px-5 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase whitespace-nowrap shrink-0 transition-all duration-150 hover:border-[#DC1E2E] hover:text-[#DC1E2E]"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
