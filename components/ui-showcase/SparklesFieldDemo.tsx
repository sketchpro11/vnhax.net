'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SparklesFieldDemo() {
  const [particleCount, setParticleCount] = useState(50);
  const [color, setColor] = useState('#38bdf8');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      twinkle: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        alpha: Math.random(),
        twinkle: Math.random() * 0.03 + 0.01,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    container.addEventListener('mousemove', onMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Subtle reaction to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        }

        p.alpha += p.twinkle;
        if (p.alpha > 1 || p.alpha < 0.2) p.twinkle = -p.twinkle;

        ctx.save();
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, [particleCount, color]);

  return (
    <div style={{ width: '100%', padding: '20px 10px' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Density:</span>
        {[25, 50, 90].map(cnt => (
          <button
            key={cnt}
            type="button"
            onClick={() => setParticleCount(cnt)}
            style={{
              background: particleCount === cnt ? '#0f172a' : '#f1f5f9',
              color: particleCount === cnt ? '#ffffff' : '#334155',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {cnt === 25 ? 'Light (25)' : cnt === 50 ? 'Medium (50)' : 'Dense (90)'}
          </button>
        ))}

        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginLeft: '10px' }}>Color:</span>
        {['#38bdf8', '#a855f7', '#22c55e'].map(c => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: c,
              border: color === c ? '2px solid #0f172a' : 'none',
              cursor: 'pointer',
            }}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      {/* Canvas Backdrop Showcase Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '280px',
          background: '#090d16',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
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

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '24px',
            color: '#f8fafc',
            maxWidth: '480px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              padding: '4px 12px',
              borderRadius: '99px',
              marginBottom: '10px',
            }}
          >
            Move Cursor Below
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>Interactive Canvas Particles</h3>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
            Particles gently repel from mouse proximity with locked 60 FPS requestAnimationFrame rendering.
          </p>
        </div>
      </div>
    </div>
  );
}
