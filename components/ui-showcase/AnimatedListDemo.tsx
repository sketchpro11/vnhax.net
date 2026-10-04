'use client';

import React, { useState, useEffect } from 'react';

interface ActivityItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  badgeColor: string;
}

const SAMPLE_EVENTS: ActivityItem[] = [
  { id: '1', title: 'Payment Confirmed', desc: '$120.00 from Stripe webhook', time: 'Just now', icon: '💳', badgeColor: '#eff6ff' },
  { id: '2', title: 'Edge Deployment Live', desc: 'Edge cache warmed across 34 regions', time: '1m ago', icon: '🚀', badgeColor: '#f0fdf4' },
  { id: '3', title: 'Model Checkpoint Saved', desc: 'Llama-3-8B fine-tune epoch 4 complete', time: '3m ago', icon: '🧠', badgeColor: '#faf5ff' },
  { id: '4', title: 'New GitHub Star', desc: 'vnhax/zero-css-components starred by dev', time: '5m ago', icon: '⭐', badgeColor: '#fefce8' },
  { id: '5', title: 'Telemetry Alert Resolved', desc: 'Memory utilization returned to 42%', time: '8m ago', icon: '✅', badgeColor: '#f0fdf4' },
];

export default function AnimatedListDemo() {
  const [items, setItems] = useState<ActivityItem[]>(SAMPLE_EVENTS.slice(0, 3));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setItems(prev => {
        const nextIndex = prev.length % SAMPLE_EVENTS.length;
        const newItem = {
          ...SAMPLE_EVENTS[nextIndex],
          id: `${Date.now()}-${Math.random()}`,
          time: 'Just now',
        };
        return [newItem, ...prev.slice(0, 4)];
      });
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused]);

  const addManualEvent = () => {
    const randomEvent = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
    const newItem = {
      ...randomEvent,
      id: `${Date.now()}-${Math.random()}`,
      time: 'Just now',
    };
    setItems(prev => [newItem, ...prev.slice(0, 4)]);
  };

  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', padding: '20px 10px' }}>
      {/* Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          background: '#f8fafc',
          padding: '8px 12px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isPaused ? '#f59e0b' : '#16a34a',
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            {isPaused ? 'Feed Paused' : 'Live Stream'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '11.5px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            type="button"
            onClick={addManualEvent}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11.5px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            + Push Event
          </button>
        </div>
      </div>

      {/* Stream Cards */}
      <div
        role="log"
        aria-live="polite"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minHeight: '260px',
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '12px 16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              animation: 'animatedListPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: item.badgeColor,
                display: 'grid',
                placeItems: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8', flexShrink: 0 }}>
                  {item.time}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes animatedListPop {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
