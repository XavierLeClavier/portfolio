import type { Content } from "./fr";
import common from "./en/common.json";
import home from "./en/home.json";
import parcours from "./en/parcours.json";
import projects from "./en/projects.json";
import competences from "./en/competences.json";
import bilan from "./en/bilan.json";
import versionLog from "./en/versionLog.json";

/**
 * English content bundle. `satisfies Content` makes every missing or
 * mismatched key against the French contract (`src/content/fr.ts`) a
 * compile error.
 */
export const en = {
  common,
  home,
  parcours,
  projects,
  competences,
  bilan,
  versionLog,
} satisfies Content;
