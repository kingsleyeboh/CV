import { useState } from 'react';
import { Download, FileText, Award, ArrowRight } from 'lucide-react';
import { CV_DATA, COUNTRY_PROFILES } from '../data/projects';
import { CountryPerspective } from '../types';
import { downloadPdf } from '../utils/downloadPdf';
import ImageWithFallback from './ImageWithFallback';

interface HeroProps {
  heroImage: string;
  country: CountryPerspective;
  onSelectCountry: (c: CountryPerspective) => void;
  onOpenCVModal?: () => void;
  onOpenCertificateModal?: () => void;
}

export default function Hero({
  heroImage,
  country,
  onSelectCountry,
  onOpenCVModal,
  onOpenCertificateModal,
}: HeroProps) {
  const [downloading, setDownloading] = useState<'cv' | 'certs' | null>(null);
  const currentProfile = COUNTRY_PROFILES[country] || COUNTRY_PROFILES.international;

  const handleDownload = async (type: 'cv' | 'certs') => {
    setDownloading(type);
    try {
      if (type === 'cv') {
        await downloadPdf('/cv.pdf', 'Eboh-Kingsley-Cabinetmaker-CV.pdf');
      } else {
        await downloadPdf('/Certificates.pdf', 'Eboh-Kingsley-Certificates.pdf');
      }
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section className="bg-zinc-950 border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Subtle Recruiter Perspective Selector */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800/70">
          <span className="text-xs font-medium text-zinc-400">
            Tailor summary for region
          </span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
            {(Object.keys(COUNTRY_PROFILES) as CountryPerspective[]).map((key) => (
              <button
                key={key}
                onClick={() => onSelectCountry(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  country === key
                    ? 'bg-zinc-800 text-amber-400 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {COUNTRY_PROFILES[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Core Identity & Summary */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-medium text-amber-400">
                {currentProfile.badge} · {CV_DATA.location}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] text-balance">
                {CV_DATA.name}
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                {currentProfile.summary}
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <p className="text-xs sm:text-sm text-zinc-400">
                {currentProfile.bullets.join(' · ')}
              </p>

              {/* Focused Action Row */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownload('cv')}
                  disabled={downloading === 'cv'}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading === 'cv' ? 'Preparing CV...' : 'Download CV (PDF)'}</span>
                </button>

                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>View Work</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </a>

                {onOpenCVModal && (
                  <button
                    type="button"
                    onClick={onOpenCVModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Preview CV</span>
                  </button>
                )}

                {onOpenCertificateModal && (
                  <button
                    type="button"
                    onClick={onOpenCertificateModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Award className="w-4 h-4" />
                    <span>Preview Certificates</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDownload('certs')}
                  disabled={downloading === 'certs'}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-amber-400 disabled:opacity-70 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading === 'certs' ? 'Preparing PDF...' : 'Certificates (PDF)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Workshop Visual */}
          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[260px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <ImageWithFallback
                src={heroImage}
                alt="Eboh Kingsley Uzoma operating saw for cabinetry board cutting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-zinc-200 pointer-events-none">
                Panel Sizing, Board Cutting & Fitted Joinery
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Snapshot Strip */}
        <div className="mt-10 pt-8 border-t border-zinc-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="text-lg sm:text-xl font-bold text-white block font-mono-tabular">
              7 Years
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">
              Hands-on cabinet making
            </span>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold text-white block">
              HDF · MDF · MFC
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">
              Board sizing & edge-banding
            </span>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold text-white block">
              SketchUp 3D
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">
              Layout & cutting list planning
            </span>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold text-amber-400 block">
              Open to Relocation
            </span>
            <span className="text-xs sm:text-sm text-zinc-400">
              Employer visa sponsorship
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
