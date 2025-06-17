import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BurgerHeader from "./Components/BurgerHeader";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading"

const Home = React.lazy(() => import("./Pages/Home"));
const WhoAmI = React.lazy(() => import("./Pages/WhoAmI"));
const Projects = React.lazy(() => import("./Pages/Projects"));
const Skills = React.lazy(() => import("./Pages/Skills"));
const ProjectDetailedView = React.lazy(() => import("./Pages/ProjectDetailedView"));

function App() {

  return (
    <>
      <BrowserRouter>
        <BurgerHeader />
        <React.Suspense fallback={<Loading />}>
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
