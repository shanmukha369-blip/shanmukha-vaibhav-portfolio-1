const MARQUEE_ITEMS = [
  'ARTIFICIAL INTELLIGENCE',
  'MACHINE LEARNING',
  'COMPUTER VISION',
  'PYTHON & C',
  'FULL-STACK WEB',
  'ISHARA AI',
  'NASA MARS MAP',
  'JOY UNIVERSITY × NIAT',
];

export function KineticMarquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-t border-b border-white/10 bg-[#08080A] py-4 select-none"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-10">
            <span className="font-display text-xl font-bold tracking-[0.12em] text-zinc-300 uppercase sm:text-2xl">
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-[#DC1E2E]" />
          </div>
        ))}
      </div>
    </div>
  );
}
