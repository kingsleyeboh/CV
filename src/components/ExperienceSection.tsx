import { CV_DATA } from '../data/projects';

export default function ExperienceSection() {
  const skillGroups = [
    {
      title: 'Cabinet Making & Joinery',
      items: CV_DATA.skills.joinery,
    },
    {
      title: 'Materials & Production',
      items: CV_DATA.skills.materials,
    },
    {
      title: 'Hardware & Installation',
      items: CV_DATA.skills.hardware,
    },
    {
      title: 'Tools & Software',
      items: CV_DATA.skills.toolsAndSoftware,
    },
  ];

  const { additionalExperience } = CV_DATA;

  return (
    <section id="experience" className="py-14 sm:py-18 bg-zinc-950 border-b border-zinc-800/80 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10 space-y-1.5">
          <p className="text-xs font-medium text-amber-400">
            Background & Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Experience & Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Work History */}
          <div className="lg:col-span-6 space-y-10">
            {CV_DATA.primaryExperience.map((job, idx) => (
              <div key={idx} className="space-y-4">
                <div className="pb-3 border-b border-zinc-800">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {job.title}
                    </h3>
                    <span className="text-xs font-mono-tabular text-amber-400">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">
                    {job.company} · {job.location}
                  </p>
                </div>

                <ul className="space-y-2.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-amber-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Parallel Role */}
            <div className="pt-6 border-t border-zinc-800/80 space-y-4">
              <div className="pb-3 border-b border-zinc-800">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {additionalExperience.title}
                  </h3>
                  <span className="text-xs font-mono-tabular text-zinc-400">
                    {additionalExperience.period}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-1">
                  {additionalExperience.company} · {additionalExperience.location}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                {additionalExperience.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs sm:text-sm text-zinc-400 pt-1">
                {additionalExperience.tradeStatements.join(' ')}
              </p>
            </div>
          </div>

          {/* Right Column: Skills & Target Roles */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {skillGroups.map((group, idx) => (
                <div key={idx} className="space-y-3 pb-6 border-b border-zinc-800/70">
                  <h3 className="text-sm font-semibold text-white">
                    {group.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold text-white">
                Target Roles
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {CV_DATA.targetRoles.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
