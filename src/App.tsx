import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import WhoAmI from "./Pages/WhoAmI";
import Projects from "./Pages/Projects";
import ContactMe from "./Pages/ContactMe";

function App() {

  return (
    <>
      <BrowserRouter>
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
