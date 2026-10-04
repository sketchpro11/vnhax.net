import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/styles.css';
import {
  BRAND_CONFIG,
  getOrganizationSchema,
  getWebSiteSchema
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_CONFIG.siteUrl),
  title: {
    default: BRAND_CONFIG.name,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description: BRAND_CONFIG.description,
  alternates: {
    canonical: BRAND_CONFIG.siteUrl,
  },
  openGraph: {
    title: BRAND_CONFIG.name,
    description: BRAND_CONFIG.description,
    url: BRAND_CONFIG.siteUrl,
    siteName: BRAND_CONFIG.shortName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: BRAND_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_CONFIG.name,
    description: BRAND_CONFIG.description,
    creator: BRAND_CONFIG.twitterHandle,
    images: [`${BRAND_CONFIG.siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icon.png',
  },
};

import CookieConsent from '@/components/CookieConsent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = getOrganizationSchema();
  const siteSchema = getWebSiteSchema();
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* DNS prefetch & Preconnect to speed up any external connections */}
        <link rel="dns-prefetch" href="https://vnhax.net" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        
        {/* Optional Google AdSense Verification Tag (set NEXT_PUBLIC_ADSENSE_ID in .env) */}
        {adsenseId && (
          <meta name="google-adsense-account" content={adsenseId} />
        )}

        {/* Schema.org Root Schemas: Organization & WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
