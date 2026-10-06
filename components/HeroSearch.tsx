'use client';

import { useState } from 'react';
import GlobalSearch from '@/components/GlobalSearch';

export default function HeroSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <form
        className="search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearchOpen(true);
        }}
      >
        <input
          className="search-input"
          type="search"
          name="q"
          placeholder="Search guides, AI models, repositories, UI components..."
          aria-label="Search vnhax"
          autoComplete="off"
          onClick={() => setIsSearchOpen(true)}
          onFocus={() => setIsSearchOpen(true)}
          readOnly
        />
        <button
          className="search-submit"
          type="button"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Submit search"
        >
          <svg width="19" height="19" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <circle cx="7.5" cy="7.5" r="6.1" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12.4 12.4 16 16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
