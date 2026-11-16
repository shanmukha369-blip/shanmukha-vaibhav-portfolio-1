import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SKILLS, type SkillItem } from '@/src/data/portfolio';

type FilterCategory = 'All' | SkillItem['category'];

const FILTER_OPTIONS: FilterCategory[] = ['All', 'Languages', 'AI & Web', 'Tools'];

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  const filteredSkills =
    activeCategory === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative border-t border-white/10 bg-[#08080A] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header + Interactive Filter Controls */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#DC1E2E]">
                03.
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
                Technical Capabilities
              </h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
              Core programming languages, artificial intelligence foundations, and modern web engineering tools.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap items-center gap-1 border border-white/10 bg-[#050505] p-1 self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#DC1E2E] text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Architectural Hairline Grid */}
        <div className="mt-10 grid grid-cols-1 border-t border-l border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.3,
                delay: (idx % 4) * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between overflow-hidden border-r border-b border-white/10 bg-[#050505] p-7 transition-colors duration-200 hover:bg-[#0E0E11]"
            >
              {/* Crimson Hover Sweep Hairline */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 bg-[#DC1E2E] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[#DC1E2E]">
                    {skill.number}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {skill.category}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-white uppercase transition-colors duration-150 group-hover:text-[#DC1E2E]">
                  {skill.name}
                </h3>

                <p className="mt-1 text-xs font-medium tracking-[0.12em] text-zinc-400 uppercase">
                  {skill.focus}
                </p>
              </div>

              <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-zinc-400">
                {skill.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
