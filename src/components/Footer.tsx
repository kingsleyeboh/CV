import { ArrowUp } from 'lucide-react';
import { CV_DATA } from '../data/projects';
import { downloadPdf } from '../utils/downloadPdf';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 text-xs sm:text-sm py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="font-semibold text-zinc-200">{CV_DATA.name}</span>
          <span className="mx-2 text-zinc-600" aria-hidden="true">·</span>
          <span>{CV_DATA.title}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <a href={`mailto:${CV_DATA.email}`} className="hover:text-white transition-colors">
            {CV_DATA.email}
          </a>
          <button
            type="button"
            onClick={() => downloadPdf('/cv.pdf', 'Eboh-Kingsley-Cabinetmaker-CV.pdf')}
            className="text-amber-400 hover:underline font-medium"
          >
            Download CV
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
