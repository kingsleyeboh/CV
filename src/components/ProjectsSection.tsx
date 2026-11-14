import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project, imageIndex?: number) => void;
}

export default function ProjectsSection({
  projects,
  onSelectProject,
}: ProjectsSectionProps) {
  return (
    <section id="portfolio" className="py-14 sm:py-18 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-amber-400">
              Selected Work
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Cabinetry & Installation Projects
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Select any photo to open the full gallery and inspect materials and project specifications.
          </p>
        </div>

        <div className="space-y-14">
          {projects.map((project, pIdx) => (
            <div
              key={project.id}
              className={pIdx > 0 ? 'pt-12 border-t border-zinc-800/80 space-y-6' : 'space-y-6'}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{project.completionDate}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <button
                  onClick={() => onSelectProject(project, 0)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors self-start md:self-auto shrink-0"
                >
                  <span>Inspect specifications</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((img, idx) => (
                  <figure
                    key={idx}
                    onClick={() => onSelectProject(project, idx)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="relative rounded-xl overflow-hidden border border-zinc-800 group-hover:border-zinc-700 bg-zinc-900 aspect-4/3 transition-colors">
                      <ImageWithFallback
                        src={img.url}
                        alt={img.caption}
                        fallbackTitle={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="text-xs sm:text-sm text-zinc-400 group-hover:text-amber-400 transition-colors">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
