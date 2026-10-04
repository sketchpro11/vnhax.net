'use client';

import { useEffect } from 'react';

export default function CodeBlockEnhancer() {
  useEffect(() => {
    const handleCopyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const copyBtn = target.closest('.copy-code-btn') as HTMLButtonElement | null;
      if (!copyBtn) return;

      e.preventDefault();
      const encodedCode = copyBtn.getAttribute('data-code');
      const textToCopy = encodedCode
        ? decodeURIComponent(encodedCode)
        : copyBtn.closest('.code-card')?.querySelector('code')?.textContent || '';

      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.classList.add('copied');
        const label = copyBtn.querySelector('.copy-label');
        const originalText = label ? label.textContent : 'Copy Code';
        if (label) label.textContent = 'Copied!';

        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (label) label.textContent = originalText;
        }, 2000);
      });
    };

    document.addEventListener('click', handleCopyClick);
    return () => document.removeEventListener('click', handleCopyClick);
  }, []);

  return null;
}
