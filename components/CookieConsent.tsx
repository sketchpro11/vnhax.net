'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('vnhax_cookie_consent');
      if (!consent) {
        // Small delay so it smoothly animates in after initial load without causing CLS
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be disabled in private mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('vnhax_cookie_consent', 'accepted');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('vnhax_cookie_consent', 'declined');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="cookie-consent-banner"
      role="dialog"
      aria-label="Cookie Consent & Privacy Preferences"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-icon" aria-hidden="true">
          🍪
        </div>
        <div className="cookie-consent-text">
          <p id="cookie-consent-desc" className="cookie-consent-title">
            <strong>Privacy &amp; Cookie Consent</strong>
          </p>
          <p className="cookie-consent-body">
            We and our partners (including Google AdSense) use cookies to enhance your browsing experience, measure site diagnostics, and deliver relevant content in accordance with our{' '}
            <Link href="/privacy-policy" className="cookie-consent-link">
              Privacy Policy
            </Link>. You can manage or decline non-essential cookies at any time.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            type="button"
            onClick={handleAccept}
            className="cookie-btn cookie-btn-accept"
            id="cookie-accept-all-btn"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="cookie-btn cookie-btn-decline"
            id="cookie-decline-btn"
          >
            Decline Non-Essential
          </button>
        </div>
      </div>
    </aside>
  );
}
