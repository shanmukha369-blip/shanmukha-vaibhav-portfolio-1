import { useEffect, useState } from 'react';

interface WrappedTextItem {
  wrapper: HTMLSpanElement;
  originalNode: Text;
  t: HTMLSpanElement;
  m: HTMLSpanElement;
  h: HTMLSpanElement;
  chars: string[];
}

interface TourCursor {
  el: HTMLDivElement;
  x: number;
  y: number;
  moved: boolean;
}

interface CursorTourProps {
  tourTrigger: number;
  onTourActiveChange?: (active: boolean) => void;
}

const ALL_CURSOR_SPECS = [
  { label: 'Learn', color: '#DC1E2E', ink: '#FFFFFF' },
  { label: 'Experiment', color: '#FFFFFF', ink: '#050505' },
  { label: 'Build', color: '#B91624', ink: '#FFFFFF' },
  { label: 'Innovate', color: '#E4E4E7', ink: '#050505' },
  { label: 'Design', color: '#DC1E2E', ink: '#FFFFFF' },
  { label: 'Code', color: '#F5F5F7', ink: '#050505' },
  { label: 'Engineer', color: '#991B1B', ink: '#FFFFFF' },
  { label: 'Architect', color: '#D4D4D8', ink: '#050505' },
  { label: 'Explore', color: '#DC1E2E', ink: '#FFFFFF' },
  { label: 'Create', color: '#FFFFFF', ink: '#050505' },
  { label: 'Vision', color: '#B91624', ink: '#FFFFFF' },
  { label: 'Ship', color: '#E4E4E7', ink: '#050505' },
];

