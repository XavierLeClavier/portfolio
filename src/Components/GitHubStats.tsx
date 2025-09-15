const GitHubStats = () => {
    return (
        <div className="flex flex-col items-center">
            <img
                src="https://github-readme-stats.vercel.app/api?username=XavierLeClavier&show_icons=true&theme=tokyonight&show=prs_merged_percentage"
                alt=""
                className="w-full max-w-lg mb-2"
            />
            <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=XavierLeClavier&theme=tokyonight"
                alt=""
                className="w-full max-w-lg"
            />
        </div>
    );
};

export default GitHubStats;
