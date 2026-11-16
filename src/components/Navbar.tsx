import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '@/src/data/portfolio';

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'JOURNEY', href: '#journey' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sectionIds = ['home', 'about', 'work', 'skills', 'journey', 'contact'];
      const offset = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'border-b border-white/10 bg-[#050505]/90 backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-[#050505]/90 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 md:px-10">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#home"
            data-tour="brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="tour-typeme font-display text-xl font-bold tracking-wider text-white uppercase whitespace-nowrap shrink-0 transition-colors hover:text-[#DC1E2E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC1E2E]"
          >
            {PROFILE.shortMark}
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            data-tour="links"
            className="tour-ia hidden md:flex items-center gap-7"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative py-1 text-xs font-medium tracking-[0.16em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DC1E2E] ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#DC1E2E] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              data-tour="nav-contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="tour-typeme hidden md:inline-flex items-center justify-center bg-[#DC1E2E] px-5 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#b91624] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              CONTACT
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors hover:border-[#DC1E2E] md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#050505] px-6 pt-24 pb-10 md:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col border-t border-white/10">
              {[...NAV_LINKS, { label: 'CONTACT', href: '#contact' }].map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex items-baseline justify-between border-b border-white/10 py-5 text-white transition-colors hover:text-[#DC1E2E]"
                >
                  <span className="font-display text-4xl font-bold tracking-tight uppercase">
                    {item.label}
                  </span>
                  <span className="font-mono-tabular text-xs text-zinc-500">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="space-y-2 border-t border-white/10 pt-6">
              <p className="text-xs tracking-[0.14em] text-zinc-400 uppercase">
                {PROFILE.institution}
              </p>
              <p className="text-sm text-zinc-300">{PROFILE.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
