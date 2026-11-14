import { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Layers, Wrench, CheckCircle2, ChevronLeft, ChevronRight, Split } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface ProjectModalProps {
  project: Project | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export default function ProjectModal({ project, initialImageIndex = 0, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    setActiveImageIndex(initialImageIndex);
    setShowBeforeAfter(false);
    setSliderPosition(50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, initialImageIndex, onClose]);

  if (!project) return null;

  const currentImage = project.images[activeImageIndex] || {
    url: project.featuredImage,
    caption: project.title,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col">
        
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between gap-4 bg-zinc-900/90 shrink-0">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">
              {project.category}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white truncate max-w-lg">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* Media Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-zinc-300 font-semibold">
              <span>Photo {activeImageIndex + 1} of {project.images.length}</span>
              {project.beforeAfter && (
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-900 text-zinc-100 border border-zinc-700 hover:text-white"
                >
                  <Split className="w-4 h-4 text-amber-500" />
                  <span>{showBeforeAfter ? 'Gallery View' : 'Before / After'}</span>
                </button>
              )}
            </div>

            {/* Slider or Gallery View */}
            {showBeforeAfter && project.beforeAfter ? (
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 select-none">
                <ImageWithFallback
                  src={project.beforeAfter.afterUrl}
                  alt={project.beforeAfter.afterLabel || 'Completed Project'}
                  fallbackTitle={project.beforeAfter.afterLabel || 'After Photo'}
                  fallbackSubtitle="Place image in /public/images/projects/"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <ImageWithFallback
                    src={project.beforeAfter.beforeUrl}
                    alt={project.beforeAfter.beforeLabel || 'Initial Stage'}
                    fallbackTitle={project.beforeAfter.beforeLabel || 'Before Photo'}
                    fallbackSubtitle="Place image in /public/images/projects/"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 bg-zinc-950/90 text-amber-300 rounded-md">
                    {project.beforeAfter.beforeLabel || 'Fabrication'}
                  </span>
                </div>
                <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 bg-zinc-950/90 text-white rounded-md">
                  {project.beforeAfter.afterLabel || 'Installation'}
                </span>
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center text-xs font-bold">
                    ↔
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <ImageWithFallback
                    src={currentImage.url}
                    alt={currentImage.caption}
                    fallbackTitle={currentImage.caption || project.title}
                    fallbackSubtitle="Place image in /public/images/projects/"
                    className="w-full h-full object-cover"
                  />
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 text-white hover:bg-zinc-900 border border-zinc-700"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/80 text-white hover:bg-zinc-900 border border-zinc-700"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {project.images.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-22 h-14 rounded-lg overflow-hidden border shrink-0 ${
                          idx === activeImageIndex
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-zinc-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <ImageWithFallback
                          src={img.url}
                          alt={img.caption}
                          fallbackTitle={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-zinc-800">
            
            {/* Description & Responsibilities */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  <span>My Responsibilities</span>
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-zinc-200">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Materials & Location */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-zinc-300 font-medium">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="text-white font-bold">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 font-mono">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="text-zinc-200">{project.completionDate}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider block flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Materials & Hardware Used</span>
                </span>
                <ul className="space-y-1.5 text-sm text-zinc-200">
                  {project.materials.map((mat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">›</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.technicalHighlights && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Precision & Fitting Tolerances
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-200 font-mono">
                    {project.technicalHighlights.map((tech, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href="#contact"
                onClick={onClose}
                className="block text-center py-3 px-4 text-xs sm:text-sm font-bold text-zinc-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-md"
              >
                Inquire About Similar Work
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
