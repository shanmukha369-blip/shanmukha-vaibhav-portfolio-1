import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '@/src/data/portfolio';

const PROFILE_SPECS = [
  { label: 'Program', value: 'B.Tech – CSE (AI & ML)' },
  { label: 'Institution', value: 'Joy University × NIAT' },
  { label: 'Core Focus', value: 'Artificial Intelligence & Web Systems' },
  { label: 'Academic Standing', value: 'First-Year Undergraduate' },
];

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative border-t border-white/10 bg-[#050505] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Section Label */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#DC1E2E]">
                01.
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
                About Me
              </h2>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Engineering intelligent software from foundational first principles to expressive user interfaces.
            </p>
          </motion.div>

          {/* Right Column: Editorial Biography */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.42, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 lg:col-span-8"
          >
            <p
              className="text-2xl leading-snug font-medium tracking-tight text-white sm:text-3xl lg:text-[2.15rem]"
              style={{ textWrap: 'balance' }}
            >
              I am <span className="text-[#DC1E2E]">{PROFILE.fullName}</span>, a first-year CSE (AI &amp; ML) undergraduate student passionate about Artificial Intelligence, programming, software development, and purposeful innovation.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-2 text-[15px] leading-relaxed text-zinc-400 md:grid-cols-2">
              <p>
                Pursuing my undergraduate degree at {PROFILE.institution}, I focus on bridging machine intelligence with clean, resilient web software—from real-time assistive computer vision tools like Ishara to interactive planetary mapping powered by NASA rover photography.
              </p>
              <p>
                Driven by curiosity and high-craft execution, I continually refine my command over Python, C, modern JavaScript, and editorial web architecture to build products that feel both technically rigorous and unmistakably human.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Clean 4-Column Unboxed Spec Strip */}
        <div className="mt-16 grid grid-cols-1 border-t border-b border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILE_SPECS.map((spec, index) => (
            <div
              key={spec.label}
              className={`py-6 ${
                index > 0 ? 'border-t border-white/10 sm:border-t-0' : ''
              } ${index % 2 === 1 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''} ${
                index > 0 ? 'lg:border-l lg:border-white/10 lg:pl-6' : 'lg:pr-6'
              } ${index < 3 ? 'lg:pr-6' : ''}`}
            >
              <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">
                {spec.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
