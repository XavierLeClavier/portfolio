import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BurgerHeader from "./Components/BurgerHeader";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading"

const Home = React.lazy(() => import("./Pages/Home"));
const WhoAmI = React.lazy(() => import("./Pages/WhoAmI"));
const Projects = React.lazy(() => import("./Pages/Projects"));
const Skills = React.lazy(() => import("./Pages/Skills"));
const ProjectDetailedView = React.lazy(() => import("./Pages/ProjectDetailedView"));

import * as Cronitor from '@cronitorio/cronitor-rum';

function App() {

  useEffect(() => {
    Cronitor.load(import.meta.env.VITE_CRONITOR_API_KEY, {
      debug: false,  // <-- You can enable this to see logs in the console
      trackMode: 'off', // <-- Set to 'off' to avoid history patching issues
    });
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <BurgerHeader />
        {/* Scroll to top on route change */}
        <React.Suspense fallback={<Loading />}>
          {/* Add ScrollToTop just inside BrowserRouter */}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<WhoAmI />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects/:projectName" element={<ProjectDetailedView />} />
          </Routes>
        </React.Suspense>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
