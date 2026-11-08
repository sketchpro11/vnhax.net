'use client';

import { useState } from 'react';

/** Small client-only button that copies a command and briefly confirms it. */
export default function CopyCommandButton({ text, color }: { text: string; color: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      style={{ background: copied ? '#16a34a' : color, color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
    >
      {copied ? '✓ Copied' : 'Copy Primary Command'}
    </button>
  );
}
