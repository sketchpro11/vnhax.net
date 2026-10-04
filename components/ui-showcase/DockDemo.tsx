'use client';

import React, { useRef, useState } from 'react';

const DOCK_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: '⚡' },
  { id: 'repos', label: 'Repositories', icon: '📦' },
  { id: 'terminal', label: 'Terminal CLI', icon: '💻' },
  { id: 'docs', label: 'Documentation', icon: '📚' },
  { id: 'chat', label: 'AI Assistant', icon: '✨' },
  { id: 'analytics', label: 'Telemetry', icon: '📈' },
  { id: 'settings', label: 'Preferences', icon: '⚙️' },
];

export default function DockDemo() {
  const [activeId, setActiveId] = useState('home');
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '220px',
        padding: '20px 10px',
        width: '100%',
      }}
    >
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        Hover across icons to experience proximity magnification physics:
      </p>

      {/* Floating Glass Dock */}
      <nav
        onMouseMove={e => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        role="toolbar"
        aria-label="Interactive dock demonstration"
        style={{
          display: 'inline-flex',
          alignItems: 'flex-end',
          gap: '10px',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '26px',
          padding: '12px 18px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
        }}
      >
        {DOCK_ITEMS.map(item => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isActive={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          />
        ))}
      </nav>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
        Active selection: <strong style={{ color: '#0f172a' }}>{DOCK_ITEMS.find(i => i.id === activeId)?.label}</strong>
      </div>
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  isActive,
  onClick,
}: {
  item: { id: string; label: string; icon: string };
  mouseX: number | null;
  isActive: boolean;
  onClick: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  let scale = 1;
  const maxScale = 1.45;
  const distance = 110;

  if (mouseX !== null && btnRef.current) {
    const rect = btnRef.current.getBoundingClientRect();
    const iconCenter = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - iconCenter);
    if (dist < distance) {
      const factor = Math.cos((dist / distance) * (Math.PI / 2));
      scale = 1 + (maxScale - 1) * factor;
    }
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={item.label}
      style={{
        position: 'relative',
        width: '46px',
        height: '46px',
        borderRadius: '14px',
        background: isActive ? 'rgba(56, 189, 248, 0.25)' : isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
        border: isActive ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        cursor: 'pointer',
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background 0.15s ease',
      }}
    >
      {/* Floating Tooltip */}
      <span
        style={{
          position: 'absolute',
          top: '-34px',
          background: '#0f172a',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 600,
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.15)',
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {item.label}
      </span>

      <span>{item.icon}</span>

      {/* Active Dot */}
      {isActive && (
        <span
          style={{
            position: 'absolute',
            bottom: '3px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#38bdf8',
          }}
        />
      )}
    </button>
  );
}
