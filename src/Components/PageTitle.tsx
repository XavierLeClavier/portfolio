import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContent } from "../i18n";

/**
 * Keeps `document.title` in sync with the current route. Renders nothing.
 * Titles come from `common.pageTitles`; the project detail route pulls the
 * project name from the projects content.
 */
export default function PageTitle() {
  const { pathname } = useLocation();
  const { pageTitles } = useContent("common");
  const projectItems = useContent("projects").items as Record<string, { name: string }>;

  useEffect(() => {
    let title = pageTitles.home;
    if (pathname === "/me") title = pageTitles.parcours;
    else if (pathname === "/projects") title = pageTitles.projects;
    else if (pathname.startsWith("/projects/")) {
      const id = pathname.split("/")[2];
      const name = projectItems[id]?.name;
      title = name ? pageTitles.projectDetail.replace("{name}", name) : pageTitles.projects;
    } else if (pathname === "/competences") title = pageTitles.competences;
    else if (pathname === "/bilan") title = pageTitles.bilan;
    else if (pathname === "/version-log") title = pageTitles.versionLog;
    document.title = title;
  }, [pathname, pageTitles, projectItems]);

  return null;
}
