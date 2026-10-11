/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['gray-matter', 'marked'],
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/article-:slug.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/article-:slug',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/articles/:slug*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/repo-:slug.html',
        destination: '/repos',
        permanent: true,
      },
      {
        source: '/repo-:slug',
        destination: '/repos',
        permanent: true,
      },
      {
        source: '/privacy.html',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/component-template',
        destination: '/ui-components',
        permanent: true,
      },
      {
        source: '/ui-components/component-page-starter',
        destination: '/ui-components',
        permanent: true,
      },
      {
        source: '/post-template',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ai-video-tools-for-beginners',
        destination: '/ai/ai-tools',
        permanent: true,
      },
      {
        source: '/blog/what-is-lora-explained',
        destination: '/blog/bytedance-dmad-video-generation-distillation',
        permanent: true,
      },
      {
        source: '/blog/best-ai-voice-generators',
        destination: '/ai/ai-tools',
        permanent: true,
      },
      {
        source: '/blog/faceless-youtube-ai-workflow',
        destination: '/blog/bytedance-dmad-video-generation-distillation',
        permanent: true,
      },
      {
        source: '/blog/text-to-speech-vs-voice-over',
        destination: '/blog/elevenlabs-v4-emotive-voice-meta-tags-guide',
        permanent: true,
      },
      {
        source: '/blog/ai-audio-tools',
        destination: '/ai/ai-tools',
        permanent: true,
      },
      {
        source: '/blog/ai-tools',
        destination: '/ai/ai-tools',
        permanent: true,
      },
      {
        source: '/blog/ai-agents-safety',
        destination: '/blog/anthropic-enterprise-frontier-safeguards-explained',
        permanent: true,
      },
      {
        source: '/blog/chatgpt-plans',
        destination: '/blog/chatgpt-pro-500-plan-pricing-limits',
        permanent: true,
      },
      {
        source: '/:path((?!yandex_)[^/]+)+.html',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
