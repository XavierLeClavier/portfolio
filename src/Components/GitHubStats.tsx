import { useContent } from "../i18n";
import { site } from "../data/site";

const GitHubStats = () => {
    const { githubStats } = useContent("home");
    const user = site.github.username;
    return (
        <>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">{githubStats.title}</h2>
            <p className="text-gray-400">{githubStats.subtitle}</p>
            <em className="text-gray-500 mb-8">{githubStats.note}</em>
            <div className="flex flex-col items-center">
                <img
                    src={`https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight&show=prs_merged_percentage`}
                    alt=""
                    className="w-full max-w-lg mb-2"
                />
                <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=tokyonight`}
                    alt=""
                    className="w-full max-w-lg"
                />
            </div>
        </>
    );
};

export default GitHubStats;
