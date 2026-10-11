'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CONSENT_STORAGE_KEY = 'vnhax_cookie_consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'vnhax:open-cookie-settings';

type ConsentChoice = 'accepted' | 'declined';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Tells Google tags (GA4 now, AdSense later) what the visitor chose — Consent Mode v2. */
function applyConsent(choice: ConsentChoice) {
  const value = choice === 'accepted' ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });

  if (choice === 'declined') {
    // Withdrawing consent: remove analytics cookies that were set after an earlier "Accept"
    const host = window.location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach((c) => {
      const name = c.split('=')[0].trim();
      if (name.startsWith('_ga')) {
        for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
        }
      }
    });
  }
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!localStorage.getItem(CONSENT_STORAGE_KEY)) {
        // Small delay so it animates in after initial load without causing CLS
        timer = setTimeout(() => setIsVisible(true), 1200);
      }
    } catch {
      // localStorage may be disabled in private mode
      setIsVisible(true);
    }

    const reopen = () => setIsVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    };
  }, []);

  const choose = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    applyConsent(choice);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="cookie-consent-banner"
      role="region"
      aria-label="Cookie preferences"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-icon" aria-hidden="true">
          🍪
        </div>
        <div className="cookie-consent-text">
          <p id="cookie-consent-desc" className="cookie-consent-title">
            <strong>Cookies on VNHAX</strong>
          </p>
          <p className="cookie-consent-body">
            We use Google Analytics cookies to understand which articles are useful, and may use advertising cookies
            from Google in the future. They are only set if you accept. See our{' '}
            <Link href="/privacy-policy" className="cookie-consent-link">
              Privacy Policy
            </Link>
            . You can change your choice any time from &ldquo;Cookie Settings&rdquo; in the footer.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="cookie-btn cookie-btn-accept"
            id="cookie-accept-all-btn"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose('declined')}
            className="cookie-btn cookie-btn-decline"
            id="cookie-decline-btn"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