export function CursorTour({ tourTrigger, onTourActiveChange }: CursorTourProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      onTourActiveChange?.(false);
      return;
    }

    const root = document.documentElement;
    root.classList.add('tour-playing');
    root.style.scrollBehavior = 'auto';
    setActive(true);
    onTourActiveChange?.(true);

    let done = false;
    let finished = false;
    let rafId = 0;
    let scrollRafId = 0;
    let pointerX: number | null = null;
    let pointerY: number | null = null;

    const wrappedItems: WrappedTextItem[] = [];
    const wrappedElements = new Set<HTMLElement>();
    const cursors: TourCursor[] = [];
    const ripples: HTMLDivElement[] = [];

    const isMobile = window.innerWidth < 768;
    const activeSpecs = isMobile ? ALL_CURSOR_SPECS.slice(0, 6) : ALL_CURSOR_SPECS;

    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const q = (selector: string): HTMLElement | null =>
      document.querySelector(selector) as HTMLElement | null;

    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Fast, deterministic, lag-free rAF scroller (ignores slow CSS smooth-scroll)
    const fastScrollToElement = (
      el: HTMLElement | null,
      align: 'top' | 'center' | 'bottom' = 'top',
      durationMs = 380
    ) =>
      new Promise<void>((resolve) => {
        if (!el || done) {
          resolve();
          return;
        }
        const rect = el.getBoundingClientRect();
        const startY = window.scrollY;
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );

        let targetY = startY + rect.top - 72;
        if (align === 'center') {
          targetY = startY + rect.top - (window.innerHeight - rect.height) * 0.46;
        } else if (align === 'bottom') {
          targetY = startY + rect.bottom - window.innerHeight;
        }
        targetY = Math.max(0, Math.min(maxScroll, targetY));

        if (Math.abs(targetY - startY) < 4) {
          resolve();
          return;
        }

        const startTime = performance.now();
        const step = (now: number) => {
          if (done) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - startTime) / durationMs);
          const eased = easeInOutQuart(t);
          const nextY = startY + (targetY - startY) * eased;
          window.scrollTo(0, nextY);
          if (t < 1) {
            scrollRafId = requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        scrollRafId = requestAnimationFrame(step);
      });

    const fastScrollToTop = (durationMs = 420) =>
      new Promise<void>((resolve) => {
        if (done) {
          resolve();
          return;
        }
        const startY = window.scrollY;
        if (startY < 4) {
          resolve();
          return;
        }
        const startTime = performance.now();
        const step = (now: number) => {
          if (done) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - startTime) / durationMs);
          const eased = easeInOutQuart(t);
          window.scrollTo(0, startY * (1 - eased));
          if (t < 1) {
            scrollRafId = requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        scrollRafId = requestAnimationFrame(step);
      });

    const spawnRipple = (x: number, y: number) => {
      const r = document.createElement('div');
      r.className = 'tour-ripple';
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      ripples.push(r);
      setTimeout(() => {
        r.remove();
      }, 950);
    };

    const createCursor = (
      label: string,
      color: string,
      ink: string,
      zIndex: number,
      ox: number,
      oy: number
    ): TourCursor => {
      const d = document.createElement('div');
      d.className = 'tour-cursor nolabel';
      d.style.setProperty('--tc', color);
      d.style.setProperty('--ti', ink);
      d.style.zIndex = String(zIndex);
      d.style.transform = `translate3d(${ox - 2}px, ${oy - 2}px, 0)`;
      d.innerHTML = `<svg width="20" height="24" viewBox="0 0 22 26"><path style="fill:var(--tc)" d="M2 2v18l5-4.5 3.5 7.5 3-1.4-3.3-7.4H17z" stroke="#050505" stroke-width="1.5" stroke-linejoin="round"/></svg><span class="tour-chip">${label}</span>`;
      document.body.appendChild(d);
      const cursorObj: TourCursor = { el: d, x: ox, y: oy, moved: false };
      cursors.push(cursorObj);
      return cursorObj;
    };

    const flyCursor = (c: TourCursor, tx: number, ty: number, durationMs: number) =>
      new Promise<void>((resolve) => {
        const sx = c.x;
        const sy = c.y;
        const start = performance.now();

        const step = (now: number) => {
          if (done) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - start) / durationMs);
          const e = easeInOutCubic(t);
          c.x = sx + (tx - sx) * e;
          c.y = sy + (ty - sy) * e;
          c.el.style.transform = `translate3d(${c.x - 2}px, ${c.y - 2}px, 0)`;
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const wrapElementText = (el: HTMLElement | null): WrappedTextItem[] => {
      if (!el) return [];
      const existing = (el as HTMLElement & { _tourItems?: WrappedTextItem[] })._tourItems;
      if (existing) return existing;

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let current: Node | null;
      while ((current = walker.nextNode())) {
        if (current.nodeValue && current.nodeValue.trim()) {
          textNodes.push(current as Text);
        }
      }

      const out: WrappedTextItem[] = [];
      textNodes.forEach((textNode) => {
        const value = textNode.nodeValue || '';
        const span = document.createElement('span');
        span.innerHTML = '<span class="t"></span><span class="m"></span><span class="h"></span>';
        const t = span.children[0] as HTMLSpanElement;
        const m = span.children[1] as HTMLSpanElement;
        const h = span.children[2] as HTMLSpanElement;
        h.textContent = value;

        const item: WrappedTextItem = {
          wrapper: span,
          originalNode: textNode,
          t,
          m,
          h,
          chars: Array.from(value),
        };
        textNode.replaceWith(span);
        out.push(item);
        wrappedItems.push(item);
      });

      el.classList.add('tour-rd');
      wrappedElements.add(el);
      (el as HTMLElement & { _tourItems?: WrappedTextItem[] })._tourItems = out;
      return out;
    };

    // Single-rAF continuous batched engine: zero lag, zero missed text, 1 layout read per frame
    const runLanesBatched = (
      lanes: { cursor: TourCursor; elements: HTMLElement[]; charsPerSec: number }[]
    ) =>
      new Promise<void>((resolve) => {
        interface LaneState {
          cursor: TourCursor;
          items: WrappedTextItem[];
          itemIdx: number;
          charFloat: number;
          lastDrawnChar: number;
          charsPerSec: number;
          phase: 'fly' | 'type' | 'done';
          flyStart: number;
          flyDuration: number;
          flyFromX: number;
          flyFromY: number;
          flyToX: number;
          flyToY: number;
        }

        const states: LaneState[] = lanes
          .map((lane) => {
            const items: WrappedTextItem[] = [];
            lane.elements.forEach((el) => {
              wrapElementText(el).forEach((it) => items.push(it));
            });
            return {
              cursor: lane.cursor,
              items,
              itemIdx: 0,
              charFloat: 0,
              lastDrawnChar: -1,
              charsPerSec: lane.charsPerSec,
              phase: (items.length > 0 ? 'fly' : 'done') as 'fly' | 'type' | 'done',
              flyStart: 0,
              flyDuration: 420,
              flyFromX: lane.cursor.x,
              flyFromY: lane.cursor.y,
              flyToX: lane.cursor.x,
              flyToY: lane.cursor.y,
            };
          })
          .filter((s) => s.items.length > 0);

        if (!states.length) {
          resolve();
          return;
        }

        const now0 = performance.now();
        states.forEach((s) => {
          const rect = s.items[0].m.getBoundingClientRect();
          s.flyStart = now0;
          s.flyDuration = s.cursor.moved ? 360 : 620;
          s.cursor.moved = true;
          s.flyFromX = s.cursor.x;
          s.flyFromY = s.cursor.y;
          s.flyToX = rect.left;
          s.flyToY = rect.top + rect.height * 0.78;
        });

        let lastTime = now0;
        let frameCount = 0;

        const tick = (now: number) => {
          if (done) {
            resolve();
            return;
          }

          const dt = Math.min(0.05, (now - lastTime) / 1000);
          lastTime = now;
          frameCount += 1;

          // PHASE 1: Pure DOM text writes (zero layout reads)
          const needReadStates: LaneState[] = [];
          const needNextFlyStates: LaneState[] = [];

          for (let i = 0; i < states.length; i += 1) {
            const s = states[i];
            if (s.phase === 'done') continue;

            if (s.phase === 'fly') {
              const t = Math.min(1, (now - s.flyStart) / s.flyDuration);
              const e = easeInOutCubic(t);
              s.cursor.x = s.flyFromX + (s.flyToX - s.flyFromX) * e;
              s.cursor.y = s.flyFromY + (s.flyToY - s.flyFromY) * e;
              if (t >= 1) {
                s.phase = 'type';
                s.charFloat = 0;
                s.lastDrawnChar = -1;
              }
            }

            if (s.phase === 'type') {
              const item = s.items[s.itemIdx];
              s.charFloat += dt * s.charsPerSec;
              const targetChar = Math.min(item.chars.length, Math.floor(s.charFloat));

              if (targetChar !== s.lastDrawnChar) {
                s.lastDrawnChar = targetChar;
                item.t.textContent = item.chars.slice(0, targetChar).join('');
                item.h.textContent = item.chars.slice(targetChar).join('');
                // Read caret rect at most every 2nd frame for ultra-smooth 60fps performance
                if (frameCount % 2 === 0 || targetChar >= item.chars.length) {
                  needReadStates.push(s);
                }
              }

              if (targetChar >= item.chars.length) {
                item.t.textContent = item.chars.join('');
                item.h.textContent = '';
                s.itemIdx += 1;
                if (s.itemIdx >= s.items.length) {
                  s.phase = 'done';
                } else {
                  s.phase = 'fly';
                  s.flyStart = now;
                  s.flyDuration = 300;
                  s.flyFromX = s.cursor.x;
                  s.flyFromY = s.cursor.y;
                  needNextFlyStates.push(s);
                }
              }
            }
          }

          // PHASE 2: Single Batched Layout Read Pass
          for (let i = 0; i < needReadStates.length; i += 1) {
            const s = needReadStates[i];
            const activeItem = s.items[Math.min(s.itemIdx, s.items.length - 1)];
            const rect = activeItem.m.getBoundingClientRect();
            s.cursor.x += (rect.left - s.cursor.x) * 0.65;
            s.cursor.y += (rect.top + rect.height * 0.78 - s.cursor.y) * 0.65;
          }

          for (let i = 0; i < needNextFlyStates.length; i += 1) {
            const s = needNextFlyStates[i];
            const rect = s.items[s.itemIdx].m.getBoundingClientRect();
            s.flyToX = rect.left;
            s.flyToY = rect.top + rect.height * 0.78;
          }

          // PHASE 3: Pure GPU Transform Writes
          let remaining = 0;
          for (let i = 0; i < states.length; i += 1) {
            const s = states[i];
            if (s.phase !== 'done') remaining += 1;
            s.cursor.el.style.transform = `translate3d(${s.cursor.x - 2}px, ${s.cursor.y - 2}px, 0)`;
          }

          if (remaining > 0) {
            rafId = requestAnimationFrame(tick);
          } else {
            resolve();
          }
        };

        rafId = requestAnimationFrame(tick);
      });

    const sweepElements = async (c: TourCursor, els: HTMLElement[], holdMs: number) => {
      for (let i = 0; i < els.length && !done; i += 1) {
        const r = els[i].getBoundingClientRect();
        await flyCursor(c, r.left + r.width * 0.5, r.top + r.height * 0.55, 360);
        if (done) break;
        els[i].classList.add('tour-sim');
        await wait(holdMs);
        els[i].classList.remove('tour-sim');
      }
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      done = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);

      // Restore original DOM text nodes cleanly for React Virtual DOM integrity
      wrappedItems.forEach((it) => {
        if (it.wrapper.parentNode) {
          it.wrapper.replaceWith(it.originalNode);
        }
      });
      wrappedElements.forEach((el) => {
        el.classList.remove('tour-rd');
        delete (el as HTMLElement & { _tourItems?: WrappedTextItem[] })._tourItems;
      });

      document.querySelectorAll('.tour-typeme').forEach((el) => el.classList.add('tour-rd'));
      document.querySelectorAll('.tour-ia').forEach((el) => {
        el.classList.add('tour-on');
        el.classList.remove('tour-sim');
      });
      document.querySelectorAll('.tour-sim').forEach((el) => el.classList.remove('tour-sim'));

      cursors.forEach((c) => c.el.remove());
      ripples.forEach((r) => r.remove());
      root.classList.remove('tour-playing');
      root.style.scrollBehavior = '';
      setActive(false);
      onTourActiveChange?.(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finish();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Exhaustive collector: captures EVERY visible text element without missing a single detail!
    const collectAllTextElements = (container: HTMLElement): HTMLElement[] => {
      const candidates = Array.from(
        container.querySelectorAll('h1,h2,h3,h4,p,li,label,a,button,span')
      ) as HTMLElement[];

      const leafProseTags = new Set(['H1', 'H2', 'H3', 'H4', 'P', 'LI', 'LABEL']);
      const filtered: HTMLElement[] = [];

      candidates.forEach((el) => {
        if (!el.textContent?.trim()) return;
        if (el.closest('[aria-hidden="true"]')) return;
        if (el.closest('svg, select, input, textarea, .tour-skip-btn')) return;

        if (el.tagName === 'SPAN') {
          const parentProse = el.parentElement?.closest('h1,h2,h3,h4,p,li,label');
          if (parentProse && container.contains(parentProse)) return;
        }

        const hasTextChildBlock = Array.from(
          el.querySelectorAll('h1,h2,h3,h4,p,li,label,span')
        ).some((child) => {
          const c = child as HTMLElement;
          if (!c.textContent?.trim()) return false;
          if (leafProseTags.has(el.tagName) && c.tagName === 'SPAN') return false;
          return !c.closest('[aria-hidden="true"]');
        });

        if (hasTextChildBlock) return;
        filtered.push(el);
      });

      return filtered.filter(
        (el) => !filtered.some((other) => other !== el && other.contains(el))
      );
    };

    const typeTargetElements = async (
      scrollTarget: HTMLElement | null,
      align: 'top' | 'center' | 'bottom',
      elements: HTMLElement[],
      scrollMs = 360
    ) => {
      if (!scrollTarget || done) return;
      await fastScrollToElement(scrollTarget, align, scrollMs);
      if (done) return;
      // Tiny frame yield so IntersectionObserver reveals fire cleanly
      await wait(50);
      if (done || !elements.length) return;

      const buckets: HTMLElement[][] = cursors.map(() => []);
      elements.forEach((el, idx) => {
        buckets[idx % cursors.length].push(el);
      });

      const lanes = buckets
        .map((bucket, idx) => {
          const totalChars = bucket.reduce(
            (sum, el) => sum + (el.textContent?.trim().length || 0),
            0
          );
          // Smooth, deliberate, unbroken writing pace
          const charsPerSec = Math.max(26, Math.min(54, Math.ceil(totalChars / 2.7)));
          return {
            cursor: cursors[idx],
            elements: bucket,
            charsPerSec,
          };
        })
        .filter((l) => l.elements.length > 0);

      await runLanesBatched(lanes);
    };

    const runTour = async () => {
      document.querySelectorAll('.tour-typeme').forEach((el) => el.classList.remove('tour-rd'));
      document.querySelectorAll('.tour-ia').forEach((el) => el.classList.remove('tour-on'));

      window.scrollTo(0, 0);
      await wait(160);
      if (done) return;

      const ox = window.innerWidth / 2;
      const oy = window.innerHeight * 0.45;

      // Spawn all 12 cursors (6 on mobile) stacked at center origin
      activeSpecs.forEach((spec, idx) => {
        createCursor(spec.label, spec.color, spec.ink, 100 + idx, ox, oy);
      });

      // Collect and pre-wrap EVERY section's elements upfront so nothing shifts or misses!
      const aboutEl = q('#about');
      const workEl = q('#work');
      const workCard0 = q('[data-work-card="0"]');
      const workCard1 = q('[data-work-card="1"]');
      const workCard2 = q('[data-work-card="2"]');
      const workCard3 = q('[data-work-card="3"]');
      const skillsEl = q('#skills');
      const journeyEl = q('#journey');
      const contactEl = q('#contact');

      const aboutItems = aboutEl ? collectAllTextElements(aboutEl) : [];
      const workAllItems = workEl ? collectAllTextElements(workEl) : [];
      const workRow2Set = new Set<HTMLElement>();
      if (workCard2) collectAllTextElements(workCard2).forEach((el) => workRow2Set.add(el));
      if (workCard3) collectAllTextElements(workCard3).forEach((el) => workRow2Set.add(el));
      const workRow1Items = workAllItems.filter((el) => !workRow2Set.has(el));
      const workRow2Items = workAllItems.filter((el) => workRow2Set.has(el));
      // Ensure card 0 & 1 are included cleanly in row 1
      void workCard0;
      void workCard1;

      const skillsItems = skillsEl ? collectAllTextElements(skillsEl) : [];
      const journeyItems = journeyEl ? collectAllTextElements(journeyEl) : [];
      const contactItems = contactEl ? collectAllTextElements(contactEl) : [];

      [
        ...aboutItems,
        ...workRow1Items,
        ...workRow2Items,
        ...skillsItems,
        ...journeyItems,
        ...contactItems,
      ].forEach((el) => wrapElementText(el));

      // Center pulse ripple -> reveal all 12 cursor chips -> burst ripple
      spawnRipple(ox, oy);
      await wait(520);
      if (done) return;

      cursors.forEach((c) => c.el.classList.remove('nolabel'));
      spawnRipple(ox, oy);
      await wait(160);
      if (done) return;

      // Hero & Navbar continuous wave
      const heroBrand = q('[data-tour="brand"]');
      const heroContactNav = q('[data-tour="nav-contact"]');
      const heroLabel = q('[data-tour="label"]');
      const heroH1 = q('[data-tour="h1"]');
      const heroRole = q('[data-tour="role"]');
      const heroEdu = q('[data-tour="edu"]');
      const heroIntro = q('[data-tour="intro"]');
      const heroLinks = q('[data-tour="links"]');
      const heroPhoto = q('[data-tour="photo"]');
      const heroBtns = q('[data-tour="btns"]');

      const heroTypeTasks: { cursor: TourCursor; elements: HTMLElement[]; charsPerSec: number }[] = [];
      if (heroBrand || heroLabel) {
        heroTypeTasks.push({
          cursor: cursors[0],
          elements: [heroBrand, heroLabel].filter(Boolean) as HTMLElement[],
          charsPerSec: 26,
        });
      }
      if (heroH1) {
        heroTypeTasks.push({
          cursor: cursors[1],
          elements: [heroH1],
          charsPerSec: 24,
        });
      }
      if (heroRole || heroEdu) {
        heroTypeTasks.push({
          cursor: cursors[4 % cursors.length],
          elements: [heroRole, heroEdu].filter(Boolean) as HTMLElement[],
          charsPerSec: 28,
        });
      }
      if (heroIntro) {
        heroTypeTasks.push({
          cursor: cursors[5 % cursors.length],
          elements: [heroIntro],
          charsPerSec: 38,
        });
      }
      if (heroContactNav) {
        heroTypeTasks.push({
          cursor: cursors[6 % cursors.length],
          elements: [heroContactNav],
          charsPerSec: 22,
        });
      }

      const ambientCursors = cursors.slice(7);
      const ambientFlights = ambientCursors.map((c, idx) => {
        const angle = ((idx + 1) / (ambientCursors.length + 1)) * Math.PI * 2;
        const rx = Math.min(window.innerWidth * 0.34, 420);
        const ry = Math.min(window.innerHeight * 0.28, 210);
        return flyCursor(c, ox + Math.cos(angle) * rx, oy + Math.sin(angle) * ry, 720 + idx * 60);
      });

      await Promise.all([
        runLanesBatched(heroTypeTasks),
        (async () => {
          if (heroLinks) {
            const r = heroLinks.getBoundingClientRect();
            await flyCursor(cursors[2], r.left + 20, r.top + r.height / 2, 620);
            heroLinks.classList.add('tour-on');
            const navLinks = Array.from(heroLinks.querySelectorAll('a')) as HTMLElement[];
            await sweepElements(cursors[2], navLinks, 180);
          }
        })(),
        (async () => {
          if (heroPhoto) {
            const r = heroPhoto.getBoundingClientRect();
            await flyCursor(cursors[3], r.left + r.width * 0.5, r.top + r.height * 0.42, 660);
            heroPhoto.classList.add('tour-on');
            heroPhoto.classList.add('tour-sim');
            await wait(520);
            heroPhoto.classList.remove('tour-sim');
          }
          if (heroBtns) {
            heroBtns.classList.add('tour-on');
            const ctaEls = Array.from(
              heroBtns.querySelectorAll('a, button')
            ) as HTMLElement[];
            await sweepElements(cursors[3], ctaEls, 210);
          }
        })(),
        ...ambientFlights,
      ]);

      if (done) return;

      // Continuous fast-scrolling writing tour across EVERY section without pauses or misses
      await typeTargetElements(aboutEl, 'top', aboutItems, 360);
      await typeTargetElements(workEl, 'top', workRow1Items, 360);
      await typeTargetElements(workCard2 || workEl, 'center', workRow2Items, 340);
      await typeTargetElements(skillsEl, 'top', skillsItems, 360);
      await typeTargetElements(journeyEl, 'top', journeyItems, 360);
      await typeTargetElements(contactEl, 'bottom', contactItems, 380);

      if (done) return;
      await wait(240);

      // Converge all 12 cursors onto user's pointer + swift scroll back to top
      const tx = pointerX ?? window.innerWidth / 2;
      const ty = pointerY ?? window.innerHeight / 2;
      cursors.forEach((c) => c.el.classList.add('nolabel'));

      await Promise.all([
        fastScrollToTop(480),
        ...cursors.map((c, idx) => flyCursor(c, tx, ty, 680 + idx * 40)),
      ]);

      spawnRipple(tx, ty);
      cursors.forEach((c) => {
        c.el.style.transition = 'opacity 320ms ease';
        c.el.style.opacity = '0';
      });

      await wait(340);
      finish();
    };

    const failSafeTimer = setTimeout(finish, 180000);
    const fontsReady = document.fonts ? document.fonts.ready : wait(0);
    Promise.race([fontsReady, wait(900)])
      .then(runTour)
      .catch(finish);

    const onSkipEvent = () => finish();
    window.addEventListener('portfolio-skip-tour', onSkipEvent);

    return () => {
      clearTimeout(failSafeTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('portfolio-skip-tour', onSkipEvent);
      finish();
    };
  }, [tourTrigger, onTourActiveChange]);

  if (!active) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('portfolio-skip-tour'))}
      className="tour-skip-btn fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 border border-white/25 bg-[#0B0B0C]/92 px-5 py-2 font-mono-tabular text-xs font-medium tracking-[0.16em] text-zinc-200 uppercase shadow-[0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-md transition-colors hover:border-[#DC1E2E] hover:text-white"
    >
      Skip Tour
    </button>
  );
}
