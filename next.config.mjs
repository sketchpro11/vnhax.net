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
        source: '/terms-and-conditions',
        destination: '/terms',
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
        destination: '/blog/chatgpt-pro-plans-100-200-500-ultrafast',
        permanent: true,
      },
      // Day 4 content consolidation: merged or removed articles
      {
        source: '/blog/nvidia-soul-refiner-single-step-4k-video-upscaling',
        destination: '/blog/nvidia-sol-refiner-one-step-4k-video-refinement',
        permanent: true,
      },
      {
        source: '/blog/meta-enterprise-platform-private-llama-security-architecture',
        destination: '/meta',
        permanent: true,
      },
      {
        source: '/blog/project-astra-real-time-visual-ai-multimodal-perception',
        destination: '/google',
        permanent: true,
      },
      {
        source: '/blog/creative-canvas-meta-muse-vs-dots-vs-spark',
        destination: '/blog/meta-muse-ai-agent-guide-how-to-use',
        permanent: true,
      },
      {
        source: '/blog/meta-muse-for-small-business-ecommerce-sales-guide',
        destination: '/blog/meta-muse-ai-agent-guide-how-to-use',
        permanent: true,
      },
      {
        source: '/blog/github-copilot-grok-4-7-vs-claude-opus-5-5-vs-gpt-6-sol',
        destination: '/blog/github-copilot-project-hydrafusion-explained',
        permanent: true,
      },
      {
        source: '/blog/llama-4-enterprise-fine-tuning-quantization-deployment',
        destination: '/blog/running-llama-4-locally-vram-requirements-quantization',
        permanent: true,
      },
      {
        source: '/blog/colossus-2-mega-cluster-gpu-architecture-liquid-cooling',
        destination: '/blog/what-is-spacexai-xai-rebrand-orbital-intelligence',
        permanent: true,
      },
      {
        source: '/blog/chatgpt-pro-500-plan-pricing-limits',
        destination: '/blog/chatgpt-pro-plans-100-200-500-ultrafast',
        permanent: true,
      },
      {
        source: '/blog/chatgpt-pro-pricing-100-vs-200-explained',
        destination: '/blog/chatgpt-pro-plans-100-200-500-ultrafast',
        permanent: true,
      },
      {
        source: '/blog/openai-ultrafast-speed-tier-explained',
        destination: '/blog/chatgpt-pro-plans-100-200-500-ultrafast',
        permanent: true,
      },
      {
        source: '/blog/github-copilot-multi-model-routing-developer-guide',
        destination: '/blog/github-copilot-project-hydrafusion-explained',
        permanent: true,
      },
      {
        source: '/blog/gemini-4-argon-vs-gemini-3-8-flash-comparison',
        destination: '/blog/gemini-4-argon-features-and-benchmarks',
        permanent: true,
      },
      {
        source: '/blog/openai-dots-always-on-ai-agents',
        destination: '/blog/openai-gpt-dots-cloud-agents-workflow-guide',
        permanent: true,
      },
      {
        source: '/blog/grok-4-7-api-pricing-token-costs-guide',
        destination: '/blog/grok-4-7-vs-grok-4-6-comparison-benchmarks',
        permanent: true,
      },
      {
        source: '/blog/grok-5-release-date-architecture-expected-features',
        destination: '/blog/xai-roadmap-grok-4-8-grok-4-9-release-schedule',
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
