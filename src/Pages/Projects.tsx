import { useContent } from "../i18n";
import Project from "../Components/Project";
import { featuredProjects, otherProjects } from "../data/projects";

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
    const data = [...featuredProjects, ...otherProjects].find((p) => p.id === id)!;
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

  return (
    <div className="flex flex-col items-center bg-gray-800">
      <h1 className="text-4xl font-bold text-white mt-8 mb-2">{c.list.title}</h1>
      <p className="text-white mx-8 lg:mx-40 lg:mt-8 mb-4 text-center">{c.list.intro}</p>
      <p className="text-gray-400 mb-6">{c.list.iconHint}</p>

      <section className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-purple-300 mt-4">{c.list.missionsHeading}</h2>
        <p className="text-gray-400 mx-8 lg:mx-40 mb-6 text-center max-w-3xl">{c.list.missionsSubheading}</p>
        <div className="flex flex-wrap items-stretch gap-16 justify-center mt-2 mx-3">
          {featuredProjects.map((p) => toCard(p.id))}
        </div>
      </section>

      <section className="w-full flex flex-col items-center mt-16 mb-12">
        <h2 className="text-2xl font-bold text-purple-300 mb-8">{c.list.othersHeading}</h2>
        <div className="flex flex-wrap items-stretch gap-16 justify-center mx-3">
          {otherProjects.map((p) => toCard(p.id))}
        </div>
      </section>
    </div>
  );
}
