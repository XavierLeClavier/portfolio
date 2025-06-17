import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function BurgerHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Burger Icon */}
      <button
        className="flex flex-col items-center justify-center w-10 h-10 space-y-1 bg-gray-800 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-gray-900 border border-purple-500/30 rounded-lg shadow-lg shadow-purple-500/20 backdrop-blur-sm transition-all duration-300 ease-in-out">
          <ul className="flex flex-col p-4 space-y-3 text-gray-200">
            <li>
              <NavLink
                to="/"
                className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => window.scrollTo(0, 0)}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/skills"
                className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => window.scrollTo(0, 0)}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/me"
                className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
              >
                Who am I ?
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
