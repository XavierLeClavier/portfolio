import { useEffect, useState } from "react";
import { useContent } from "../i18n";
import { site, githubRepoPath } from "../data/site";

type Commit = {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
    author: {
        login: string;
        avatar_url: string;
    } | null;
    html_url: string;
};

export default function VersionLog() {
    const copy = useContent("versionLog");
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);
    const repoUrl = `${site.social.github}/${site.github.repo}`;

    useEffect(() => {
        fetch(
            `https://api.github.com/repos/${githubRepoPath}/commits?per_page=20`
        )
            .then((res) => res.json())
            .then((data) => {
                setCommits(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen py-12 px-4 md:px-16 text-white">
            <h1 className="text-3xl font-bold mb-4 text-purple-400">{copy.title}</h1>
            <p className="mb-6 text-gray-300">
                {copy.introPrefix}{" "}
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-purple-400 hover:text-purple-300"
                >
                    github.com/{githubRepoPath}
                </a>
            </p>
            {loading ? (
                <p className="text-lg text-gray-400">{copy.loading}</p>
            ) : (
                <ul className="list-none p-0">
                    {commits.map((commit) => (
                        <li
                            key={commit.sha}
                            className="border-b border-gray-700 mb-6 pb-6"
                        >
                            <div className="flex items-center">
                                {commit.author && (
                                    <img
                                        src={commit.author.avatar_url}
                                        alt={commit.author.login}
                                        className="w-8 h-8 rounded-full mr-3 border border-purple-400"
                                    />
                                )}
                                <strong className="text-white">{commit.commit.author.name}</strong>
                                <span className="ml-3 text-gray-400 text-sm">
                                    {new Date(commit.commit.author.date).toLocaleString("fr-FR")}
                                </span>
                            </div>
                            <div className="mt-2">
                                <a
                                    href={commit.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-purple-400 hover:text-purple-300 break-words"
                                >
                                    {commit.commit.message}
                                </a>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                {copy.sha} {commit.sha.slice(0, 7)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
