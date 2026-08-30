import data from "./projects.json";

export type ProjectCategory = "alternance" | "stage" | "perso" | "ecole";

export interface ProjectData {
  id: string;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  url: string;
  image: string;
  github: string;
  /** `YYYY-MM` */
  startDate: string;
  /** `YYYY-MM` or `""` */
  endDate: string;
  ongoing: boolean;
  technologies: string[];
}

export const projects = (data as ProjectData[])
  .slice()
  .sort((a, b) => a.order - b.order);

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const academicProjects = otherProjects.filter((p) => p.category === "ecole");
export const personalProjects = otherProjects.filter((p) => p.category === "perso");

export const findProject = (id: string | undefined): ProjectData | undefined =>
  id ? projects.find((p) => p.id === id) : undefined;
