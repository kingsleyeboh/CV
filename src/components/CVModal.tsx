import { useEffect } from 'react';
import { X, Download, Printer, FileText } from 'lucide-react';
import { CV_DATA } from '../data/projects';
import { downloadPdf } from '../utils/downloadPdf';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {CV_DATA.name} — Curriculum Vitae Document
              </h3>
              <p className="text-xs text-zinc-300 font-medium">
                {CV_DATA.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={() => downloadPdf('/cv.pdf', 'Eboh-Kingsley-Cabinetmaker-CV.pdf')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Paper Document */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white text-zinc-900 space-y-7 select-text font-sans">
          
          {/* Header */}
          <div className="border-b-2 border-zinc-900 pb-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                {CV_DATA.name}
              </h1>
              <span className="text-xs sm:text-sm font-extrabold text-amber-700 uppercase tracking-widest">
                Curriculum Vitae
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-zinc-800 tracking-wide">
              {CV_DATA.title}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-zinc-700 font-semibold">
              <span>Location: {CV_DATA.location}</span>
              <span>·</span>
              <span>Phone: {CV_DATA.phone}</span>
              <span>·</span>
              <span>Email: {CV_DATA.email}</span>
            </div>

            <div className="pt-1 text-xs sm:text-sm font-bold text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              {CV_DATA.sponsorship.join(' | ')}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-extrabold text-zinc-950 uppercase tracking-widest border-b border-zinc-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-800 font-normal">
              {CV_DATA.summary}
            </p>
          </div>

          {/* Key Skills */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-zinc-950 uppercase tracking-widest border-b border-zinc-300 pb-1">
              Key Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm text-zinc-800">
              <div>
                <strong className="block text-zinc-950 mb-1.5 font-bold text-sm">Cabinet making and joinery:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {CV_DATA.skills.joinery.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-zinc-950 mb-1.5 font-bold text-sm">Materials and production:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {CV_DATA.skills.materials.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-zinc-950 mb-1.5 font-bold text-sm">Hardware and installation:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {CV_DATA.skills.hardware.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-zinc-950 mb-1.5 font-bold text-sm">Tools, equipment & software:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {CV_DATA.skills.toolsAndSoftware.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs sm:text-sm font-extrabold text-zinc-950 uppercase tracking-widest border-b border-zinc-300 pb-1">
              Experience
            </h2>

            {CV_DATA.primaryExperience.map((job, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="text-sm font-bold text-zinc-950">
                    {job.title} | {job.company}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-600 font-mono font-medium">
                    {job.location} | {job.period}
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm text-zinc-800 space-y-1.5 pl-1 leading-relaxed">
                  {job.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Employment Experience */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-zinc-950 uppercase tracking-widest border-b border-zinc-300 pb-1">
              Additional Employment Experience
            </h2>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="text-sm font-bold text-zinc-950">
                  {CV_DATA.additionalExperience.title} | {CV_DATA.additionalExperience.company}
                </span>
                <span className="text-xs sm:text-sm text-zinc-600 font-mono font-medium">
                  {CV_DATA.additionalExperience.location} | {CV_DATA.additionalExperience.period}
                </span>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-zinc-800 space-y-1.5 pl-1 leading-relaxed">
                {CV_DATA.additionalExperience.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
              <div className="pt-2 text-xs font-semibold text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <span className="block font-bold text-amber-950 mb-1">Trade Background & Practice Statements:</span>
                <ul className="list-disc list-inside space-y-1">
                  {CV_DATA.additionalExperience.tradeStatements.map((stmt, sIdx) => (
                    <li key={sIdx}>{stmt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Training and Certificates */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-extrabold text-zinc-950 uppercase tracking-widest border-b border-zinc-300 pb-1">
              Training and Certificates
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm text-zinc-800 space-y-1.5">
              {CV_DATA.education.map((cert, idx) => (
                <li key={idx}>
                  <strong>{cert.title}</strong> — {cert.institution} ({cert.date})
                </li>
              ))}
            </ul>
          </div>

          {/* Target Roles & References */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-200 text-xs sm:text-sm text-zinc-800">
            <div>
              <strong className="block text-zinc-950 mb-1 font-bold">Target Roles:</strong>
              <p>{CV_DATA.targetRoles.join(' | ')}</p>
            </div>
            <div>
              <strong className="block text-zinc-950 mb-1 font-bold">References:</strong>
              <p>{CV_DATA.references}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
