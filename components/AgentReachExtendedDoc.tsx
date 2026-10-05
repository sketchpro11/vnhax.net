'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PlatformItem {
  name: string;
  capabilities: string;
  setup: 'Zero config' | 'Cookie' | 'OpenCLI' | 'Auto-configured' | 'Free key';
  backend: string;
  notes: string;
  icon: string;
}

const PLATFORMS: PlatformItem[] = [
  { name: 'Web Pages', capabilities: 'Read & Clean Markdown', setup: 'Zero config', backend: 'Jina Reader (⭐9.8K)', notes: 'Converts any URL into token-efficient Markdown with no API key.', icon: '🌐' },
  { name: 'Twitter / X', capabilities: 'Read · Search · Timelines', setup: 'Cookie', backend: 'twitter-cli ▸ OpenCLI ▸ bird', notes: 'Cookie unlocks search, timelines, and tweet details without $215/mo API.', icon: '🐦' },
  { name: 'XiaoHongShu', capabilities: 'Read · Search · Comments', setup: 'OpenCLI', backend: 'OpenCLI ▸ xiaohongshu-mcp', notes: 'OpenCLI reuses existing user-controlled Chrome session without automating login.', icon: '📕' },
  { name: 'Facebook', capabilities: 'Search · Profiles · Feed', setup: 'OpenCLI', backend: 'OpenCLI (Desktop)', notes: 'Desktop browser session reuse bypassing restricted Graph APIs.', icon: '📘' },
  { name: 'Instagram', capabilities: 'Search · Profiles · Posts', setup: 'OpenCLI', backend: 'OpenCLI (Desktop)', notes: 'Desktop Chrome session reuse; avoids fragile Instaloader scrapers.', icon: '📷' },
  { name: 'LinkedIn', capabilities: 'Profiles · Jobs · Companies', setup: 'Zero config', backend: 'linkedin-mcp ▸ Jina Reader', notes: 'Public pages read via Jina Reader; full profiles via MCP.', icon: '💼' },
  { name: 'V2EX', capabilities: 'Topics · Replies · Profiles', setup: 'Zero config', backend: 'Public JSON API', notes: 'Zero auth required. Premier Chinese technical developer community.', icon: '💻' },
  { name: 'Xueqiu (Snowball Finance)', capabilities: 'Quotes · Search · Hot Stocks', setup: 'Cookie', backend: 'Browser Cookie', notes: 'Financial community discussions and stock trends.', icon: '📈' },
  { name: 'Xiaoyuzhou Podcast', capabilities: 'Audio Transcription', setup: 'Free key', backend: 'Groq Whisper API (Free)', notes: 'Full podcast audio to text transcript in seconds.', icon: '🎙️' },
  { name: 'Web Search', capabilities: 'Semantic AI Search', setup: 'Auto-configured', backend: 'Exa via mcporter', notes: 'Auto-configured during install, free, no API key needed.', icon: '🔍' },
  { name: 'GitHub', capabilities: 'Read · Search · Repos', setup: 'Zero config', backend: 'gh CLI (Official)', notes: 'Public repos work instantly; gh auth login unlocks issues and PRs.', icon: '📦' },
  { name: 'YouTube', capabilities: 'Subtitles · Video Search', setup: 'Zero config', backend: 'yt-dlp (⭐154K)', notes: 'Fetches full transcripts and subtitles across 1,800+ video sites.', icon: '📺' },
  { name: 'Bilibili', capabilities: 'Search · Video Detail', setup: 'Zero config', backend: 'bili-cli ▸ OpenCLI', notes: 'No login required; yt-dlp was 412-blocked so Agent-Reach uses bili-cli.', icon: '📺' },
  { name: 'RSS Feeds', capabilities: 'Parse Any RSS/Atom Feed', setup: 'Zero config', backend: 'feedparser (⭐2.3K)', notes: 'Python ecosystem standard feed reader.', icon: '📡' },
  { name: 'Reddit', capabilities: 'Search · Read Threads', setup: 'OpenCLI', backend: 'OpenCLI ▸ rdt-cli', notes: 'Bypasses server IP 403 blocks via local browser session or rdt login.', icon: '📖' },
];

