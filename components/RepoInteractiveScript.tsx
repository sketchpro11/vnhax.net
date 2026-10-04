'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function RepoInteractiveScript() {
  useEffect(() => {
    // Copy Install Command
    const copyBtn = document.getElementById('copyInstallBtn');
    const copyText = document.getElementById('copyInstallText');
    const installCmd = document.getElementById('installCommand');
    if (copyBtn && copyText && installCmd) {
      copyBtn.onclick = function () {
        navigator.clipboard.writeText(installCmd.textContent || '').then(function () {
          copyText.textContent = 'Copied!';
          setTimeout(function () {
            copyText.textContent = 'Copy';
          }, 2000);
        });
      };
    }

    // Code Block Copy Buttons
    document.querySelectorAll<HTMLButtonElement>('.code-block .copy-btn').forEach((btn) => {
      btn.onclick = () => {
        const pre = btn.closest('.code-block')?.querySelector('pre');
        if (pre) {
          navigator.clipboard.writeText(pre.textContent || '').then(() => {
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
              btn.textContent = orig;
            }, 1500);
          });
        }
      };
    });

    // Diagram Zoom Controls
    const canvas = document.getElementById('diagramCanvas');
    const zoomIn = document.getElementById('zoomInBtn');
    const zoomOut = document.getElementById('zoomOutBtn');
    const zoomReset = document.getElementById('zoomResetBtn');
    let currentScale = 1;

    if (canvas && zoomIn && zoomOut && zoomReset) {
      zoomIn.onclick = function () {
        if (currentScale < 1.8) {
          currentScale += 0.15;
          canvas.style.transform = 'scale(' + currentScale + ')';
        }
      };

      zoomOut.onclick = function () {
        if (currentScale > 0.6) {
          currentScale -= 0.15;
          canvas.style.transform = 'scale(' + currentScale + ')';
        }
      };

      zoomReset.onclick = function () {
        currentScale = 1;
        canvas.style.transform = 'scale(1)';
      };
    }

    // Run mermaid if already available
    if (typeof window !== 'undefined' && (window as any).mermaid) {
      (window as any).mermaid.run({ querySelector: '.mermaid' }).catch(() => {});
    }
  }, []);

  const handleMermaidLoad = () => {
    if (typeof window !== 'undefined' && (window as any).mermaid) {
      (window as any).mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          curve: 'basis',
        },
      });
      (window as any).mermaid.run({ querySelector: '.mermaid' }).catch(() => {});
    }
  };

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
      strategy="afterInteractive"
      onLoad={handleMermaidLoad}
    />
  );
}
