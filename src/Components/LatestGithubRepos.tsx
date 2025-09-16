import { useEffect, useState } from "react";
import Loading from "./Loading";
import { techIcons } from "../experiences/icons";

interface Repo {
  name: string;
  description: string;
  html_url: string;
  languages: string[];
  latestCommit: {
    message: string;
    date: string;
    url: string;
    author: string;
  } | null;
}

const CACHE_KEY = "latest_github_repos";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export default function LatestGithubRepos() {
  const [showAll, setShowAll] = useState(false);
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      setError(null);
      // Check cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setRepos(data);
          setLoading(false);
          return;
        }
      }
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {};

        // 1. Get my own public repos
        const repoRes = await fetch(
          "https://api.github.com/users/XavierLeClavier/repos?per_page=100",
          { headers }
        );
        if (!repoRes.ok) throw new Error("Failed to fetch repositories");
        const repoData = await repoRes.json();

        // 2. Get latest public commits by me (across all repos)
        const commitHeaders = { ...headers, Accept: "application/vnd.github.cloak-preview" };
        const commitRes = await fetch(
          `https://api.github.com/search/commits?q=author:XavierLeClavier&sort=author-date&order=desc&per_page=10`,
          { headers: commitHeaders }
        );
        if (!commitRes.ok) throw new Error("Failed to fetch contributions");
        const commitData = await commitRes.json();

        // 3. Build a set of unique repos from my commits and my own repos
        const repoMap: Record<string, Repo> = {};

        // Add my own repos
        for (const repo of repoData) {
          // Languages
          const langRes = await fetch(repo.languages_url, { headers });
          const langData = langRes.ok ? await langRes.json() : {};
          // Latest commit
          const latestCommitRes = await fetch(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
            { headers }
          );
          let latestCommit = null;
          if (latestCommitRes.ok) {
            const latestCommitData = await latestCommitRes.json();
            if (latestCommitData.length > 0) {
              latestCommit = {
                message: latestCommitData[0].commit.message,
                date: latestCommitData[0].commit.author.date,
                url: latestCommitData[0].html_url,
                author: latestCommitData[0].commit.author.name,
              };
            }
          }
          repoMap[repo.full_name] = {
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            languages: Object.keys(langData),
            latestCommit,
          };
        }

        // Add repos from my latest commits
        for (const item of commitData.items) {
          const repo = item.repository;
          if (!repoMap[repo.full_name]) {
            // Languages
            const langRes = await fetch(repo.languages_url, { headers });
            const langData = langRes.ok ? await langRes.json() : {};
            // Latest commit
            const latestCommit = {
              message: item.commit.message,
              date: item.commit.author.date,
              url: item.html_url,
              author: item.commit.author.name,
            };
            repoMap[repo.full_name] = {
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              languages: Object.keys(langData),
              latestCommit,
            };
          } else {
            // If already present, update latestCommit if this commit is newer
            const existing = repoMap[repo.full_name];
            const existingDate = existing.latestCommit ? new Date(existing.latestCommit.date).getTime() : 0;
            const newDate = new Date(item.commit.author.date).getTime();
            if (newDate > existingDate) {
              existing.latestCommit = {
                message: item.commit.message,
                date: item.commit.author.date,
                url: item.html_url,
                author: item.commit.author.name,
              };
            }
          }
        }

        // 4. Get all repos as array and sort by latest commit date
        const allRepos = Object.values(repoMap).filter(r => r.latestCommit);
        allRepos.sort((a, b) => {
          const dateA = a.latestCommit ? new Date(a.latestCommit.date).getTime() : 0;
          const dateB = b.latestCommit ? new Date(b.latestCommit.date).getTime() : 0;
          return dateB - dateA;
        });

        // 5. Only keep the last 6
        const last6Repos = allRepos.slice(0, 6);
        setRepos(last6Repos);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: last6Repos, timestamp: Date.now() })
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center">
        <p>Failed to load GitHub repositories.</p>
        <p className="text-xs">{error}</p>
      </div>
    );
  if (!repos || repos.length === 0)
    return <div className="text-gray-400 text-center">No repositories found.</div>;

  // Categorize repos by last commit date
  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const monthMs = 30 * 24 * 60 * 60 * 1000;
  const sixMonthMs = 6 * 30 * 24 * 60 * 60 * 1000;
  const yearMs = 365 * 24 * 60 * 60 * 1000;

  const week: Repo[] = [];
  const month: Repo[] = [];
  const sixMonth: Repo[] = [];
  const year: Repo[] = [];
  const older: Repo[] = [];

  for (const repo of repos) {
    if (!repo.latestCommit) continue;
    const commitTime = new Date(repo.latestCommit.date).getTime();
    const age = now - commitTime;
    if (age <= weekMs) {
      week.push(repo);
    } else if (age <= monthMs) {
      month.push(repo);
    } else if (age <= sixMonthMs) {
      sixMonth.push(repo);
    } else if (age <= yearMs) {
      year.push(repo);
    } else {
      older.push(repo);
    }
  }

  // Limit total repos to 6, prioritizing newer categories
  const categories: { label: string; repos: Repo[] }[] = [];
  let count = 0;
  if (week.length > 0 && count <= 6) {
    categories.push({ label: "What I've been working on for the last week", repos: week.slice(0, 6 - count) });
    count += week.length;
  }
  if (month.length > 0 && count <= 6) {
    categories.push({ label: "This is what I've been working on for the last month", repos: month.slice(0, 6 - count) });
    count += month.length;
  }
  if (sixMonth.length > 0 && count <= 6) {
    categories.push({ label: "What I've been working on for the last 6 months", repos: sixMonth.slice(0, 6 - count) });
    count += sixMonth.length;
  }
  if (year.length > 0 && count <= 6) {
    categories.push({ label: "This year I worked on this", repos: year.slice(0, 6 - count) });
    count += year.length;
  }
  if (older.length > 0 && count <= 6) {
    categories.push({ label: "I haven't touched this for more than a year", repos: older.slice(0, 6 - count) });
    count += older.length;
  }

  return (
    <>
    <h2 className="text-2xl font-bold text-purple-400 mb-4">Latest GitHub Repositories</h2>
      <p className="text-gray-400 mb-4">Here are some of my latest projects on GitHub, some of which are still in progress ;)</p>
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg max-w-2xl mx-auto mb-6">
      
      {categories.slice(0, 2).map(cat => (
        <div key={cat.label} className="mb-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">{cat.label}</h3>
          <ul className="space-y-6">
            {cat.repos.map((repo) => (
              <li key={repo.name} className="bg-gray-800 rounded-lg p-4 shadow">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-purple-300 hover:underline"
                >
                  {repo.name}
                </a>
                <p className="text-gray-300 mb-2">{repo.description || "No description."}</p>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  {repo.languages.length > 0 ? (
                    repo.languages.map((lang) => (
                      <span key={lang} className="flex items-center gap-1 bg-purple-700 text-white px-2 py-1 rounded text-xs">
                        {techIcons[lang] ? (
                          <span className="inline-block align-middle">{techIcons[lang]}</span>
                        ) : null}
                        {lang}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">No languages detected</span>
                  )}
                </div>
                {repo.latestCommit ? (
                  <div className="text-xs text-gray-400">
                    <span className="font-semibold text-purple-300">Latest commit:</span> {repo.latestCommit.message}
                    <br />
                    <span>by {repo.latestCommit.author} on {new Date(repo.latestCommit.date).toLocaleString()}</span>
                    <br />
                    <a
                      href={repo.latestCommit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      View commit
                    </a>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">No commit info available.</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* Reveal more categories with smooth transition */}
      {categories.length > 2 && !showAll && (
        <div className="flex justify-end my-2">
          <button
            className="px-2 py-1 bg-transparent text-purple-400 border border-purple-400 rounded text-sm shadow-none font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 hover:bg-purple-600/70 active:bg-purple-900/10"
            onClick={() => setShowAll(true)}
          >
            See more
          </button>
        </div>
      )}
      <div
        className={`transition-all duration-500 ${showAll ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        style={{ overflow: 'hidden' }}
      >
        {showAll && (() => {
          // Show all 6 repos regardless of category
          const allRepos = repos || [];
          return (
            <div>
              <ul className="space-y-6">
                {allRepos.map((repo) => (
                  <li key={repo.name} className="bg-gray-800 rounded-lg p-4 shadow">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-purple-300 hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-gray-300 mb-2">{repo.description || "No description."}</p>
                    <div className="flex flex-wrap gap-2 mb-2 items-center">
                      {repo.languages.length > 0 ? (
                        repo.languages.map((lang) => (
                          <span key={lang} className="flex items-center gap-1 bg-purple-700 text-white px-2 py-1 rounded text-xs">
                            {techIcons[lang] ? (
                              <span className="inline-block align-middle">{techIcons[lang]}</span>
                            ) : null}
                            {lang}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No languages detected</span>
                      )}
                    </div>
                    {repo.latestCommit ? (
                      <div className="text-xs text-gray-400">
                        <span className="font-semibold text-purple-300">Latest commit:</span> {repo.latestCommit.message}
                        <br />
                        <span>by {repo.latestCommit.author} on {new Date(repo.latestCommit.date).toLocaleString()}</span>
                        <br />
                        <a
                          href={repo.latestCommit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:underline"
                        >
                          View commit
                        </a>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">No commit info available.</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </div>
    </div>
    </>
  );
}
