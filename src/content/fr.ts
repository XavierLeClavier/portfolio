import common from "./fr/common.json";
import home from "./fr/home.json";
import parcours from "./fr/parcours.json";
import projects from "./fr/projects.json";
import competences from "./fr/competences.json";
import bilan from "./fr/bilan.json";
import versionLog from "./fr/versionLog.json";

/**
 * The full French content bundle, one key per page namespace. This object is the
 * type contract: a future `src/content/en.ts` must be assignable to `Content`,
 * which turns every missing English key into a compile error.
 */
export const fr = {
  common,
  home,
  parcours,
  projects,
  competences,
  bilan,
  versionLog,
};

export type Content = typeof fr;
export type Namespace = keyof Content;
