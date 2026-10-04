'use client';

import { useEffect, useRef } from 'react';

export default function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && barRef.current) {
        const pct = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        barRef.current.style.width = `${pct}%`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '0%',
        height: '3px',
        background: 'linear-gradient(90deg, #2563eb, #38bdf8)',
        zIndex: 9999,
        transition: 'width 60ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'width',
      }}
    />
  );
}
