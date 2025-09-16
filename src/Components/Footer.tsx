import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">Xavier Lacroix</h3>
                        <p className="text-gray-300 mt-1">your data guy</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <a href="https://github.com/XavierLeClavier" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                            GitHub
                        </a>
                        <a href="https://linkedin.com/in/lacroixxavier" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                            LinkedIn
                        </a>
                        <a href="mailto:xavier.stoa@gmail.com" className="hover:text-gray-400 transition-colors">
                            Email
                        </a>
                    </div>
                </div>
                
                <div className="mt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Xavier Lacroix. All rights reserved.</p>
                    <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-2">
                        <Link to="/version-log" className="hover:text-gray-200 underline">Changelog</Link>
                        <Link to="/" className="hover:text-gray-200 underline ml-4">Home</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};