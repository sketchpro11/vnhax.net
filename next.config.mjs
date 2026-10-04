/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
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
        destination: '/ui-components/component-page-starter',
        permanent: true,
      },
      {
        source: '/post-template',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:path+.html',
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
