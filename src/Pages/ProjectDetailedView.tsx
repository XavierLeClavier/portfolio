import { useParams, useNavigate, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useContent } from "../i18n";
import { getIcon } from "../data/icons";
import { findProject } from "../data/projects";
import { formatRange } from "../lib/dates";

type Prose = string | string[];

interface ProjectItem {
  name: string;
  subtitle?: string;
  summary?: string;
  description?: Prose;
  role?: Prose;
  context?: Prose;
  objectives?: Prose;
  realisation?: Prose;
  projectManagement?: Prose;
  technical?: Prose;
  outcome?: Prose;
  progression?: Prose;
  keywords?: string[];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-purple-300 border-b border-purple-500/30 pb-1">{title}</h2>
      {children}
    </div>
  );
}

export default function ProjectDetailedView() {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const c = useContent("projects");

  const data = findProject(projectName);
  const item = projectName
    ? (c.items as Record<string, ProjectItem>)[projectName]
    : undefined;

  if (!data || !item) {
    return (
      <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-xl">{c.detail.notFound}</p>
        <button
          onClick={() => navigate("/projects")}
          className="px-4 py-2 border border-purple-500/50 rounded text-purple-300 hover:bg-purple-900/30 transition-colors"
        >
          {c.detail.back}
        </button>
      </div>
    );
  }

  const s = c.detail.sections;
  const isMission = Boolean(item.context);
  const isExternalUrl = data.url ? /^https?:\/\//.test(data.url) : false;
  const dateLabel = formatRange(data.startDate, data.endDate, data.ongoing);

  const para = (text: Prose) =>
    Array.isArray(text) ? (
      <div className="space-y-3">
        {text.map((p, i) => (
          <p key={i} className="text-gray-300 leading-relaxed">{p}</p>
        ))}
      </div>
    ) : (
      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{text}</p>
    );

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border-2 border-purple-500/30">
          <div className="bg-gradient-to-t from-gray-900 to-purple-900/40 p-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-purple-400">{item.name}</span>
              </h1>
              <p className="text-gray-400 mt-1">
                {item.subtitle}
                {dateLabel && <> — {dateLabel}</>}
              </p>
            </div>
            {data.image && (
              <img src={data.image} alt={item.name} className="h-20 w-auto object-contain" />
            )}
          </div>

          <div className="p-6">
            {isMission ? (
              <>
                {item.context && <Section title={s.context}>{para(item.context)}</Section>}
                {item.objectives && <Section title={s.objectives}>{para(item.objectives)}</Section>}
                {item.realisation && <Section title={s.realisation}>{para(item.realisation)}</Section>}
                {item.projectManagement && (
                  <Section title={s.projectManagement}>{para(item.projectManagement)}</Section>
                )}
                {item.technical && <Section title={s.technical}>{para(item.technical)}</Section>}
                {item.progression && <Section title={s.progression}>{para(item.progression)}</Section>}
                {item.outcome && <Section title={s.outcome}>{para(item.outcome)}</Section>}
              </>
            ) : (
              <>
                {item.description && <Section title={s.description}>{para(item.description)}</Section>}
                {item.role && <Section title={s.role}>{para(item.role)}</Section>}
              </>
            )}

            <Section title={s.technologies}>
              <div className="flex flex-wrap gap-4">
                {data.technologies.map((tech) => (
                  <div key={tech} className="relative group">
                    <div className="flex items-center justify-center p-2 rounded-lg bg-gray-700 hover:bg-purple-900 transition-colors">
                      {getIcon(tech) || <span className="text-sm text-white">{tech}</span>}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-purple-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tech}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {item.keywords && item.keywords.length > 0 && (
              <Section title={s.keywords}>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <span key={keyword} className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm hover:bg-purple-800 transition-colors">
                      {keyword}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            <div className="flex flex-wrap gap-4 mt-8">
              {data.url && (isExternalUrl ? (
                <a href={data.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                  {c.detail.visitWebsite}
                </a>
              ) : (
                <Link to={data.url} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                  {c.detail.visitWebsite}
                </Link>
              ))}
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-purple-800 transition flex items-center gap-2">
                  <FaGithub className="text-purple-300" />
                  {c.detail.githubRepo}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 border border-purple-500/50 rounded text-purple-300 hover:bg-purple-900/30 transition-colors"
          >
            {c.detail.back}
          </button>
        </div>
      </div>
    </div>
  );
}
