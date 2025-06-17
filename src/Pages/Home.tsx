import { Link } from "react-router-dom";

import GithubStats from "../Components/GitHubStats";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col w-screen">
        <div className="h-screen bg-gray-800 w-screen flex justify-center items-center flex-col gap-8">
          <div className="flex items-center gap-6">
            <img
              src="https://avatars.githubusercontent.com/u/146034833?v=4"
              alt="Xavier Lacroix"
              className="rounded-full w-48 h-48 border-4 border-gray-300 shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold">Xavier Lacroix</h1>
              <em className="text-xl text-gray-300">your data guy</em>
            </div>
          </div>
          <GithubStats />

          <div className="mt-12 flex flex-col md:flex-row gap-6">
            <Link
              to="/projects"
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Check out my cool projects
            </Link>
            <Link
              to="/skills"
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              Discover all my skills
            </Link>
            <Link
              to="/me"
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Explore my work history
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
