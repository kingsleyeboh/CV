import { useEffect, useRef, useState } from 'react';
import { X, Download, FileText, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { CV_DATA, COUNTRY_PROFILES } from '../data/projects';
import { CountryPerspective } from '../types';
import { downloadPdf } from '../utils/downloadPdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  country?: CountryPerspective;
  onSelectCountry?: (c: CountryPerspective) => void;
}

export default function CVModal({
  isOpen,
  onClose,
  country = 'international',
  onSelectCountry,
}: CVModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryPerspective>(country);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedCountry(country);
    }
  }, [country, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentProfile = COUNTRY_PROFILES[selectedCountry] || COUNTRY_PROFILES.international;

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    let loadingTask: pdfjsLib.PDFDocumentLoadingTask | null = null;
    const abortController = new AbortController();

    async function renderPdf() {
      const container = containerRef.current;
      if (!container) return;

      setLoading(true);
      setError(null);
      setPageCount(0);
      container.innerHTML = '';

      try {
        const base = import.meta.env.BASE_URL || '/';
        const normalizedBase = base.endsWith('/') ? base : `${base}/`;
        const cleanPath = currentProfile.cvPath.startsWith('/')
          ? currentProfile.cvPath.slice(1)
          : currentProfile.cvPath;
        const url = `${normalizedBase}${cleanPath}`;

        const response = await fetch(url, {
          credentials: 'same-origin',
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load ${currentProfile.cvFilename} (${response.status})`);
        }

        const buffer = await response.arrayBuffer();
        if (cancelled) return;

        loadingTask = pdfjsLib.getDocument({ data: buffer });
        const loadedDoc = await loadingTask.promise;
        if (cancelled) {
          await loadingTask.destroy();
          return;
        }

        setPageCount(loadedDoc.numPages);
        const containerWidth = Math.max(container.clientWidth - 16, 320);
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNum = 1; pageNum <= loadedDoc.numPages; pageNum++) {
          if (cancelled) break;

          const page = await loadedDoc.getPage(pageNum);
          const unscaledViewport = page.getViewport({ scale: 1 });
          const targetWidth = Math.min(containerWidth, 820);
          const scale = targetWidth / unscaledViewport.width;
          const viewport = page.getViewport({ scale });

          const pageWrapper = document.createElement('div');
          pageWrapper.className = 'bg-white rounded-lg shadow-xl overflow-hidden border border-zinc-800 mx-auto';
          pageWrapper.style.width = `${Math.floor(viewport.width)}px`;

          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          canvas.className = 'block';

          const context = canvas.getContext('2d');
          if (!context) continue;

          pageWrapper.appendChild(canvas);
          container.appendChild(pageWrapper);

          await page.render({
            canvasContext: context,
            canvas,
            transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined,
            viewport,
          }).promise;
        }
      } catch (err) {
        if (cancelled || (err instanceof DOMException && err.name === 'AbortError')) return;
        setError(err instanceof Error ? err.message : 'Failed to load CV preview');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
      abortController.abort();
      if (loadingTask) {
        loadingTask.destroy().catch(() => {});
      }
    };
  }, [isOpen, currentProfile.cvPath, currentProfile.cvFilename]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {CV_DATA.name} — {currentProfile.label} CV
              </h3>
              <p className="text-xs text-zinc-400 font-mono truncate">
                {currentProfile.cvFilename}
                {pageCount > 0 ? ` · ${pageCount} ${pageCount === 1 ? 'page' : 'pages'}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={async () => {
                setDownloading(true);
                try {
                  await downloadPdf(currentProfile.cvPath, currentProfile.cvFilename);
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 rounded-lg transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing PDF...' : `Download PDF (${currentProfile.label})`}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close CV preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Region CV Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/80 px-6 py-2.5 shrink-0">
          {(Object.keys(COUNTRY_PROFILES) as CountryPerspective[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSelectedCountry(key);
                onSelectCountry?.(key);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCountry === key
                  ? 'bg-amber-500 text-zinc-950'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {COUNTRY_PROFILES[key].label}
            </button>
          ))}
        </div>

        {/* Live PDF Preview from /public/cv/ */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-zinc-950 flex-1 min-h-[420px]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-400 text-sm">
              <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
              <span>Loading {currentProfile.cvFilename}...</span>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto my-12 p-5 rounded-xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
              <p className="text-sm text-zinc-300">{error}</p>
              <button
                type="button"
                onClick={() => downloadPdf(currentProfile.cvPath, currentProfile.cvFilename)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download {currentProfile.cvFilename}</span>
              </button>
            </div>
          )}

          <div ref={containerRef} className="space-y-6 flex flex-col items-center" />
        </div>
      </div>
    </div>
  );
}
