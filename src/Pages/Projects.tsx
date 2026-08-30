import { useContent } from "../i18n";
import Project from "../Components/Project";
import {
  projects,
  featuredProjects,
  academicProjects,
  personalProjects,
} from "../data/projects";

interface ProjectItem {
  name: string;
  subtitle?: string;
  summary: string;
  keywords?: string[];
}

export default function Projects() {
  const c = useContent("projects");
  const items = c.items as Record<string, ProjectItem>;

  const toCard = (id: string) => {
    const data = projects.find((p) => p.id === id)!;
    const item = items[id];
    return (
      <Project
        key={id}
        id={id}
        name={item.name}
        subtitle={item.subtitle}
        summary={item.summary}
        image={data.image}
        url={data.url || undefined}
        github={data.github || undefined}
        technologies={data.technologies}
        keywords={item.keywords}
      />
    );
  };

  const group = (heading: string, sub: string | undefined, list: typeof projects) => (
    <section className="w-full flex flex-col items-center mt-14">
      <h2 className="text-2xl font-bold text-purple-300">{heading}</h2>
      {sub && <p className="text-gray-400 mx-8 lg:mx-40 mb-6 text-center max-w-3xl">{sub}</p>}
      <div className="flex flex-wrap items-stretch gap-16 justify-center mt-4 mx-3">
        {list.map((p) => toCard(p.id))}
      </div>
    </section>
  );

  return (
    <div className="flex flex-col items-center bg-gray-800 pb-16">
      <h1 className="text-4xl font-bold text-white mt-8 mb-2">{c.list.title}</h1>
      <p className="text-white mx-8 lg:mx-40 lg:mt-8 mb-4 text-center max-w-4xl">{c.list.intro}</p>
      <p className="text-gray-400 mb-2">{c.list.iconHint}</p>

      {group(c.list.missionsHeading, c.list.missionsSubheading, featuredProjects)}
      {group(c.list.academicHeading, c.list.academicSubheading, academicProjects)}
      {group(c.list.personalHeading, c.list.personalSubheading, personalProjects)}
    </div>
  );
}
