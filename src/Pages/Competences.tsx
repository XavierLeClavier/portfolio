import { Link } from "react-router-dom";
import { useContent } from "../i18n";
import { competencies } from "../data/competencies";
import { getIcon } from "../data/icons";

interface Bloc {
  nom: string;
  niveauLibelle: string;
  apprentissagesCritiques: string[];
  description: string;
  preuves: string;
  progression: string;
  noteReflexive: string;
  axesProgression: string[];
}

function Stars({ value }: { value: number }) {
  const starValue = value / 20;
  return (
    <div className="flex items-center" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        let fill = 0;
        if (i < Math.floor(starValue)) fill = 100;
        else if (i === Math.floor(starValue)) fill = (starValue % 1) * 100;
        return (
          <div key={i} className="relative inline-block text-2xl leading-none">
            <span className="text-gray-600">★</span>
            <div className="absolute top-0 left-0 overflow-hidden text-purple-400" style={{ width: `${fill}%` }}>
              <span>★</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Competences() {
  const c = useContent("competences");
  const projectItems = useContent("projects").items as Record<string, { name: string }>;
  const blocs = c.blocs as Record<string, Bloc>;

  return (
    <div className="bg-gray-800 text-white min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center pt-10 mb-4">{c.title}</h1>
        <p className="text-center text-gray-300 mb-4 max-w-3xl mx-auto">{c.intro}</p>
        <p className="text-center text-gray-500 text-sm mb-10 max-w-3xl mx-auto">{c.todoNote}</p>

        <div className="space-y-8">
          {competencies.map((comp) => {
            const bloc = blocs[comp.id];
            if (!bloc) return null;
            return (
              <article key={comp.id} className="border border-gray-700 rounded-lg p-6 bg-gray-900 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span className="text-xs font-mono text-purple-400 border border-purple-500/40 rounded px-1.5 py-0.5">
                    {comp.code}
                  </span>
                  <h2 className="text-xl font-semibold">{bloc.nom}</h2>
                </div>
                <p className="text-sm text-purple-300 mb-2">
                  {comp.niveauVise} — {bloc.niveauLibelle}
                </p>
                <Stars value={comp.niveauAutoEval} />

                <p className="mt-3 text-gray-300">{bloc.description}</p>

                <div className="mt-4">
                  <h3 className="font-medium text-purple-300">{c.acLabel}</h3>
                  <ul className="list-disc pl-5 mt-1 text-gray-300 text-sm space-y-1">
                    {bloc.apprentissagesCritiques.map((ac, i) => (
                      <li key={i}>{ac}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-purple-300">{c.evidenceLabel}</h3>
                  <p className="text-gray-300 text-sm mt-1">{bloc.preuves}</p>
                </div>

                <div className="mt-3">
                  <h3 className="font-medium text-purple-300">{c.projectsLabel}</h3>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {comp.projectIds.map((id) => (
                      <li key={id}>
                        <Link
                          to={`/projects/${id}`}
                          className="text-sm px-2 py-0.5 rounded bg-gray-800 text-purple-300 hover:bg-purple-900/40"
                        >
                          {projectItems[id]?.name ?? id}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-purple-300">{c.progressionLabel}</h3>
                  <p className="text-gray-300 text-sm mt-1">{bloc.progression}</p>
                </div>

                <div className="mt-4 border-l-4 border-purple-500 bg-gray-800/60 p-4 rounded-r">
                  <h3 className="font-medium text-purple-300">{c.reflectionLabel}</h3>
                  <p className="text-gray-200 text-sm mt-1 italic">{bloc.noteReflexive}</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-purple-300">{c.axesLabel}</h3>
                  <ul className="list-disc pl-5 mt-1 text-gray-400 text-sm space-y-1">
                    {bloc.axesProgression.map((axe, i) => (
                      <li key={i}>{axe}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Stack technique */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-3">{c.stackTechnique.title}</h2>
          <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto">{c.stackTechnique.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.stackTechnique.categories.map((cat) => (
              <div key={cat.title} className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.techs.map((tech) => (
                    <div key={tech} className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                      {getIcon(tech) && <span>{getIcon(tech)}</span>}
                      <span className="text-gray-200 text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">{c.stackTechnique.languesTitle}</h3>
              <ul className="space-y-1">
                {c.stackTechnique.langues.map((l) => (
                  <li key={l.nom} className="text-gray-200 text-sm">
                    <span className="font-medium">{l.nom}</span>{" "}
                    <span className="text-gray-400">— {l.niveau}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
