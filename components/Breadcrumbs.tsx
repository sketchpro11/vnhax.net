'use client';

import Link from 'next/link';
import { BRAND_CONFIG, BreadcrumbItem, getBreadcrumbSchema } from '@/lib/seo';

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbSegment[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Ensure "Home" is always the root item
  const allSegments: BreadcrumbSegment[] =
    items[0]?.href === '/' || items[0]?.label.toLowerCase() === 'home'
      ? items
      : [{ label: 'Home', href: '/' }, ...items];

  // Schema items for JSON-LD
  const schemaItems: BreadcrumbItem[] = allSegments.map((segment) => ({
    name: segment.label,
    url: segment.href || '',
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(schemaItems)),
        }}
      />
      <nav className={`breadcrumbs-wrapper ${className}`} aria-label="Breadcrumb">
        <ol className="breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {allSegments.map((segment, index) => {
            const isLast = index === allSegments.length - 1;
            const position = index + 1;

            return (
              <li
                key={`${segment.label}-${index}`}
                className="breadcrumb-item"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index === 0 && (
                  <span className="breadcrumb-home-icon" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </span>
                )}

                {segment.href && !isLast ? (
                  <Link
                    href={segment.href}
                    className="breadcrumb-link"
                    itemProp="item"
                  >
                    <span itemProp="name">{segment.label}</span>
                  </Link>
                ) : (
                  <span
                    className="breadcrumb-current"
                    itemProp="name"
                    aria-current="page"
                  >
                    {segment.label}
                  </span>
                )}
                <meta itemProp="position" content={String(position)} />

                {!isLast && (
                  <span className="breadcrumb-separator" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
