/**
 * Single source of truth for external identity. Previously these values were
 * duplicated (with three different spellings of the GitHub username) across
 * Home, GitHubStats, LatestGithubRepos, VersionLog and Footer.
 *
 * The GitHub username casing matches the git remote
 * (`git@github.com:XavierLeClavier/portfolio.git`).
 */
export const site = {
  github: {
    username: "XavierLeClavier",
    repo: "portfolio",
    avatar: "https://avatars.githubusercontent.com/u/146034833?v=4",
  },
  social: {
    github: "https://github.com/XavierLeClavier",
    linkedin: "https://linkedin.com/in/lacroixxavier",
    email: "mailto:xavier.stoa@gmail.com",
  },
} as const;

/** `owner/repo`, e.g. for the GitHub commits API and repo links. */
export const githubRepoPath = `${site.github.username}/${site.github.repo}`;
