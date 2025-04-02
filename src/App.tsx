import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BurgerHeader from "./Components/BurgerHeader";
const Home = React.lazy(() => import("./Pages/Home"));
const WhoAmI = React.lazy(() => import("./Pages/WhoAmI"));
const Projects = React.lazy(() => import("./Pages/Projects"));
const ContactMe = React.lazy(() => import("./Pages/ContactMe"));

function App() {

  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BurgerHeader />
        </React.Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<WhoAmI />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactMe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
