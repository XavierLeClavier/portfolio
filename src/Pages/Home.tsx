import { Link } from "react-router-dom";

import GithubStats from "../Components/GitHubStats";

export default function Home() {
    return (
        <>
            <div className="flex justify-center items-center flex-col w-screen">
                <div className="h-screen bg-gray-800 w-screen flex justify-center items-center">
                    <img src="https://avatars.githubusercontent.com/u/146034833?v=4" alt="Xavier Lacroix" className="rounded-full w-48 h-48 border-4 border-gray-300 shadow-lg" />
                    <div>
                        <h1>Xavier Lacroix</h1>
                        <em>your data guy</em>
                    </div>
                    <GithubStats />
                </div>
                <div className="h-screen bg-gray-800 w-screen flex justify-center items-center"></div>
                

                <h2>Check out my projects !</h2>
                <Link to="/projects" className="text-blue-500 underline">
                    View Projects
                </Link>
            </div>
        </>
    )
}