import { motion, useReducedMotion } from 'motion/react';
import { EDUCATION_MILESTONES } from '@/src/data/portfolio';

export function JourneySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      className="relative border-t border-white/10 bg-[#050505] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#DC1E2E]">
                04.
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
                Education &amp; Journey
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 lg:flex lg:items-end lg:justify-end">
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Building a rigorous foundation in Computer Science, Artificial Intelligence, and Machine Learning through project-driven engineering education.
            </p>
          </div>
        </div>

        {/* Academic Feature Block */}
        {EDUCATION_MILESTONES.map((item) => (
          <motion.div
            key={item.institution}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-1 gap-10 border border-white/10 bg-[#0B0B0C] p-8 md:p-12 lg:grid-cols-12"
          >
            {/* Left Institution Lockup */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-5 lg:border-r lg:border-white/10 lg:pr-10">
              <div>
                <p className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[#DC1E2E] uppercase">
                  {item.period}
                </p>
                <h3 className="mt-4 font-display text-5xl leading-[0.92] font-extrabold tracking-tight text-white uppercase sm:text-6xl">
                  {item.institution}
                </h3>
                <p className="mt-4 text-lg font-semibold text-zinc-200">
                  {item.degree}
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-xs tracking-[0.14em] text-zinc-400 uppercase">
                  {item.location}
                </p>
              </div>
            </div>

            {/* Right Curriculum & Focus */}
            <div className="flex flex-col justify-between space-y-8 lg:col-span-7">
              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                {item.summary}
              </p>

              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-zinc-400 uppercase">
                  Key Academic Pillars
                </p>

                <div className="mt-4 divide-y divide-white/10 border-t border-b border-white/10">
                  {item.pillars.map((pillar, idx) => (
                    <div
                      key={pillar}
                      className="flex items-baseline gap-4 py-4 text-sm text-zinc-200 sm:text-[15px]"
                    >
                      <span className="font-mono-tabular text-xs text-[#DC1E2E]">
                        0{idx + 1}
                      </span>
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
