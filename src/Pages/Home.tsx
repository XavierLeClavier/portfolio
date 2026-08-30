import { useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useContent } from "../i18n";
import { site } from "../data/site";

const GithubStats = React.lazy(() => import("../Components/GitHubStats"));
const LatestGithubRepos = React.lazy(() => import("../Components/LatestGithubRepos"));

const LINK_ICONS: Record<string, ReactElement> = {
  user: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-200 group-hover:text-white drop-shadow" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  ),
  projects: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-200 group-hover:text-white drop-shadow" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  skills: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-200 group-hover:text-white drop-shadow" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  report: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-200 group-hover:text-white drop-shadow" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
};

export default function Home() {
  const { hero, links } = useContent("home");
  const { a11y } = useContent("common");
  const [profileScale, setProfileScale] = useState(1);

  useEffect(() => {
    let ticking = false;
    const maxScroll = 350;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const progress = Math.min(scrollY / maxScroll, 1);
          setProfileScale(1 - 0.35 * progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [showRest, setShowRest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setLoading(false);
      setShowRest(true);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col w-screen pb-32 md:pb-0 min-h-screen bg-gray-800 gap-8">
        <div className="">
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 relative"
            style={
              window.innerWidth >= 640
                ? {
                  height: `${profileScale * 100}vh`,
                  transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)",
                }
                : {
                  height: "100vh",
                  transition: "none",
                }
            }
          >
            <img
              src={site.github.avatar}
              alt={a11y.portrait}
              className="rounded-full max-w-48 max-h-48 w-screen h-auto border-4 border-gray-300 shadow-lg"
            />
            <div className="text-white flex flex-col items-center sm:items-start max-w-sm">
              <h1 className="text-4xl font-bold">{hero.name}</h1>
              <em className="text-xl text-gray-300">{hero.brandline}</em>
              <p className="text-sm text-gray-400 mt-2 text-center sm:text-left">{hero.sub}</p>
            </div>
            <a
              href="#"
              className="absolute left-1/2 -translate-x-1/2 bottom-3 p-2 rounded-full bg-gray-700/50 hover:bg-purple-600/30 transition-colors duration-200 shadow-md"
              style={{ zIndex: 2, opacity: 0.7 }}
              aria-label={a11y.scrollDown}
              onClick={e => {
                e.preventDefault();
                const scrollDistance = window.innerHeight * 0.7;
                window.scrollBy({ top: scrollDistance, behavior: "smooth" });
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl mx-auto" id="home-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group px-8 py-6 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 text-white font-semibold rounded-2xl shadow-xl flex items-center gap-4 border-2 border-purple-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-800/40 group-hover:bg-purple-900/60 transition-all duration-300">
                  {LINK_ICONS[link.icon]}
                </div>
                <span className="text-lg group-hover:text-purple-100 group-hover:scale-105 transition-all duration-300">{link.label}</span>
              </Link>
            ))}
          </div>

          <div>
            {loading ? (
              <div className="my-12">
                <Loading fullscreen={false} />
              </div>
            ) : (
              showRest && (
                <>
                  <Suspense fallback={<Loading fullscreen={false} />}>
                    <motion.div
                      className="my-12"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <GithubStats />
                    </motion.div>
                  </Suspense>
                  <Suspense fallback={<Loading fullscreen={false} />}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    >
                      <LatestGithubRepos />
                    </motion.div>
                  </Suspense>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
