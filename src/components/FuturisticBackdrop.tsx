import { useEffect, useRef } from 'react';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isRed: boolean;
}

export function FuturisticBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -9999, y: -9999 };
    const nodeCount = Math.min(36, Math.max(20, Math.floor((width * height) / 42000)));

    const nodes: NodePoint[] = Array.from({ length: nodeCount }).map((_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.36,
      vy: (Math.random() - 0.5) * 0.36,
      radius: idx % 4 === 0 ? 1.8 : 1.15,
      isRed: idx % 3 === 0,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    const maxDist = 145;
    const mouseDist = 175;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        // Subtle cursor attraction / deflection field
        const dxM = mouse.x - a.x;
        const dyM = mouse.y - a.y;
        const distM = Math.hypot(dxM, dyM);
        if (distM > 1 && distM < mouseDist) {
          const force = (1 - distM / mouseDist) * 0.018;
          a.x += dxM * force;
          a.y += dyM * force;
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fillStyle = a.isRed ? 'rgba(220, 30, 46, 0.55)' : 'rgba(255, 255, 255, 0.25)';
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle =
              a.isRed || b.isRed
                ? `rgba(220, 30, 46, ${alpha * 1.25})`
                : `rgba(255, 255, 255, ${alpha * 0.7})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect to active pointer
        if (distM < mouseDist) {
          const alpha = (1 - distM / mouseDist) * 0.32;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(220, 30, 46, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-75"
    />
  );
}
