import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { I18nProvider } from "./i18n";
import Loading from "./Components/Loading";

const BurgerHeader = React.lazy(() => import("./Components/BurgerHeader"));
const ScrollToTop = React.lazy(() => import("./Components/ScrollToTop"));
const PageTitle = React.lazy(() => import("./Components/PageTitle"));
const Footer = React.lazy(() => import("./Components/Footer"));

const Home = React.lazy(() => import("./Pages/Home"));
const Parcours = React.lazy(() => import("./Pages/Parcours"));
const Projects = React.lazy(() => import("./Pages/Projects"));
const ProjectDetailedView = React.lazy(() => import("./Pages/ProjectDetailedView"));
const Competences = React.lazy(() => import("./Pages/Competences"));
const Bilan = React.lazy(() => import("./Pages/Bilan"));
const VersionLog = React.lazy(() => import("./Pages/VersionLog"));

import * as Cronitor from '@cronitorio/cronitor-rum';


function App() {
  // Only load Cronitor after app is mounted
  useEffect(() => {
    Cronitor.load(import.meta.env.VITE_CRONITOR_API_KEY, {
      debug: false,
      trackMode: 'off',
    });
  }, []);

  return (
    <I18nProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <BurgerHeader />
          <ScrollToTop />
          <PageTitle />
        </Suspense>
        <Suspense fallback={<Loading fullscreen={true} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<Parcours />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectName" element={<ProjectDetailedView />} />
            <Route path="/competences" element={<Competences />} />
            <Route path="/bilan" element={<Bilan />} />
            <Route path="/version-log" element={<VersionLog />} />
            <Route path="/skills" element={<Navigate to="/competences" replace />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App
