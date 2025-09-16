import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function BurgerHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile device based on window width
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop: show on hover, Mobile: show on click
  const handleMouseEnter = () => {
    if (!isMobile) setIsOpen(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsOpen(false);
  };
  const handleClick = () => {
    if (isMobile) setIsOpen((prev) => !prev);
  };

  // Enlarge hover/click zone for easier navigation
  return (
    <div
      className="fixed top-4 right-4 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {/* Expanded hover zone */}
      <div
        className="relative"
        style={!isMobile ? { minHeight: "75px", minWidth: "75px" } : undefined}
      >
        {/* Burger Icon */}
        <div
          className="absolute top-0 right-0 flex flex-col items-center justify-center w-14 h-14 space-y-2 bg-gray-800 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-700"
          aria-label="Menu"
          onClick={handleClick}
        >
          <span className="block w-8 h-1 bg-white"></span>
          <span className="block w-8 h-1 bg-white"></span>
          <span className="block w-8 h-1 bg-white"></span>
        </div>

        {/* Dropdown Menu with smooth transition */}
        <div
          ref={menuRef}
          className={`absolute right-0 top-16 w-56 bg-gray-900 border border-purple-500/30 rounded-lg shadow-lg shadow-purple-500/20 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-auto max-h-[60vh]
            ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
          style={{
            transformOrigin: "top right",
          }}
        >
          <ul className="flex flex-col p-5 space-y-4 text-gray-200">
            <li>
              <NavLink
                to="/"
                className="block px-4 py-3 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => { if (isMobile) setIsOpen(false); }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/me"
                className="block px-4 py-3 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => { if (isMobile) setIsOpen(false); }}
              >
                Who am I ?
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className="block px-4 py-3 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => { if (isMobile) setIsOpen(false); }}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/skills"
                className="block px-4 py-3 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => { if (isMobile) setIsOpen(false); }}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/technologies"
                className="block px-4 py-3 rounded-md hover:bg-gray-800 hover:text-purple-400 transition-colors duration-200"
                onClick={() => { if (isMobile) setIsOpen(false); }}
              >
                My tech stack
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
