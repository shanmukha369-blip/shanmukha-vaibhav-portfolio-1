import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';

interface BurstCursor {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  color: string;
}

export function CustomCursor({ suppressed = false }: { suppressed?: boolean }) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'pointer' | 'project'>('default');
  const [bursts, setBursts] = useState<BurstCursor[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.35 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.35 });

  const trail1X = useSpring(mouseX, { stiffness: 210, damping: 24, mass: 0.5 });
  const trail1Y = useSpring(mouseY, { stiffness: 210, damping: 24, mass: 0.5 });

  const trail2X = useSpring(mouseX, { stiffness: 135, damping: 22, mass: 0.75 });
  const trail2Y = useSpring(mouseY, { stiffness: 135, damping: 22, mass: 0.75 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="project"]')) {
        setCursorMode('project');
      } else if (target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorMode('pointer');
      } else {
        setCursorMode('default');
      }
    };

    const handleClick = (e: MouseEvent) => {
      const baseId = Date.now() + Math.random();
      const count = 6;
      const spawned: BurstCursor[] = Array.from({ length: count }).map((_, idx) => ({
        id: baseId + idx,
        x: e.clientX,
        y: e.clientY,
        angle: (360 / count) * idx + (Math.random() * 18 - 9),
        distance: 52 + Math.random() * 34,
        color: idx % 2 === 0 ? '#DC1E2E' : '#FFFFFF',
      }));

      setBursts((prev) => [...prev.slice(-18), ...spawned]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((item) => !spawned.some((s) => s.id === item.id)));
      }, 650);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleClick, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleClick);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled || suppressed) return null;

  const isProject = cursorMode === 'project';
  const isPointer = cursorMode === 'pointer';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {/* Trailing Kinetic Ghost Node 2 */}
      <motion.div
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible && !isProject ? 0.25 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 h-3 w-3 rounded-full border border-white/60"
      />

      {/* Trailing Kinetic Ghost Node 1 */}
      <motion.div
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible && !isProject ? 0.45 : 0,
        }}
        transition={{ duration: 0.18 }}
        className="fixed top-0 left-0 h-6 w-6 rounded-full border border-[#DC1E2E]/60"
      />

      {/* Rotating Futuristic Dashed Optical Reticle */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: isProject ? 78 : isPointer ? 48 : 34,
          height: isProject ? 78 : isPointer ? 48 : 34,
          rotate: isProject ? 180 : isPointer ? 90 : 360,
          backgroundColor: isProject
            ? 'rgba(220, 30, 46, 0.92)'
            : isPointer
              ? 'rgba(220, 30, 46, 0.15)'
              : 'rgba(255, 255, 255, 0)',
          borderColor: isProject || isPointer ? '#DC1E2E' : 'rgba(245, 245, 247, 0.55)',
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 7, ease: 'linear' },
          default: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
        }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-dashed"
      >
        {isProject && (
          <span className="font-mono-tabular text-[10px] font-medium tracking-[0.18em] text-white uppercase">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Main Precision Vector Pointer Core */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible && !isProject ? 1 : 0,
          scale: isPointer ? 0.75 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-[#DC1E2E] shadow-[0_0_10px_#DC1E2E]"
      />

      {/* Click-Triggered Divided Mini Cursors Bursting from Main Cursor */}
      <AnimatePresence>
        {bursts.map((burst) => {
          const rad = (burst.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * burst.distance;
          const targetY = Math.sin(rad) * burst.distance;

          return (
            <motion.div
              key={burst.id}
              initial={{
                x: burst.x,
                y: burst.y,
                opacity: 0.95,
                scale: 0.85,
                rotate: burst.angle + 45,
              }}
              animate={{
                x: burst.x + targetX,
                y: burst.y + targetY,
                opacity: 0,
                scale: 0.45,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
            >
              <svg width="14" height="16" viewBox="0 0 20 22" fill="none">
                <path
                  d="M2.2 1.8L17.4 10.6L10.3 12.6L7.1 19.6L2.2 1.8Z"
                  fill={burst.color}
                  stroke="#050505"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
