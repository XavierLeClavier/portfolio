const GitHubStats = () => {
    return (
        <>
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Quick stats</h2>
            <p className="text-gray-400">A quick overview of my coding activity</p>
            <em className="text-gray-500 mb-8">if you aren't a dev this might be gibberish, but I swear it's interesting</em>
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
        </>
    );
};

export default GitHubStats;