export default function AgentReachExtendedDoc() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPlatforms = PLATFORMS.filter((p) => {
    const matchesFilter = platformFilter === 'All' || p.setup === platformFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.notes.toLowerCase().includes(searchQuery.toLowerCase()) || p.backend.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* 1. Top Badges Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          👁️ AGENT REACH
        </span>
        <span style={{ background: '#059669', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          90.6K+ STARS (+979 TODAY)
        </span>
        <span style={{ background: '#7c3aed', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          15+ PLATFORMS
        </span>
        <span style={{ background: '#ea580c', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
          $0 API FEES
        </span>
        <span style={{ background: '#1e293b', color: '#94a3b8', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' }}>
          LICENSE: MIT
        </span>
      </div>

      {/* 2. Hero Presentation Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '36px',
          boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.2)',
        }}
      >
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
          <Image
            src="/images/Agent Reach by vnhax.net.png"
            alt="Agent Reach - Give your AI Agent one-click access to the entire internet"
            width={1200}
            height={630}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ display: 'inline-block', color: '#60a5fa', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Panniantong / Agent-Reach — Multi-Platform Retrieval
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Agent Reach: One-Click Internet Access for Any AI Agent
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
          Modern AI agents hit severe roadblocks when querying live social networks: commercial APIs charge hundreds of dollars per month, Reddit blocks cloud server IPs with 403 errors, and video/community platforms require login state. 
          <strong> Agent Reach</strong> gives your AI Agent reliable, zero-API-cost internet access across 15+ platforms with automated backend health checking and failover routing.
        </p>

        {/* 4 Quantitative Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 800 }}>$0 API Cost</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Bypasses Expensive Paywalls</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#4ade80', fontSize: '20px', fontWeight: 800 }}>15+ Channels</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Twitter, Reddit, Bilibili, YouTube</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#a855f7', fontSize: '20px', fontWeight: 800 }}>Auto-Failover</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>Seamless Fallback Backends</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 800 }}>doctor Diagnostic</div>
            <div style={{ color: '#94a3b8', fontSize: '11.5px' }}>1-Command Health Verifier</div>
          </div>
        </div>
      </div>

      {/* 3. Sponsors Section */}
      <div style={{ marginBottom: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            ❤️ Sponsors &amp; Ecosystem Partners
          </h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Support open-source development · <a href="mailto:pnt01@foxmail.com" style={{ color: '#2563eb' }}>pnt01@foxmail.com</a>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {/* Sponsor 1: BrowserAct */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px', marginBottom: '4px' }}>
              BrowserAct
            </div>
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: '0 0 8px 0' }}>
              Extracts any data from complex websites (Amazon, LinkedIn, X, Google Maps) in a real stealth browser with residential proxies and CAPTCHA handling.
            </p>
            <a href="https://www.browseract.ai/Agent" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '11.5px', fontWeight: 600 }}>
              Try Free (1,000 credits) ↗
            </a>
          </div>

          {/* Sponsor 2: Tencent Cloud */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px', marginBottom: '4px' }}>
              Tencent Cloud (OpenClaw)
            </div>
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: '0 0 8px 0' }}>
              Deploy OpenClaw on Tencent Cloud Lighthouse in seconds, connect Agent Reach through chat, and add internet access to your agent setup.
            </p>
            <a href="https://www.tencentcloud.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '11.5px', fontWeight: 600 }}>
              Learn More ↗
            </a>
          </div>

          {/* Sponsor 3: CoreClaw */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px', marginBottom: '4px' }}>
              CoreClaw
            </div>
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: '0 0 8px 0' }}>
              Web scraping platform with 100+ ready-made data collection tools for Amazon, TikTok, Google Maps, Instagram, and YouTube.
            </p>
            <a href="https://www.coreclaw.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '11.5px', fontWeight: 600 }}>
              Free $3 Trial ↗
            </a>
          </div>

          {/* Sponsor 4: AstraFlow */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px', marginBottom: '4px' }}>
              AstraFlow ModelVerse
            </div>
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: '0 0 8px 0' }}>
              One-click access to 200+ models, including leading open-source models such as Kimi K3, DeepSeek V3, and Qwen 2.5/3.
            </p>
            <a href="https://www.ucloud.cn" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '11.5px', fontWeight: 600 }}>
              Explore Models ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Why Do You Need Agent Reach? */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0' }}>
          Why Do You Need Agent Reach?
        </h2>
        <p style={{ color: '#475569', fontSize: '13.5px', margin: '0 0 16px 0', lineHeight: 1.6 }}>
          AI Agents can already access the internet — but &ldquo;can go online&rdquo; is barely the start. The most valuable information lives across social and niche platforms where information density is highest, but each has strict barriers:
        </p>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 14px', width: '200px' }}>Platform Pain Point</th>
                <th style={{ padding: '10px 14px' }}>Reality Without Agent Reach</th>
                <th style={{ padding: '10px 14px' }}>With Agent Reach</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>Twitter / X API</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}>Pay-per-use, moderate usage ~$215/month</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 600 }}>Free via local cookie auth &amp; twitter-cli</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>Reddit</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}>Cloud server IPs get blocked with 403 Forbidden</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 600 }}>OpenCLI desktop browser session reuse</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>XiaoHongShu</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}>Strict mandatory login to browse notes</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 600 }}>Zero automated login, uses existing session</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>Bilibili</td>
                <td style={{ padding: '10px 14px', color: '#ef4444' }}>Blocks server/overseas IPs (412 on yt-dlp)</td>
                <td style={{ padding: '10px 14px', color: '#16a34a', fontWeight: 600 }}>Auto-switched to bili-cli with 0 login needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. What you might want to know before using */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', color: '#f8fafc' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', margin: '0 0 16px 0' }}>
          What You Might Want to Know Before Using
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#4ade80', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>💰 Completely Free</div>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              All tools are open source, all APIs used are free. The only possible cost is an optional server proxy ($1/mo) if hosting in restricted networks. Local machines need no proxy.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>🔒 Privacy Safe</div>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              Cookies stay strictly on your local disk. Never uploaded to cloud servers. Fully open source code you can audit anytime.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>🔄 Kept Up to Date</div>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              Every platform routes through an ordered primary + fallback list. When an upstream path changes, Agent Reach auto-switches so you never notice.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#a855f7', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>🤖 Works with Any Agent</div>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              Claude Code, OpenClaw, Cursor, Windsurf, Codex, Antigravity — any agent capable of running shell commands.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Supported Platforms Matrix */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ background: '#7c3aed', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', marginRight: '8px' }}>
              CHANNELS
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', display: 'inline' }}>
              Supported Platforms ({PLATFORMS.length})
            </h2>
          </div>

          <input
            type="text"
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              outline: 'none',
              width: '200px',
            }}
          />
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {['All', 'Zero config', 'OpenCLI', 'Cookie', 'Auto-configured'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setPlatformFilter(tab)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: platformFilter === tab ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: platformFilter === tab ? '#2563eb' : '#ffffff',
                color: platformFilter === tab ? '#ffffff' : '#64748b',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Platforms Table */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px 14px', width: '180px' }}>Platform</th>
                <th style={{ padding: '10px 14px', width: '140px' }}>Setup Level</th>
                <th style={{ padding: '10px 14px', width: '220px' }}>Active Backend</th>
                <th style={{ padding: '10px 14px' }}>Notes &amp; Capabilities</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlatforms.map((p, idx) => (
                <tr key={p.name} style={{ borderBottom: idx === filteredPlatforms.length - 1 ? 'none' : '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>
                    <span style={{ marginRight: '6px' }}>{p.icon}</span>
                    {p.name}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        background: p.setup === 'Zero config' ? '#dcfce7' : p.setup === 'OpenCLI' ? '#e0e7ff' : '#fef3c7',
                        color: p.setup === 'Zero config' ? '#166534' : p.setup === 'OpenCLI' ? '#3730a3' : '#92400e',
                      }}
                    >
                      {p.setup}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#2563eb', fontWeight: 600, fontFamily: 'monospace' }}>
                    {p.backend}
                  </td>
                  <td style={{ padding: '10px 14px', color: '#475569', lineHeight: 1.45 }}>
                    {p.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Quick Start & Common Commands */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', margin: '0 0 12px 0' }}>
          Quick Start &amp; Common Commands
        </h2>

        {/* 1-Line Agent Prompt */}
        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Pass this instruction directly to your AI Agent:
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <code style={{ color: '#38bdf8', fontSize: '12.5px', fontFamily: 'monospace' }}>
              Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
            </code>
            <button
              type="button"
              onClick={() => handleCopy('Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md', 'agent-prompt')}
              style={{ background: copiedId === 'agent-prompt' ? '#16a34a' : 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
            >
              {copiedId === 'agent-prompt' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Common CLI commands grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          <div style={{ background: '#090d16', padding: '12px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Run Diagnostic Health Check:</span>
            <pre style={{ color: '#4ade80', fontSize: '12px', margin: '4px 0 0 0', fontFamily: 'monospace' }}>agent-reach doctor</pre>
          </div>
          <div style={{ background: '#090d16', padding: '12px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Install as Global Agent Skill:</span>
            <pre style={{ color: '#4ade80', fontSize: '12px', margin: '4px 0 0 0', fontFamily: 'monospace' }}>npx skills add Panniantong/Agent-Reach@agent-reach</pre>
          </div>
          <div style={{ background: '#090d16', padding: '12px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Search Reddit Posts:</span>
            <pre style={{ color: '#4ade80', fontSize: '12px', margin: '4px 0 0 0', fontFamily: 'monospace' }}>agent-reach query reddit &quot;best local LLMs&quot;</pre>
          </div>
          <div style={{ background: '#090d16', padding: '12px 14px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Search Twitter / X:</span>
            <pre style={{ color: '#4ade80', fontSize: '12px', margin: '4px 0 0 0', fontFamily: 'monospace' }}>agent-reach query twitter &quot;Claude 3.7 benchmarks&quot;</pre>
          </div>
        </div>
      </div>

      {/* 8. Design Philosophy & Core Principles */}
      <div style={{ marginBottom: '40px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
          Design Philosophy &amp; Core Principles
        </h2>
        <p style={{ color: '#475569', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.6 }}>
          <strong>Agent Reach is a capability layer, not yet another tool.</strong> It sits one level above any specific implementation: it handles <strong>selection, installation, health checks, and routing</strong>, not the reading itself. Reading is done by your Agent calling upstream tools directly with zero wrapper overhead.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '14px' }}>
            <strong style={{ color: '#0f172a', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
              🔌 Ordered Backend Routing
            </strong>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              Each platform maintains an ordered list (primary + fallbacks). When an upstream tool is blocked (e.g. Bilibili 412 on yt-dlp), Agent Reach routes to bili-cli seamlessly.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '14px' }}>
            <strong style={{ color: '#0f172a', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
              🩺 Real Active Probing
            </strong>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              <code>agent-reach doctor</code> tests live network responses, verifying that endpoints return actual content rather than merely checking if a CLI binary is installed.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '14px' }}>
            <strong style={{ color: '#0f172a', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
              🛡️ Safe Local-First Cookies
            </strong>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
              Agent Reach never automates login or exfiltrates credentials. OpenCLI attaches only to an existing user-controlled desktop Chrome session.
            </p>
          </div>
        </div>
      </div>

      {/* 9. Project Structure */}
      <div style={{ marginBottom: '40px', background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', margin: '0 0 10px 0' }}>
          Project Structure
        </h2>
        <pre
          style={{
            margin: 0,
            padding: '14px',
            background: '#090d16',
            borderRadius: '8px',
            color: '#38bdf8',
            fontSize: '12px',
            fontFamily: 'monospace',
            lineHeight: 1.5,
            border: '1px solid #1e293b',
            overflowX: 'auto',
          }}
        >
{`channels/
├── web.py          → Jina Reader
├── twitter.py      → twitter-cli ▸ OpenCLI ▸ bird
├── youtube.py      → yt-dlp
├── github.py       → gh CLI
├── bilibili.py     → bili-cli ▸ OpenCLI ▸ search API (yt-dlp retired)
├── reddit.py       → OpenCLI ▸ rdt-cli (login required)
├── facebook.py     → OpenCLI (desktop browser session)
├── instagram.py    → OpenCLI (desktop browser session)
├── xiaohongshu.py  → OpenCLI ▸ xiaohongshu-mcp ▸ xhs-cli
├── linkedin.py     → linkedin-mcp ▸ Jina Reader
├── rss.py          → feedparser
├── exa_search.py   → Exa via mcporter
└── __init__.py     → Channel registry (for doctor health checks)`}
        </pre>
      </div>

      {/* 10. Contributing Guidelines & License */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>🤝 Contributing Guidelines</div>
          <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            Contributions to new platform channels, failover scrapers, and doctor diagnostics are welcome. Submit pull requests or report broken access paths on <a href="https://github.com/Panniantong/Agent-Reach/issues" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>GitHub Issues</a>.
          </p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>⚖️ License: MIT</div>
          <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            Released under the <strong>MIT License</strong>. Free for both individual and commercial agentic pipelines.
          </p>
        </div>
      </div>
    </div>
  );
}
