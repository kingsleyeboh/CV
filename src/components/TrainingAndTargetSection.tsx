import { useState } from 'react';
import { CV_DATA } from '../data/projects';
import { FileCheck, Download } from 'lucide-react';
import { downloadPdf } from '../utils/downloadPdf';
import ImageWithFallback from './ImageWithFallback';

interface TrainingAndTargetSectionProps {
  onOpenCertificateModal?: (index?: number) => void;
}

export default function TrainingAndTargetSection({ onOpenCertificateModal }: TrainingAndTargetSectionProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCerts = async () => {
    setDownloading(true);
    try {
      await downloadPdf('/Certificates.pdf', 'Eboh-Kingsley-Certificates.pdf');
    } finally {
      setDownloading(false);
    }
  };
  const trainingPhotos = [
    {
      src: '/images/training/gradpres.jpg',
      alt: 'Graduation presentation and trade assessment at AEA',
      caption: 'Graduation presentation & trade assessment (2019)',
    },
    {
      src: '/images/training/gradproj.jpg',
      alt: 'Graduation cabinetry and furniture project showcase',
      caption: 'Practical graduation project showcase',
    },
    {
      src: '/images/training/gradtools.jpg',
      alt: 'Workshop machine operation and hand tool training',
      caption: 'Workshop machinery and tool training',
    },
  ];

  return (
    <section id="training" className="py-14 sm:py-18 bg-zinc-950 border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-amber-400">
              Formal Training & Credentials
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Certification & Workshop Practice
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleDownloadCerts}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 disabled:opacity-70 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing PDF...' : 'Download Certificates (PDF)'}</span>
            </button>
            <span className="text-sm text-zinc-400">
              References: {CV_DATA.references}
            </span>
          </div>
        </div>

        {/* Certificates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CV_DATA.education.map((cert, idx) => {
            const certImage = idx === 0
              ? encodeURI('/images/training/Cabinetry and Furniture Making Certificate.jpg')
              : encodeURI('/images/training/General Entreprenuership Training Certificate.jpg');

            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="space-y-2 flex-1">
                  <span className="text-xs font-mono-tabular text-amber-400 block">
                    {cert.date}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {cert.institution}
                  </p>
                  {onOpenCertificateModal && (
                    <button
                      onClick={() => onOpenCertificateModal(idx)}
                      className="inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Preview Certificate</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onOpenCertificateModal?.(idx)}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full sm:w-28 shrink-0 rounded-lg overflow-hidden border border-zinc-800 aspect-4/3 bg-zinc-900 hover:border-amber-500/50 transition-colors select-none"
                  aria-label={`Preview ${cert.title}`}
                >
                  <ImageWithFallback
                    src={certImage}
                    alt={cert.title}
                    fallbackTitle={cert.title}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-cover object-top pointer-events-none select-none"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Training & Graduation Photo Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trainingPhotos.map((photo, idx) => (
            <figure key={idx} className="space-y-2.5">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-4/3">
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.alt}
                  fallbackTitle={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs text-zinc-400">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
