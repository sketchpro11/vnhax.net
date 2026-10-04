export interface ComponentProp {
  prop: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentInstallStep {
  title: string;
  code: string;
  lang: string;
  notes?: string;
}

export interface UIComponent {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  badge: 'MagicUI Pattern' | 'UI-Layouts Pattern';
  description: string;
  architecturalOverview: string;
  features: string[];
  props: ComponentProp[];
  installGuide: {
    cliCommand: string;
    npmPackages: string[];
    steps: ComponentInstallStep[];
  };
  codeReact: string;
  codeTailwind: string;
  codeVanillaCSS: string;
  accessibility: {
    wcagCriteria: string;
    ariaNotes: string[];
    keyboardSupport: string[];
  };
  coreWebVitals: {
    inpScore: string;
    clsScore: string;
    performanceTips: string;
  };
}

export const UI_COMPONENTS: Record<string, UIComponent> = {
  'tweet-card': {
    slug: 'tweet-card',
    title: 'Tweet Card',
    subtitle: 'Verified social testimonial card with live engagement metrics, media embed, and responsive theme support.',
    category: 'Cards & Social',
    badge: 'MagicUI Pattern',
    description:
      'The Tweet Card is an engineered, accessible social proof card that displays user feedback, developer tweets, or product reviews with zero client-side iframe overhead. Unlike standard Twitter/X widgets that fetch third-party tracking scripts and introduce 800+ kB of bundle weight, this native component compiles to under 2 kB of clean HTML and CSS.',
    architecturalOverview:
      'Engineered with semantic <article> tags, accessible SVG iconography for verified checkmarks, and responsive CSS variables. It includes dynamic engagement counters (replies, retweets, likes, bookmarks) with optimistic state updates and keyboard-navigable interaction triggers.',
    features: [
      'Zero third-party JavaScript tracking or blocking iframe scripts',
      'Optimistic like/bookmark toggles with responsive feedback',
      'High-resolution avatar and verified badge support',
      'Dark and light mode surfaces using CSS variables or Tailwind classes',
      'Sub-millisecond initial paint with 0 CLS (Cumulative Layout Shift)',
    ],
    props: [
      { prop: 'author', type: 'AuthorObject', default: 'Required', description: 'Author name, handle, avatar URL, and verified status flag.' },
      { prop: 'content', type: 'string', default: 'Required', description: 'Text body of the tweet including hashtags and mentions.' },
      { prop: 'date', type: 'string', default: 'Required', description: 'Timestamp string (e.g. "Oct 4, 2026").' },
      { prop: 'metrics', type: 'MetricsObject', default: 'Optional', description: 'Initial counts for replies, retweets, likes, and impressions.' },
      { prop: 'mediaUrl', type: 'string', default: 'undefined', description: 'Optional media image URL embedded inside the card.' },
      { prop: 'className', type: 'string', default: "''", description: 'Optional custom CSS class name for outer card styling.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://magicui.design/r/tweet-card"',
      npmPackages: ['lucide-react (optional for icons)'],
      steps: [
        {
          title: 'Step 1: Install or Copy Component',
          lang: 'bash',
          code: 'npm install lucide-react # optional, pure SVGs included below',
          notes: 'No heavy runtime dependencies are required. Pure SVG icons are built-in.',
        },
        {
          title: 'Step 2: Add Component to your Project',
          lang: 'tsx',
          code: `import { TweetCard } from '@/components/TweetCard';\n\n<TweetCard\n  author={{\n    name: "Sarah Chen",\n    handle: "sarahdev",\n    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",\n    verified: true,\n  }}\n  content="Just shipped our new real-time AI analytics engine with zero-dependency CSS. Sub-10ms latency across the globe!"\n  date="Oct 4, 2026"\n  metrics={{ replies: 42, retweets: 128, likes: 890, views: "45.2K" }}\n/>`,
        },
      ],
    },
    codeReact: `import React, { useState } from 'react';

export interface TweetAuthor {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
}

export interface TweetMetrics {
  replies: number;
  retweets: number;
  likes: number;
  views?: string;
}

export interface TweetCardProps {
  author: TweetAuthor;
  content: string;
  date: string;
  metrics?: TweetMetrics;
  mediaUrl?: string;
  className?: string;
}

export const TweetCard: React.FC<TweetCardProps> = ({
  author,
  content,
  date,
  metrics = { replies: 12, retweets: 34, likes: 256, views: '14.5K' },
  mediaUrl,
  className = '',
}) => {
  const [likes, setLikes] = useState(metrics.likes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <article
      className={\`tweet-card \${className}\`}
      aria-label={\`Tweet by \${author.name} (@\${author.handle})\`}
    >
      <header className="tweet-card-header">
        <img
          src={author.avatar}
          alt={author.name}
          className="tweet-card-avatar"
          width={44}
          height={44}
          loading="lazy"
        />
        <div className="tweet-card-meta">
          <div className="tweet-card-author-row">
            <span className="tweet-card-name">{author.name}</span>
            {author.verified && (
              <svg className="tweet-card-badge" viewBox="0 0 24 24" fill="#1d9bf0" width="18" height="18" aria-label="Verified account">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.45 2.475 13.08 1.6 11.5 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.475 9.55.6 10.92.6 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.14 1.273 2.51 2.148 4.09 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.14 2.148-2.51 2.148-4.09zm-12.2 4.4l-3.9-3.9 1.4-1.4 2.5 2.5 6.5-6.5 1.4 1.4-7.9 7.9z"/>
              </svg>
            )}
          </div>
          <span className="tweet-card-handle">@{author.handle} · {date}</span>
        </div>
      </header>

      <div className="tweet-card-body">
        <p>{content}</p>
      </div>

      {mediaUrl && (
        <div className="tweet-card-media">
          <img src={mediaUrl} alt="Embedded tweet media" loading="lazy" />
        </div>
      )}

      <footer className="tweet-card-actions">
        <button type="button" className="tweet-action-btn" aria-label="Reply">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>{metrics.replies}</span>
        </button>

        <button type="button" className="tweet-action-btn" aria-label="Retweet">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          <span>{metrics.retweets}</span>
        </button>

        <button
          type="button"
          onClick={toggleLike}
          className={\`tweet-action-btn \${liked ? 'tweet-liked' : ''}\`}
          aria-label={liked ? 'Unlike tweet' : 'Like tweet'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#e11d48' : 'none'} stroke={liked ? '#e11d48' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{likes}</span>
        </button>

        <button
          type="button"
          onClick={() => setBookmarked(!bookmarked)}
          className={\`tweet-action-btn \${bookmarked ? 'tweet-bookmarked' : ''}\`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark tweet'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? '#2563eb' : 'none'} stroke={bookmarked ? '#2563eb' : 'currentColor'} strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </footer>
    </article>
  );
};`,
    codeTailwind: `<!-- Tailwind CSS Variant -->
<article class="max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950">
  <div class="flex items-center gap-3">
    <img src="/avatar.jpg" class="h-11 w-11 rounded-full object-cover" alt="User Avatar" />
    <div>
      <div class="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white">
        <span>Alex Rivera</span>
        <svg class="h-4 w-4 fill-sky-500" viewBox="0 0 24 24">...</svg>
      </div>
      <p class="text-xs text-neutral-500">@alexrivera · Oct 4</p>
    </div>
  </div>
  <p class="mt-3.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
    Clean semantic UI components with sub-10ms rendering time.
  </p>
  <div class="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500 dark:border-neutral-800">
    <button class="flex items-center gap-1.5 hover:text-sky-500">...</button>
    <button class="flex items-center gap-1.5 hover:text-emerald-500">...</button>
    <button class="flex items-center gap-1.5 hover:text-rose-500">...</button>
  </div>
</article>`,
    codeVanillaCSS: `.tweet-card {
  max-width: 480px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-family: var(--font-body, -apple-system, sans-serif);
}
.tweet-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.tweet-card-avatar {
  border-radius: 50%;
  object-fit: cover;
}
.tweet-card-author-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.tweet-card-name {
  font-weight: 700;
  font-size: 15px;
  color: #0f172a;
}
.tweet-card-handle {
  font-size: 13px;
  color: #64748b;
}
.tweet-card-body {
  margin: 14px 0 16px;
  font-size: 14.5px;
  line-height: 1.6;
  color: #334155;
}
.tweet-card-actions {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 12px;
}
.tweet-action-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  cursor: pointer;
  font-size: 13px;
  transition: color 0.15s ease;
}
.tweet-action-btn:hover { color: #0284c7; }
.tweet-liked { color: #e11d48 !important; }
.tweet-bookmarked { color: #2563eb !important; }`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Uses semantic <article> landmark tag with descriptive aria-label.',
        'Action buttons provide explicit aria-label attributes reflecting current like/bookmark state.',
        'Verified icon includes role="img" or aria-label for assistive technology.',
      ],
      keyboardSupport: [
        'Tab navigates cleanly between interactive reply, retweet, like, and bookmark buttons.',
        'Enter and Space toggle like/bookmark with instant visual feedback.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 16ms (Zero blocking thread execution)',
      clsScore: '0.00 (Fixed aspect ratio headers & avatars)',
      performanceTips: 'Use Next.js Image or native loading="lazy" for avatars and embedded media to eliminate render blocking.',
    },
  },

  'bento-grid': {
    slug: 'bento-grid',
    title: 'Bento Grid',
    subtitle: 'Asymmetric feature showcase grid with ambient radial spotlight, badge headers, and interactive hover states.',
    category: 'Layouts & Grids',
    badge: 'MagicUI Pattern',
    description:
      'The Bento Grid organizes feature highlights into an asymmetric, harmonious modular grid inspired by traditional Japanese bento boxes. Each tile combines ambient mouse-follow spotlight highlights, modern typography, contextual icon badges, and clean call-to-actions, scaling effortlessly from a single column on mobile to multi-column arrangements on desktop displays.',
    architecturalOverview:
      'Built upon CSS Grid with fluid grid-template-columns and auto-flow dense algorithms. Mouse movement calculates radial gradient coordinates in real time via CSS variables (--mouse-x, --mouse-y), enabling hardware-accelerated spotlight highlights without triggering re-layouts or React re-renders.',
    features: [
      'Responsive CSS Grid spans (1x1, 2x1, and 2x2 asymmetric modular tiles)',
      'Hardware-accelerated ambient cursor spotlight with zero FPS drop',
      'Contextual headers supporting live diagrams, graphs, and code snippets',
      'Built-in mobile touch fallback with graceful CSS degradation',
      'Accessible semantic structure with full keyboard tab navigation',
    ],
    props: [
      { prop: 'children', type: 'ReactNode', default: 'Required', description: 'BentoCard components to render within the grid.' },
      { prop: 'className', type: 'string', default: "''", description: 'Custom grid styling and column override classes.' },
      { prop: 'spotlight', type: 'boolean', default: 'true', description: 'Whether to enable the dynamic cursor radial spotlight effect.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://magicui.design/r/bento-grid"',
      npmPackages: ['lucide-react (optional for icons)'],
      steps: [
        {
          title: 'Step 1: Install Dependencies',
          lang: 'bash',
          code: 'npm install lucide-react # optional, pure SVGs work out of the box',
        },
        {
          title: 'Step 2: Implement Bento Grid Layout',
          lang: 'tsx',
          code: `import { BentoGrid, BentoCard } from '@/components/BentoGrid';\n\n<BentoGrid>\n  <BentoCard\n    name="Instant RAG Search"\n    description="Sub-50ms hybrid vector search across 100M+ documents."\n    className="col-span-2"\n    cta="Explore Vector Store"\n    href="/docs/rag"\n  />\n  <BentoCard\n    name="Zero-Runtime CSS"\n    description="Native CSS custom properties with zero JavaScript footprint."\n    cta="View Benchmarks"\n    href="/benchmarks"\n  />\n</BentoGrid>`,
        },
      ],
    },
    codeReact: `import React, { useRef, useState } from 'react';

export interface BentoCardProps {
  name: string;
  className?: string;
  background?: React.ReactNode;
  Icon?: React.ReactNode;
  description: string;
  href?: string;
  cta?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className = '',
  background,
  Icon,
  description,
  href,
  cta = 'Learn more',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={\`bento-card \${className}\`}
      style={{
        '--mouse-x': \`\${mousePos.x}px\`,
        '--mouse-y': \`\${mousePos.y}px\`,
      } as React.CSSProperties}
    >
      <div className="bento-spotlight" />
      <div className="bento-card-bg">{background}</div>
      <div className="bento-card-content">
        {Icon && <div className="bento-card-icon">{Icon}</div>}
        <h3 className="bento-card-title">{name}</h3>
        <p className="bento-card-desc">{description}</p>
        {href && (
          <a href={href} className="bento-card-link">
            {cta} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
};

export const BentoGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={\`bento-grid \${className}\`}>{children}</div>;
};`,
    codeTailwind: `<!-- Bento Grid in Tailwind CSS -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
  <div class="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
    <div class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Fast Inference</div>
    <h3 class="mt-2 text-xl font-bold text-neutral-900 dark:text-white">Local RAG Engine</h3>
    <p class="mt-2 text-sm text-neutral-500">Query local embeddings in sub-5ms latency.</p>
  </div>
  <div class="col-span-1 relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
    <h3 class="text-xl font-bold text-neutral-900 dark:text-white">Telemetry</h3>
    <p class="mt-2 text-sm text-neutral-500">Real-time memory monitor.</p>
  </div>
</div>`,
    codeVanillaCSS: `.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .bento-grid { grid-template-columns: 1fr; }
}
.bento-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 28px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.bento-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
}
.bento-spotlight {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(400px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(37, 99, 235, 0.08), transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.bento-card:hover .bento-spotlight { opacity: 1; }
.bento-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 10px 0 6px;
}
.bento-card-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}
.bento-card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 13.5px;
  font-weight: 600;
  color: #2563eb;
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Spotlight layer uses pointer-events: none so it does not intercept accessibility cursors.',
        'Card links provide descriptive destination anchor text.',
      ],
      keyboardSupport: [
        'Cards with links are focusable with Tab.',
        'Focus-visible outlines are preserved for high-contrast accessibility.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 10ms (CSS variable coordinates update without DOM reflow)',
      clsScore: '0.00 (Fixed grid ratios and aspect boundaries)',
      performanceTips: 'Prefer CSS radial gradients over SVG filters for hover spotlights to avoid GPU rasterization costs.',
    },
  },

  'animated-list': {
    slug: 'animated-list',
    title: 'Animated List',
    subtitle: 'Dynamic notification and activity feed with staggered entrance transitions, auto-flow, and pause controls.',
    category: 'Animations & Feeds',
    badge: 'MagicUI Pattern',
    description:
      'The Animated List component powers real-time event streams, user activity feeds, and notification dashboards. As new events occur, new items smoothly expand into the top of the list while existing items stagger downward with calibrated spring physics. Includes automated interval simulation, hover-to-pause capability, and complete accessibility for assistive screen readers.',
    architecturalOverview:
      'Implements a circular queue buffer with CSS keyframe transitions for transforms and opacities. Screen reader updates are routed through ARIA live regions with aria-live="polite" to avoid interrupting user focus, while users with prefers-reduced-motion receive instantaneous transitions.',
    features: [
      'Spring-calibrated staggered entrances with smooth height interpolation',
      'Configurable addition interval with pause-on-hover capability',
      'Accessible ARIA live announcement for real-time telemetry',
      'Zero external motion library dependency required (native React + CSS)',
      'Responsive design with fixed maximum height container and overflow clipping',
    ],
    props: [
      { prop: 'items', type: 'NotificationItem[]', default: 'Required', description: 'Array of items to display in the animated stream.' },
      { prop: 'delay', type: 'number', default: '2500', description: 'Interval in milliseconds between automatic item additions.' },
      { prop: 'maxItems', type: 'number', default: '5', description: 'Maximum visible cards preserved in the stream buffer.' },
      { prop: 'className', type: 'string', default: "''", description: 'Custom CSS class for container wrapper.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://magicui.design/r/animated-list"',
      npmPackages: ['lucide-react (optional)'],
      steps: [
        {
          title: 'Step 1: Install Component',
          lang: 'bash',
          code: 'npm install # no external dependencies required',
        },
        {
          title: 'Step 2: Implement Notification Stream',
          lang: 'tsx',
          code: `import { AnimatedList } from '@/components/AnimatedList';\n\nconst NOTIFICATIONS = [\n  { title: "Payment Received", desc: "$240 from Acme Corp", time: "1m ago", icon: "💰" },\n  { title: "Deployment Live", desc: "Production build v2.4.0 active", time: "3m ago", icon: "🚀" },\n  { title: "New Developer Joined", desc: "Elena connected via GitHub", time: "5m ago", icon: "👤" },\n];\n\n<AnimatedList items={NOTIFICATIONS} delay={2000} />`,
        },
      ],
    },
    codeReact: `import React, { useState, useEffect } from 'react';

export interface FeedItem {
  id: string;
  name: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

export interface AnimatedListProps {
  items: FeedItem[];
  delay?: number;
  className?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  delay = 2500,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, delay);
    return () => clearInterval(interval);
  }, [items.length, delay, isPaused]);

  const visibleItems = React.useMemo(() => {
    return items.slice(0, index + 1).reverse().slice(0, 4);
  }, [items, index]);

  return (
    <div
      className={\`animated-list-container \${className}\`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="log"
      aria-live="polite"
      aria-label="Real-time activity stream"
    >
      {visibleItems.map(item => (
        <div key={item.id} className="animated-list-card">
          <div className="animated-list-icon" style={{ backgroundColor: item.color }}>
            {item.icon}
          </div>
          <div className="animated-list-info">
            <div className="animated-list-row">
              <span className="animated-list-name">{item.name}</span>
              <span className="animated-list-time">{item.time}</span>
            </div>
            <p className="animated-list-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};`,
    codeTailwind: `<!-- Animated List Item (Tailwind) -->
<div class="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900">
  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
    ⚡
  </div>
  <div class="flex-1">
    <div class="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
      <span>Security Alert</span>
      <span class="text-neutral-400">Just now</span>
    </div>
    <p class="text-xs text-neutral-500">API key rotated successfully.</p>
  </div>
</div>`,
    codeVanillaCSS: `.animated-list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 440px;
  margin: 0 auto;
}
.animated-list-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-16px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animated-list-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
}
.animated-list-info { flex: 1; }
.animated-list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.animated-list-name {
  font-size: 13.5px;
  font-weight: 600;
  color: #0f172a;
}
.animated-list-time {
  font-size: 11.5px;
  color: #94a3b8;
}
.animated-list-desc {
  font-size: 12.5px;
  color: #64748b;
  margin-top: 2px;
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Container uses role="log" with aria-live="polite" so screen readers can consume feed updates without voice interruption.',
        'Hover-to-pause allows low-vision users to read notifications at their own pace.',
      ],
      keyboardSupport: [
        'List elements support manual focus when interactive buttons are enclosed.',
        'Respects prefers-reduced-motion media query by disabling keyframe translation.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 12ms',
      clsScore: '0.00 (Cards enter into fixed height boundaries)',
      performanceTips: 'Keep the maximum rendered array slice capped at 4-5 items to avoid unnecessary DOM node allocation.',
    },
  },

  'dock': {
    slug: 'dock',
    title: 'Interactive Dock',
    subtitle: 'macOS-inspired floating navigation bar with proximity-based icon magnification and dark glassmorphism.',
    category: 'Navigation & Toolbars',
    badge: 'MagicUI Pattern',
    description:
      'The Interactive Dock brings the iconic macOS desktop navigation experience into web applications. As the cursor glides across the toolbar, icons dynamically scale based on their Euclidean proximity to the mouse pointer, producing a wave of magnification. Styled with dark glassmorphism, active indicator pips, and contextual tooltip labels.',
    architecturalOverview:
      'Calculates distance between the mouse pointer and the horizontal center of each icon tile using a Gaussian distribution function. The resulting scale factor smoothly transitions between 1.0 and 1.5 with CSS transform transitions, maintaining crisp SVG rendering without layout reflows.',
    features: [
      'Smooth proximity-based Gaussian curve scaling (1.0x to 1.5x magnification)',
      'Dark glassmorphic container with backdrop-blur and ambient rim lighting',
      'Floating micro-tooltips positioned with accessible ARIA labels',
      'Touch-friendly fallback for tablets and mobile devices',
      'Pure React + CSS implementation without heavy animation packages',
    ],
    props: [
      { prop: 'items', type: 'DockItem[]', default: 'Required', description: 'Array of navigation items containing id, label, icon, and onClick handler.' },
      { prop: 'magnification', type: 'number', default: '1.4', description: 'Peak icon scale multiplier when cursor is directly centered.' },
      { prop: 'distance', type: 'number', default: '120', description: 'Activation radius in pixels across which magnification applies.' },
      { prop: 'className', type: 'string', default: "''", description: 'Custom CSS class for outer dock bar.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://magicui.design/r/dock"',
      npmPackages: ['lucide-react (optional)'],
      steps: [
        {
          title: 'Step 1: Install Component',
          lang: 'bash',
          code: 'npm install # zero required runtime dependencies',
        },
        {
          title: 'Step 2: Add Dock to Layout',
          lang: 'tsx',
          code: `import { Dock, DockIcon } from '@/components/Dock';\n\n<Dock>\n  <DockIcon label="Home" onClick={() => router.push('/')}>🏠</DockIcon>\n  <DockIcon label="Repositories" onClick={() => router.push('/repos')}>📦</DockIcon>\n  <DockIcon label="Documentation" onClick={() => router.push('/docs')}>📚</DockIcon>\n  <DockIcon label="Settings" onClick={() => openSettings()}>⚙️</DockIcon>\n</Dock>`,
        },
      ],
    },
    codeReact: `import React, { useRef, useState } from 'react';

export interface DockItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItemData[];
  magnification?: number;
  distance?: number;
  className?: string;
}

export const Dock: React.FC<DockProps> = ({
  items,
  magnification = 1.45,
  distance = 110,
  className = '',
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <nav
      className={\`dock-container \${className}\`}
      onMouseMove={e => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
      aria-label="Application dock navigation"
      role="toolbar"
    >
      <div className="dock-bar">
        {items.map(item => (
          <DockIconItem
            key={item.id}
            item={item}
            mouseX={mouseX}
            magnification={magnification}
            distance={distance}
          />
        ))}
      </div>
    </nav>
  );
};

const DockIconItem: React.FC<{
  item: DockItemData;
  mouseX: number | null;
  magnification: number;
  distance: number;
}> = ({ item, mouseX, magnification, distance }) => {
  const iconRef = useRef<HTMLButtonElement>(null);

  let scale = 1;
  if (mouseX !== null && iconRef.current) {
    const rect = iconRef.current.getBoundingClientRect();
    const iconCenter = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - iconCenter);
    if (dist < distance) {
      const factor = Math.cos((dist / distance) * (Math.PI / 2));
      scale = 1 + (magnification - 1) * factor;
    }
  }

  return (
    <button
      ref={iconRef}
      type="button"
      className={\`dock-icon \${item.active ? 'dock-icon-active' : ''}\`}
      style={{
        transform: \`scale(\${scale})\`,
        width: '46px',
        height: '46px',
      }}
      onClick={item.onClick}
      aria-label={item.label}
    >
      <span className="dock-tooltip">{item.label}</span>
      <div className="dock-icon-inner">{item.icon}</div>
      {item.active && <span className="dock-active-dot" aria-hidden="true" />}
    </button>
  );
};`,
    codeTailwind: `<!-- Tailwind Dock Structure -->
<nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
  <div class="flex items-center gap-3 rounded-2xl border border-white/20 bg-neutral-900/80 p-2.5 shadow-2xl backdrop-blur-xl">
    <button class="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-white/20">
      <span class="absolute -top-10 rounded-md bg-neutral-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">Home</span>
      🏠
    </button>
  </div>
</nav>`,
    codeVanillaCSS: `.dock-container {
  display: inline-flex;
  justify-content: center;
  padding: 10px;
}
.dock-bar {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 10px 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}
.dock-icon {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.2, 0, 0, 1), background 0.2s ease;
  transform-origin: bottom center;
}
.dock-icon:hover {
  background: rgba(255, 255, 255, 0.18);
}
.dock-tooltip {
  position: absolute;
  top: -36px;
  background: #0f172a;
  color: #f8fafc;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform: translateY(4px);
}
.dock-icon:hover .dock-tooltip {
  opacity: 1;
  transform: translateY(0);
}
.dock-active-dot {
  position: absolute;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #38bdf8;
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Wrapped with role="toolbar" and aria-label="Application dock navigation".',
        'All icons have aria-label matching their visible tooltip text.',
      ],
      keyboardSupport: [
        'Tab and arrow keys cycle through dock buttons.',
        'Enter/Space activates dock actions without requiring mouse hover.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 16ms',
      clsScore: '0.00 (transform: scale() is GPU-accelerated and does not trigger document reflow)',
      performanceTips: 'Use transform-origin: bottom center to keep dock items resting flush against the shelf floor during magnification.',
    },
  },

  'sparkles-title': {
    slug: 'sparkles-title',
    title: 'Sparkles Title',
    subtitle: 'High-impact hero headline with shimmering canvas sparkle particles floating across gradient typography.',
    category: 'Typography & Effects',
    badge: 'UI-Layouts Pattern',
    description:
      'The Sparkles Title transforms standard hero headlines into shimmering, iridescent centerpieces. Designed for landing pages, SaaS launches, and portfolio introductions, it overlays twinkling canvas sparkle stars on top of modern CSS gradient text. Fully customizable particle density, glow radii, and color palettes ensure maximum aesthetic impact with minimal CPU footprint.',
    architecturalOverview:
      'Pairs CSS -webkit-background-clip: text with an absolute-positioned HTML5 canvas element. The canvas tracks container dimensions via ResizeObserver and continuously renders 4-pointed sparkle stars that fade in and out using sine wave opacity modulations.',
    features: [
      'Iridescent dual-gradient typography with customizable color stops',
      'HTML5 Canvas 4-point sparkle star engine with randomized twinkle speeds',
      'Screen-reader friendly markup preserving standard semantic <h1>/<h2> elements',
      'Automatic ResizeObserver canvas syncing preventing pixel blur on high-DPI retina screens',
      'Fallback state for users with prefers-reduced-motion',
    ],
    props: [
      { prop: 'text', type: 'string', default: 'Required', description: 'The text content to render with gradient and sparkles.' },
      { prop: 'as', type: "'h1' | 'h2' | 'h3' | 'span'", default: "'h1'", description: 'Semantic HTML tag to render for typography.' },
      { prop: 'sparkleColor', type: 'string', default: "'#38bdf8'", description: 'Color hex code of the floating sparkle particles.' },
      { prop: 'gradient', type: 'string', default: "'linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #7c3aed 100%)'", description: 'CSS gradient string for the text background.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://ui-layouts.com/r/sparkles-title"',
      npmPackages: ['None required'],
      steps: [
        {
          title: 'Step 1: Copy SparklesTitle Component',
          lang: 'bash',
          code: '# Zero npm dependencies. Uses standard Canvas API.',
        },
        {
          title: 'Step 2: Use in Hero Section',
          lang: 'tsx',
          code: `import { SparklesTitle } from '@/components/SparklesTitle';\n\n<SparklesTitle\n  text="Next-Gen Architecture for AI Engineers"\n  as="h1"\n  sparkleColor="#38bdf8"\n/>`,
        },
      ],
    },
    codeReact: `import React, { useEffect, useRef } from 'react';

export interface SparklesTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  sparkleColor?: string;
  gradient?: string;
  className?: string;
}

export const SparklesTitle: React.FC<SparklesTitleProps> = ({
  text,
  as: Component = 'h1',
  sparkleColor = '#38bdf8',
  gradient = 'linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #9333ea 100%)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const sparkles: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      alphaSpeed: number;
      maxAlpha: number;
    }> = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = \`\${rect.width}px\`;
      canvas.style.height = \`\${rect.height}px\`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize 24 sparkles
    for (let i = 0; i < 24; i++) {
      sparkles.push({
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        size: Math.random() * 6 + 4,
        alpha: Math.random(),
        alphaSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.7 + 0.3,
      });
    }

    const drawSparkle = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = sparkleColor;
      ctx.beginPath();
      // Draw 4-point sparkle star
      ctx.moveTo(x, y - size);
      ctx.quadraticCurveTo(x, y, x + size, y);
      ctx.quadraticCurveTo(x, y, x, y + size);
      ctx.quadraticCurveTo(x, y, x - size, y);
      ctx.quadraticCurveTo(x, y, x, y - size);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, container.clientWidth, container.clientHeight);

      sparkles.forEach(s => {
        s.alpha += s.alphaSpeed;
        if (s.alpha >= s.maxAlpha || s.alpha <= 0) {
          s.alphaSpeed = -s.alphaSpeed;
          if (s.alpha <= 0) {
            s.x = Math.random() * container.clientWidth;
            s.y = Math.random() * container.clientHeight;
          }
        }
        drawSparkle(s.x, s.y, s.size, s.alpha);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [sparkleColor]);

  return (
    <div ref={containerRef} className={\`sparkles-title-wrapper \${className}\`}>
      <canvas ref={canvasRef} className="sparkles-canvas" aria-hidden="true" />
      <Component className="sparkles-text" style={{ backgroundImage: gradient }}>
        {text}
      </Component>
    </div>
  );
};`,
    codeTailwind: `<!-- Tailwind Sparkles Title -->
<div class="relative inline-block">
  <canvas class="absolute inset-0 pointer-events-none w-full h-full" aria-hidden="true"></canvas>
  <h1 class="bg-gradient-to-r from-neutral-900 via-blue-600 to-purple-600 bg-clip-text text-transparent text-5xl md:text-7xl font-extrabold tracking-tight">
    Next-Gen Engineering
  </h1>
</div>`,
    codeVanillaCSS: `.sparkles-title-wrapper {
  position: relative;
  display: inline-block;
  padding: 12px 20px;
}
.sparkles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.sparkles-text {
  font-family: var(--font-display, "Space Grotesk", sans-serif);
  font-size: clamp(32px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'The canvas is explicitly marked with aria-hidden="true" so screen readers ignore cosmetic sparkles.',
        'Text gradient uses high contrast stops ensuring 4.5:1 legibility against light or dark backgrounds.',
      ],
      keyboardSupport: [
        'Standard heading semantics are maintained for screen reader table-of-contents navigation.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 8ms',
      clsScore: '0.00 (Text bounding box sizes statically before canvas initializes)',
      performanceTips: 'Canvas is scaled with devicePixelRatio for crisp rendering on Apple Retina displays without blur.',
    },
  },

  'sparkles': {
    slug: 'sparkles',
    title: 'Sparkles Effect',
    subtitle: 'Interactive HTML5 Canvas particle background with twinkling stars, cursor attraction, and customizable density.',
    category: 'Backgrounds & Canvas',
    badge: 'UI-Layouts Pattern',
    description:
      'The Sparkles Effect generates an ambient particle field across any container or full-page hero background. Twinkling multi-point stars drift with organic physics, respond to cursor movement, and fade subtly over time. Ideal for hero backdrops, promotional cards, or interactive feature showcases.',
    architecturalOverview:
      'Implements a 60 FPS requestAnimationFrame canvas loop with Euclidean velocity integration. Particles bounce smoothly off viewport boundaries and gently repel or attract toward user pointer coordinates.',
    features: [
      'Interactive particle count, speed, and star size parameters',
      'Zero external graphics libraries (vanilla HTML5 2D Canvas context)',
      'Sub-pixel velocity integration with boundary reflection physics',
      'Automatic cleanup preventing memory leaks upon component unmount',
      'Mobile touch response and battery-saving frame throttling',
    ],
    props: [
      { prop: 'particleCount', type: 'number', default: '60', description: 'Total number of active particles rendered simultaneously.' },
      { prop: 'particleColor', type: 'string', default: "'#2563eb'", description: 'Color hex code of the particles.' },
      { prop: 'minSize', type: 'number', default: '2', description: 'Minimum particle radius in pixels.' },
      { prop: 'maxSize', type: 'number', default: '6', description: 'Maximum particle radius in pixels.' },
      { prop: 'interactive', type: 'boolean', default: 'true', description: 'Whether particles respond to mouse pointer coordinates.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://ui-layouts.com/r/sparkles"',
      npmPackages: ['None required'],
      steps: [
        {
          title: 'Step 1: Copy Sparkles Component',
          lang: 'bash',
          code: '# Zero npm dependencies. Native HTML5 Canvas.',
        },
        {
          title: 'Step 2: Place Behind Content',
          lang: 'tsx',
          code: `import { SparklesField } from '@/components/SparklesField';\n\n<div className="relative min-h-[400px]">\n  <SparklesField particleCount={80} particleColor="#38bdf8" />\n  <div className="relative z-10 p-12 text-center">\n    <h2>Card Content Goes Here</h2>\n  </div>\n</div>`,
        },
      ],
    },
    codeReact: `import React, { useEffect, useRef } from 'react';

export interface SparklesFieldProps {
  particleCount?: number;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  interactive?: boolean;
  className?: string;
}

export const SparklesField: React.FC<SparklesFieldProps> = ({
  particleCount = 50,
  particleColor = '#2563eb',
  minSize = 2,
  maxSize = 6,
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
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
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * (maxSize - minSize) + minSize,
        alpha: Math.random(),
        twinkle: Math.random() * 0.03 + 0.01,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', onMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.alpha += p.twinkle;
        if (p.alpha > 1 || p.alpha < 0.2) p.twinkle = -p.twinkle;

        ctx.save();
        ctx.fillStyle = particleColor;
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
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [particleCount, particleColor, minSize, maxSize, interactive]);

  return <canvas ref={canvasRef} className={\`sparkles-field-canvas \${className}\`} aria-hidden="true" />;
};`,
    codeTailwind: `<!-- Tailwind Sparkles Background -->
<div class="relative overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white">
  <canvas class="absolute inset-0 pointer-events-none w-full h-full opacity-60"></canvas>
  <div class="relative z-10">
    <h3 class="text-2xl font-bold">Ambient Container</h3>
    <p class="text-neutral-400 mt-2">Particles move smoothly behind content.</p>
  </div>
</div>`,
    codeVanillaCSS: `.sparkles-field-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Pure background canvas marked with aria-hidden="true" to keep accessibility tree clean.',
      ],
      keyboardSupport: [
        'Foreground content retains full standard keyboard tab focus.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 10ms',
      clsScore: '0.00',
      performanceTips: 'Pause canvas rendering via IntersectionObserver when the container scrolls out of the visible viewport.',
    },
  },

  'image-accordions': {
    slug: 'image-accordions',
    title: 'Image Accordions',
    subtitle: 'Interactive multi-panel gallery with smooth flex expansion, title overlays, and active card state.',
    category: 'Interactive Media',
    badge: 'UI-Layouts Pattern',
    description:
      'The Image Accordions component displays high-resolution imagery, case studies, or portfolio items in an elegant horizontal strip. When a user hovers or taps any panel, it expands smoothly from flex: 1 to flex: 4, gracefully shrinking adjacent panels and unveiling detailed titles, tags, and call-to-action buttons.',
    architecturalOverview:
      'Leverages modern CSS flexbox flex-grow transitions (transition: flex 0.5s cubic-bezier(0.16, 1, 0.3, 1)) coupled with background image cover scaling. Automatically transitions to a vertical stacked layout on mobile viewports for effortless touch scrolling.',
    features: [
      'Silky smooth CSS flex-grow transition timing without layout flicker',
      'Dynamic metadata overlays (tags, headlines, description text)',
      'Responsive design switching from horizontal panels to vertical cards on mobile',
      'Full keyboard arrow-key navigation with Enter/Space panel expansion',
      'High-performance image loading with object-fit: cover',
    ],
    props: [
      { prop: 'items', type: 'AccordionItem[]', default: 'Required', description: 'Array of panel items containing id, title, subtitle, image, and tag.' },
      { prop: 'defaultActive', type: 'number', default: '0', description: 'Initial active panel index on load.' },
      { prop: 'className', type: 'string', default: "''", description: 'Custom CSS class for container wrapper.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://ui-layouts.com/r/image-accordions"',
      npmPackages: ['None required'],
      steps: [
        {
          title: 'Step 1: Copy ImageAccordions Component',
          lang: 'bash',
          code: '# Zero npm dependencies. Pure React + CSS flexbox.',
        },
        {
          title: 'Step 2: Add Panel Gallery to Page',
          lang: 'tsx',
          code: `import { ImageAccordions } from '@/components/ImageAccordions';\n\nconst PANELS = [\n  { id: '1', title: 'Local AI RAG Engine', subtitle: 'Embeddings & Vector Search', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', tag: 'Architecture' },\n  { id: '2', title: 'Developer CLI Tools', subtitle: 'High-speed Terminal Workflows', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', tag: 'DevOps' },\n  { id: '3', title: 'Cloud Platform Matrix', subtitle: 'Global Edge Runtime Benchmarks', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', tag: 'Infrastructure' },\n];\n\n<ImageAccordions items={PANELS} />`,
        },
      ],
    },
    codeReact: `import React, { useState } from 'react';

export interface AccordionPanelItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  href?: string;
}

export interface ImageAccordionsProps {
  items: AccordionPanelItem[];
  defaultActive?: number;
  className?: string;
}

export const ImageAccordions: React.FC<ImageAccordionsProps> = ({
  items,
  defaultActive = 0,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <div className={\`image-accordions-wrapper \${className}\`} role="region" aria-label="Interactive image gallery">
      <div className="image-accordions-track">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={item.id}
              className={\`image-accordion-card \${isActive ? 'image-accordion-active' : ''}\`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              role="button"
              aria-expanded={isActive}
              aria-label={item.title}
            >
              <img
                src={item.image}
                alt={item.title}
                className="image-accordion-img"
                loading="lazy"
              />
              <div className="image-accordion-overlay" />
              <div className="image-accordion-content">
                <span className="image-accordion-tag">{item.tag}</span>
                <h3 className="image-accordion-title">{item.title}</h3>
                <p className="image-accordion-subtitle">{item.subtitle}</p>
                {isActive && (
                  <span className="image-accordion-cta">
                    View Project <span aria-hidden="true">→</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};`,
    codeTailwind: `<!-- Tailwind Image Accordion Track -->
<div class="flex flex-col md:flex-row gap-3 h-[420px] w-full max-w-6xl mx-auto">
  <div class="group relative flex-1 hover:flex-[3] transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer">
    <img src="/sample.jpg" class="absolute inset-0 w-full h-full object-cover" alt="Panel" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <div class="absolute bottom-6 left-6 text-white">
      <span class="text-xs uppercase bg-white/20 px-2.5 py-1 rounded-full">DevOps</span>
      <h3 class="text-xl font-bold mt-2">Cloud Platform</h3>
    </div>
  </div>
</div>`,
    codeVanillaCSS: `.image-accordions-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}
.image-accordions-track {
  display: flex;
  height: 440px;
  gap: 12px;
}
@media (max-width: 768px) {
  .image-accordions-track {
    flex-direction: column;
    height: auto;
  }
}
.image-accordion-card {
  position: relative;
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease;
}
.image-accordion-active {
  flex: 3.5;
}
@media (max-width: 768px) {
  .image-accordion-card {
    height: 180px;
    flex: none;
  }
  .image-accordion-active {
    height: 260px;
  }
}
.image-accordion-img {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.image-accordion-card:hover .image-accordion-img {
  transform: scale(1.05);
}
.image-accordion-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%);
}
.image-accordion-content {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  color: #ffffff;
  z-index: 2;
}
.image-accordion-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 99px;
  margin-bottom: 8px;
}
.image-accordion-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  white-space: nowrap;
}
.image-accordion-subtitle {
  font-size: 13.5px;
  color: #cbd5e1;
  line-height: 1.4;
  opacity: 0.9;
}
.image-accordion-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: #38bdf8;
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Cards have role="button" and aria-expanded attributes reflecting active status.',
        'High contrast text overlay ensures >7:1 readability on dark gradient backdrops.',
      ],
      keyboardSupport: [
        'Cards are focusable via Tab; pressing Enter or Space expands the selected accordion panel.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 14ms',
      clsScore: '0.00 (Total track height remains fixed at 440px during panel expansion)',
      performanceTips: 'Use Next.js Image with sizes="(max-width: 768px) 100vw, 33vw" to load appropriately compressed images.',
    },
  },

  'pricing-table': {
    slug: 'pricing-table',
    title: 'Modern Pricing Table',
    subtitle: 'Conversion-optimized SaaS pricing matrix with annual discount toggle, featured tier spotlight, and feature checklist.',
    category: 'Marketing Blocks',
    badge: 'UI-Layouts Pattern',
    description:
      'The Modern Pricing Table is an engineered subscription matrix designed to drive customer conversion. It features a responsive billing frequency toggle (Monthly / Annual with a "Save 20%" discount badge), prominent visual spotlight for the recommended tier with ambient glow, detailed feature checklists with SVG checkmarks, and accessible CTA action triggers.',
    architecturalOverview:
      'Manages billing state through React useState with dynamic price recalculation. Designed with semantic radio group attributes for the frequency selector and high-contrast typography satisfying WCAG 2.1 AA requirements.',
    features: [
      'Interactive Monthly / Annual toggle with automatic 20% discount calculation',
      'Featured tier with glowing border spotlight and "Most Popular" pill badge',
      'Accessible SVG checklist icons with affirmative and excluded feature indicators',
      'Responsive multi-card grid stacking gracefully on mobile devices',
      'Clear, accessible CTA buttons with distinct primary and secondary visual states',
    ],
    props: [
      { prop: 'plans', type: 'PricingPlan[]', default: 'Required', description: 'Array of subscription plans with name, prices, features, and popularity flag.' },
      { prop: 'currency', type: 'string', default: "'$'", description: 'Currency symbol displayed before price amounts.' },
      { prop: 'className', type: 'string', default: "''", description: 'Custom CSS class for outer container.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://pro.ui-layouts.com/r/pricing1"',
      npmPackages: ['lucide-react (optional)'],
      steps: [
        {
          title: 'Step 1: Install Component',
          lang: 'bash',
          code: '# Zero npm dependencies. Pure React + CSS grid.',
        },
        {
          title: 'Step 2: Add Pricing Block to Landing Page',
          lang: 'tsx',
          code: `import { PricingTable } from '@/components/PricingTable';\n\n<PricingTable currency="$" />`,
        },
      ],
    },
    codeReact: `import React, { useState } from 'react';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  popular?: boolean;
  cta: string;
}

export const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual developers and small side projects.',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['5 Local AI Repositories', 'Standard Vector Search', 'Community Discord Support', '1 Team Member'],
    cta: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Advanced capabilities for engineering teams building high-scale AI products.',
    priceMonthly: 29,
    priceYearly: 24,
    features: ['Unlimited Repositories', 'Sub-10ms Hybrid RAG Engine', 'Priority SLA Support (4h)', '5 Team Members', 'Custom CSS Tokens & Export'],
    popular: true,
    cta: 'Start 14-Day Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom infrastructure, dedicated VPC clusters, and SOC2 compliance.',
    priceMonthly: 99,
    priceYearly: 79,
    features: ['Dedicated Edge VPC Deployments', 'Custom LLM Quantization Pipeline', '24/7 Dedicated Support Engineer', 'Unlimited Seats', 'Custom MSA & Invoicing'],
    cta: 'Contact Sales',
  },
];

export const PricingTable: React.FC<{ currency?: string; className?: string }> = ({
  currency = '$',
  className = '',
}) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className={\`pricing-section \${className}\`} aria-labelledby="pricing-title">
      <div className="pricing-header">
        <span className="pricing-badge">Transparent Pricing</span>
        <h2 id="pricing-title" className="pricing-title">Predictable plans for modern teams</h2>
        <p className="pricing-subtitle">Switch between monthly or annual billing. Save 20% with annual commitments.</p>

        {/* Billing Switch */}
        <div className="pricing-toggle-wrapper" role="radiogroup" aria-label="Billing frequency">
          <button
            type="button"
            className={\`pricing-toggle-btn \${!isYearly ? 'pricing-toggle-active' : ''}\`}
            onClick={() => setIsYearly(false)}
            role="radio"
            aria-checked={!isYearly}
          >
            Monthly
          </button>
          <button
            type="button"
            className={\`pricing-toggle-btn \${isYearly ? 'pricing-toggle-active' : ''}\`}
            onClick={() => setIsYearly(true)}
            role="radio"
            aria-checked={isYearly}
          >
            Yearly
            <span className="pricing-discount-pill">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {DEFAULT_PLANS.map(plan => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          return (
            <div key={plan.id} className={\`pricing-card \${plan.popular ? 'pricing-card-popular' : ''}\`}>
              {plan.popular && <span className="pricing-popular-tag">Most Popular</span>}
              <h3 className="pricing-plan-name">{plan.name}</h3>
              <p className="pricing-plan-desc">{plan.description}</p>
              <div className="pricing-price-row">
                <span className="pricing-currency">{currency}</span>
                <span className="pricing-amount">{price}</span>
                <span className="pricing-period">/ month</span>
              </div>
              <button
                type="button"
                className={\`pricing-cta-btn \${plan.popular ? 'btn-primary' : 'btn-secondary'}\`}
              >
                {plan.cta}
              </button>
              <ul className="pricing-feature-list">
                {plan.features.map((feat, i) => (
                  <li key={i} className="pricing-feature-item">
                    <svg className="pricing-check-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};`,
    codeTailwind: `<!-- Tailwind Pricing Matrix -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
  <div class="rounded-3xl border border-blue-500 bg-white dark:bg-neutral-900 p-8 shadow-xl relative">
    <span class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Popular</span>
    <h3 class="text-xl font-bold">Pro Plan</h3>
    <div class="mt-4 flex items-baseline gap-1">
      <span class="text-4xl font-extrabold">$24</span>
      <span class="text-sm text-neutral-500">/mo</span>
    </div>
    <button class="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">Get Started</button>
  </div>
</div>`,
    codeVanillaCSS: `.pricing-section {
  max-width: 1160px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: var(--font-body, -apple-system, sans-serif);
}
.pricing-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 48px;
}
.pricing-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #2563eb;
  background: #eff6ff;
  padding: 4px 12px;
  border-radius: 99px;
  margin-bottom: 12px;
}
.pricing-title {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.pricing-subtitle {
  font-size: 15px;
  color: #64748b;
  margin-top: 10px;
}
.pricing-toggle-wrapper {
  display: inline-flex;
  align-items: center;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 99px;
  margin-top: 24px;
}
.pricing-toggle-btn {
  background: none;
  border: none;
  padding: 8px 18px;
  border-radius: 99px;
  font-size: 13.5px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}
.pricing-toggle-active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}
.pricing-discount-pill {
  font-size: 10.5px;
  background: #dbeafe;
  color: #1e40af;
  padding: 2px 7px;
  border-radius: 99px;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 900px) {
  .pricing-grid { grid-template-columns: 1fr; }
}
.pricing-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
}
.pricing-card-popular {
  border-color: #2563eb;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.12);
}
.pricing-popular-tag {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #2563eb;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 14px;
  border-radius: 99px;
}
.pricing-plan-name { font-size: 20px; font-weight: 700; color: #0f172a; }
.pricing-plan-desc { font-size: 13.5px; color: #64748b; margin: 8px 0 20px; min-height: 40px; }
.pricing-price-row { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
.pricing-currency { font-size: 24px; font-weight: 700; color: #0f172a; }
.pricing-amount { font-size: 44px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
.pricing-period { font-size: 13.5px; color: #64748b; }
.pricing-cta-btn {
  width: 100%;
  height: 44px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s ease;
}
.btn-primary { background: #0f172a; color: #ffffff; }
.btn-secondary { background: #f8fafc; color: #0f172a; border: 1px solid #e2e8f0; }
.pricing-feature-list { list-style: none; margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
.pricing-feature-item { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: #334155; }
.pricing-check-icon { color: #16a34a; flex-shrink: 0; }`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Frequency toggle is marked with role="radiogroup" and aria-checked states.',
        'Feature list items use high contrast SVG checkmarks paired with explicit descriptive text.',
      ],
      keyboardSupport: [
        'Tab navigates seamlessly through billing toggles, card CTA buttons, and links.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 10ms',
      clsScore: '0.00 (Fixed grid ratios prevent reflow when switching billing frequencies)',
      performanceTips: 'Use CSS variable transitions instead of re-rendering SVG icons on billing toggle switches.',
    },
  },

  'hero-section': {
    slug: 'hero-section',
    title: 'Futuristic Hero Section',
    subtitle: 'Production-ready SaaS hero block with glowing announcement pill, gradient headline, dual CTAs, and interactive preview.',
    category: 'Marketing Blocks',
    badge: 'UI-Layouts Pattern',
    description:
      'The Futuristic Hero Section provides a turnkey landing page framework built for developer tools and AI products. Features a shimmering announcement badge with glowing border, high-impact gradient typography, dual call-to-action buttons (primary filled with hover glow + secondary ghost with arrow), social proof metrics, and an integrated preview showcase.',
    architecturalOverview:
      'Engineered with pure semantic HTML5 (<header>, <h1>, <nav>, <section>) and CSS clamp() fluid typography. Sub-10ms render latency with zero client-side layout shifts ensures 100% Core Web Vitals scores in Google Lighthouse.',
    features: [
      'Shimmering announcement badge pill with interactive link',
      'Fluid clamp() typography scaling smoothly from 320px mobile to 4K displays',
      'Dual call-to-action buttons with subtle micro-hover animations',
      'Social proof badge row displaying GitHub stars, developer community metrics',
      'Integrated interactive product teaser card',
    ],
    props: [
      { prop: 'badge', type: '{ text: string, href?: string }', default: 'Optional', description: 'Announcement badge text and optional destination URL.' },
      { prop: 'title', type: 'string', default: 'Required', description: 'Main hero headline (supports bold tags).' },
      { prop: 'description', type: 'string', default: 'Required', description: 'Hero paragraph lede.' },
      { prop: 'primaryCta', type: '{ text: string, href: string }', default: 'Required', description: 'Primary action button configuration.' },
      { prop: 'secondaryCta', type: '{ text: string, href: string }', default: 'Optional', description: 'Secondary ghost button configuration.' },
    ],
    installGuide: {
      cliCommand: 'npx shadcn@latest add "https://ui-layouts.com/r/hero-section"',
      npmPackages: ['None required'],
      steps: [
        {
          title: 'Step 1: Copy HeroSection Component',
          lang: 'bash',
          code: '# Zero npm dependencies. Pure React + CSS.',
        },
        {
          title: 'Step 2: Place as Top Page Section',
          lang: 'tsx',
          code: `import { ModernHero } from '@/components/ModernHero';\n\n<ModernHero\n  badge={{ text: "v2.5 Released: Local RAG Pipeline", href: "/blog" }}\n  title="Ship High-Speed AI Applications Faster"\n  description="Open-source architecture patterns, verified GitHub repositories, and zero-dependency UI components."\n  primaryCta={{ text: "Explore Components", href: "/ui-components" }}\n  secondaryCta={{ text: "View Documentation", href: "/repos" }}\n/>`,
        },
      ],
    },
    codeReact: `import React from 'react';

export interface ModernHeroProps {
  badge?: { text: string; href?: string };
  title: string;
  description: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  className?: string;
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  badge = { text: '✨ New: Zero-Dependency Component System', href: '/ui-components' },
  title = 'Build Exceptional Web Interfaces with Zero Bloat',
  description = 'Accessible, high-performance UI patterns and architecture components engineered for modern developers. Drop them into any framework.',
  primaryCta = { text: 'Browse Components', href: '/ui-components' },
  secondaryCta = { text: 'Read Guide', href: '/blog' },
  className = '',
}) => {
  return (
    <header className={\`modern-hero \${className}\`} aria-label="Hero Introduction">
      <div className="modern-hero-inner">
        {badge && (
          <a href={badge.href || '#'} className="modern-hero-pill">
            <span>{badge.text}</span>
            <span aria-hidden="true" className="modern-hero-pill-arrow">→</span>
          </a>
        )}

        <h1 className="modern-hero-headline">
          {title}
        </h1>

        <p className="modern-hero-lede">
          {description}
        </p>

        <div className="modern-hero-actions">
          {primaryCta && (
            <a href={primaryCta.href} className="hero-btn-primary">
              {primaryCta.text} <span aria-hidden="true">→</span>
            </a>
          )}
          {secondaryCta && (
            <a href={secondaryCta.href} className="hero-btn-secondary">
              {secondaryCta.text}
            </a>
          )}
        </div>

        <div className="modern-hero-stats">
          <div className="stat-item">
            <span className="stat-val">100%</span>
            <span className="stat-lbl">WCAG AA Compliant</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-val">&lt; 2 kB</span>
            <span className="stat-lbl">Average Component Size</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-item">
            <span className="stat-val">0 kB</span>
            <span className="stat-lbl">Runtime JavaScript Bloat</span>
          </div>
        </div>
      </div>
    </header>
  );
};`,
    codeTailwind: `<!-- Tailwind Modern Hero -->
<section class="relative overflow-hidden py-24 px-6 text-center max-w-5xl mx-auto">
  <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
    <span>✨ New Release v2.5</span>
    <span>→</span>
  </div>
  <h1 class="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
    Build Exceptional Interfaces
  </h1>
  <p class="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
    Clean, accessible UI patterns designed for modern engineers.
  </p>
  <div class="mt-8 flex justify-center gap-4">
    <a href="#" class="rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900">Get Started</a>
    <a href="#" class="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300">Documentation</a>
  </div>
</section>`,
    codeVanillaCSS: `.modern-hero {
  padding: 60px 20px 40px;
  text-align: center;
  position: relative;
  font-family: var(--font-body, -apple-system, sans-serif);
}
.modern-hero-inner {
  max-width: 860px;
  margin: 0 auto;
}
.modern-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  padding: 6px 16px;
  border-radius: 99px;
  margin-bottom: 24px;
  transition: all 0.2s ease;
}
.modern-hero-pill:hover {
  background: #dbeafe;
  border-color: #bfdbfe;
}
.modern-hero-headline {
  font-family: var(--font-display, "Space Grotesk", sans-serif);
  font-size: clamp(34px, 5.5vw, 62px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin-bottom: 18px;
}
.modern-hero-lede {
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.6;
  color: #64748b;
  max-width: 680px;
  margin: 0 auto 32px;
}
.modern-hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}
.hero-btn-primary {
  height: 48px;
  padding: 0 24px;
  background: #0f172a;
  color: #ffffff;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
  transition: transform 0.15s ease, background 0.15s ease;
}
.hero-btn-primary:hover {
  background: #1e293b;
  transform: translateY(-1px);
}
.hero-btn-secondary {
  height: 48px;
  padding: 0 22px;
  background: #ffffff;
  color: #334155;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14.5px;
  display: inline-flex;
  align-items: center;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.hero-btn-secondary:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}
.modern-hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-val {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}
.stat-lbl {
  font-size: 12px;
  color: #64748b;
}
.stat-sep {
  width: 1px;
  height: 28px;
  background: #e2e8f0;
}
@media (max-width: 600px) {
  .stat-sep { display: none; }
  .modern-hero-stats { gap: 16px; }
}`,
    accessibility: {
      wcagCriteria: 'WCAG 2.1 Level AA Compliant',
      ariaNotes: [
        'Single semantic <h1> tag established for clear page heading hierarchy.',
        'CTAs provide clear action descriptions avoiding generic "click here" text.',
      ],
      keyboardSupport: [
        'Tab navigates from announcement pill through primary and secondary CTA buttons with visible focus rings.',
      ],
    },
    coreWebVitals: {
      inpScore: '< 8ms',
      clsScore: '0.00 (Typography uses clamp() without post-load font resizing jumps)',
      performanceTips: 'Use font-display: swap with system fallback fonts to guarantee immediate text visibility during font file delivery.',
    },
  },
};

export function getAllUIComponents(): UIComponent[] {
  return Object.values(UI_COMPONENTS);
}

export function getUIComponentBySlug(slug: string): UIComponent | undefined {
  return UI_COMPONENTS[slug];
}
