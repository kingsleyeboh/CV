import { useState, useEffect } from 'react';
import { X, Download, Award } from 'lucide-react';
import { CV_DATA } from '../data/projects';
import { downloadPdf } from '../utils/downloadPdf';
import ImageWithFallback from './ImageWithFallback';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certIndex?: number;
}

export default function CertificateModal({ isOpen, onClose, certIndex = 0 }: CertificateModalProps) {
  const [activeTab, setActiveTab] = useState(certIndex);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setActiveTab(certIndex);
  }, [certIndex, isOpen]);

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

  const currentCert = CV_DATA.education[activeTab] || CV_DATA.education[0];
  const certImage = activeTab === 0
    ? encodeURI('/images/training/Cabinetry and Furniture Making Certificate.jpg')
    : encodeURI('/images/training/General Entreprenuership Training Certificate.jpg');
  const certRef = activeTab === 0 ? 'AEA/DFL/2019/CM-882' : 'AEA/GET/2019/ET-409';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Official Vocational Certificate Document
              </h3>
              <p className="text-xs text-zinc-300">
                Abuja Enterprise Agency (AEA) Abuja Credential
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={async () => {
                setDownloading(true);
                try {
                  await downloadPdf('/Certificates.pdf', 'Eboh-Kingsley-Certificates.pdf');
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing PDF...' : 'Download Certificates (PDF)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close certificate preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Switcher */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900/80 px-6 py-2.5 gap-2 shrink-0">
          {CV_DATA.education.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
                activeTab === idx
                  ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-xs'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {idx === 0 ? 'Cabinetry Cert.' : 'Entrepreneurship Cert.'}
            </button>
          ))}
        </div>

        {/* On-Site Certificate Image Preview */}
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="overflow-y-auto p-4 sm:p-6 bg-zinc-950 flex flex-col items-center justify-center min-h-[400px] select-none"
        >
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 max-w-2xl w-full">
            <ImageWithFallback
              src={certImage}
              alt={currentCert.title}
              fallbackTitle={currentCert.title}
              draggable={false}
              className="w-full h-auto object-contain max-h-[68vh] mx-auto min-h-[250px] pointer-events-none select-none"
            />
            <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
              <span className="font-bold text-amber-400">{currentCert.title}</span>
              <span className="font-mono">On-site preview · Ref: {certRef}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
