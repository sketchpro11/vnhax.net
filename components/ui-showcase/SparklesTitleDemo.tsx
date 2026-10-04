'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SparklesTitleDemo() {
  const [theme, setTheme] = useState<'cyan' | 'purple' | 'amber'>('cyan');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const THEMES = {
    cyan: {
      sparkle: '#38bdf8',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #38bdf8 100%)',
      label: 'Ocean Cyan',
    },
    purple: {
      sparkle: '#c084fc',
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #db2777 100%)',
      label: 'Neon Violet',
    },
    amber: {
      sparkle: '#fbbf24',
      gradient: 'linear-gradient(135deg, #451a03 0%, #d97706 50%, #f59e0b 100%)',
      label: 'Solar Amber',
    },
  };

  const currentTheme = THEMES[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const sparkles: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      maxAlpha: number;
    }> = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 28; i++) {
      sparkles.push({
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        size: Math.random() * 6 + 3,
        alpha: Math.random(),
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.8 + 0.2,
      });
    }

    const drawStar = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = currentTheme.sparkle;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.quadraticCurveTo(x, y, x + size, y);
      ctx.quadraticCurveTo(x, y, x, y + size);
      ctx.quadraticCurveTo(x, y, x - size, y);
      ctx.quadraticCurveTo(x, y, x, y - size);
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);

      sparkles.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha >= s.maxAlpha || s.alpha <= 0) {
          s.speed = -s.speed;
          if (s.alpha <= 0) {
            s.x = Math.random() * container.clientWidth;
            s.y = Math.random() * container.clientHeight;
          }
        }
        drawStar(s.x, s.y, s.size, s.alpha);
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme, currentTheme]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 10px', width: '100%' }}>
      {/* Theme Picker */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(k => (
          <button
            key={k}
            type="button"
            onClick={() => setTheme(k)}
            style={{
              background: theme === k ? '#0f172a' : '#f1f5f9',
              color: theme === k ? '#ffffff' : '#475569',
              border: 'none',
              borderRadius: '99px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {THEMES[k].label}
          </button>
        ))}
      </div>

      {/* Title Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          padding: '20px 24px',
          textAlign: 'center',
          maxWidth: '720px',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <h2
          style={{
            fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(28px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            backgroundImage: currentTheme.gradient,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        >
          Engineering Next-Gen Intelligence
        </h2>
        <p style={{ fontSize: '15px', color: '#64748b', marginTop: '12px' }}>
          Zero-dependency UI components engineered with fluid CSS &amp; HTML5 Canvas.
        </p>
      </div>
    </div>
  );
}
