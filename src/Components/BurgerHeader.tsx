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
                <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg">
                    <ul className="flex flex-col p-4 space-y-2 text-white">
                        <li>
                            <NavLink to="/" className="hover:text-gray-400">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects" className="hover:text-gray-400">
                                Projects
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/me" className="hover:text-gray-400">
                                Who am I ?
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="hover:text-gray-400">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}