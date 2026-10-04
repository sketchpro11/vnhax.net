'use client';

import React, { useState } from 'react';

export default function TweetCardDemo() {
  const [likes, setLikes] = useState(892);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  const copyTweet = () => {
    navigator.clipboard.writeText(
      'Just shipped zero-dependency UI components on VNHAX! 0 kB runtime JS bloat, sub-10ms rendering time. Check it out at vnhax.net/ui-components'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 10px', width: '100%' }}>
      <article
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--surface-card, #ffffff)',
          border: '1px solid #e2e8f0',
          borderRadius: '18px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          fontFamily: 'var(--font-body, -apple-system, sans-serif)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        aria-label="Tweet by Alex Rivera (@alexrivera)"
      >
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #9333ea)',
                display: 'grid',
                placeItems: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '17px',
              }}
            >
              AR
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>Alex Rivera</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#1d9bf0" aria-label="Verified account">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.45 2.475 13.08 1.6 11.5 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.475 9.55.6 10.92.6 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.14 1.273 2.51 2.148 4.09 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.14 2.148-2.51 2.148-4.09zm-12.2 4.4l-3.9-3.9 1.4-1.4 2.5 2.5 6.5-6.5 1.4 1.4-7.9 7.9z"/>
                </svg>
              </div>
              <span style={{ fontSize: '13px', color: '#64748b' }}>@alexrivera · 2h</span>
            </div>
          </div>

          <button
            onClick={copyTweet}
            style={{
              background: 'none',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '11.5px',
              color: copied ? '#16a34a' : '#64748b',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            title="Copy Tweet text"
          >
            {copied ? '✓ Copied' : 'Share'}
          </button>
        </header>

        {/* Content */}
        <div style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#1e293b', marginBottom: '14px' }}>
          <p>
            Just shipped our new zero-dependency UI component library! Built with pure semantic HTML5 &amp; native CSS custom properties. Sub-10ms render latency, 0 kB runtime JS bloat.
          </p>
          <p style={{ marginTop: '8px', color: '#2563eb', fontWeight: 500 }}>
            #WebDev #UIComponents #React #OpenSource
          </p>
        </div>

        {/* Embedded Card Media Preview */}
        <div
          style={{
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            marginBottom: '16px',
            background: '#0f172a',
            padding: '16px',
            color: '#f8fafc',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8', fontWeight: 700 }}>
              Performance Metrics
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Lighthouse 100/100</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '8px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#4ade80' }}>0.00</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>CLS</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '8px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8' }}>8ms</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>INP</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '8px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#a78bfa' }}>0 kB</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>JS Bloat</div>
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '12px',
          }}
        >
          {/* Reply */}
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
            }}
            aria-label="38 replies"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>38</span>
          </button>

          {/* Retweet */}
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
            }}
            aria-label="142 reposts"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            <span>142</span>
          </button>

          {/* Like */}
          <button
            type="button"
            onClick={toggleLike}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: liked ? '#e11d48' : '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: liked ? 600 : 400,
              transition: 'color 0.15s ease',
            }}
            aria-label={liked ? 'Unlike tweet' : 'Like tweet'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={liked ? '#e11d48' : 'none'}
              stroke={liked ? '#e11d48' : 'currentColor'}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{likes}</span>
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            style={{
              background: 'none',
              border: 'none',
              color: bookmarked ? '#2563eb' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark tweet'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={bookmarked ? '#2563eb' : 'none'}
              stroke={bookmarked ? '#2563eb' : 'currentColor'}
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </footer>
      </article>
    </div>
  );
}
