import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const BurgerHeader = React.lazy(() => import("./Components/BurgerHeader"));
const ScrollToTop = React.lazy(() => import("./Components/ScrollToTop"));
const Footer = React.lazy(() => import("./Components/Footer"));
const Loading = React.lazy(() => import("./Components/Loading"));

const Home = React.lazy(() => import("./Pages/Home"));
const WhoAmI = React.lazy(() => import("./Pages/WhoAmI"));
const Projects = React.lazy(() => import("./Pages/Projects"));
const Skills = React.lazy(() => import("./Pages/Skills"));
const ProjectDetailedView = React.lazy(() => import("./Pages/ProjectDetailedView"));
const VersionLog = React.lazy(() => import("./Pages/VersionLog"));
const Technologies = React.lazy(() => import("./Pages/Technologies"));

import * as Cronitor from '@cronitorio/cronitor-rum';


function App() {
  const [showLoading, setShowLoading] = React.useState(true);


  // Only load Cronitor after Loading is hidden
  useEffect(() => {
    if (!showLoading) {
      Cronitor.load(import.meta.env.VITE_CRONITOR_API_KEY, {
        debug: false,
        trackMode: 'off',
      });
    }
  }, [showLoading]);

  // When Loading is mounted, switch to main app
  useEffect(() => {
    if (showLoading) {
      // Use requestAnimationFrame to ensure Loading is rendered first
      requestAnimationFrame(() => setShowLoading(false));
    }
  }, [showLoading]);

  if (showLoading) {
    return <Loading fullscreen={true} />;
  }

  return (
    <BrowserRouter>
      <BurgerHeader />
      <ScrollToTop />
      <React.Suspense fallback={<Loading fullscreen={true} />}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<WhoAmI />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects/:projectName" element={<ProjectDetailedView />} />
          <Route path="/version-log" element={<VersionLog />} />
          <Route path="/technologies" element={<Technologies />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App
