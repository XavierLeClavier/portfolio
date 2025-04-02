import { JSX } from "react";
import { FaReact, FaNodeJs, FaGithub, FaPython, FaCss3Alt, FaPhp, FaJava } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiFastapi, SiJupyter, SiPhpmyadmin, SiTailwindcss, SiOpenstreetmap } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { PiGraph } from "react-icons/pi";

interface ProjectProps {
    name: string;
    subtitle?: string;
    url?: string;
    image: string;
    github: string;
    description: string;
    technologies: string[];
    keywords?: string[];
}

const techIcons: { [key: string]: JSX.Element } = {
    React: <FaReact className="text-blue-500 w-6 h-6" />, 
    TypeScript: <SiTypescript className="text-blue-600 w-6 h-6" />, 
    JavaScript: <SiJavascript className="text-yellow-300 w-6 h-6" />, 
    NodeJS: <FaNodeJs className="text-green-500 w-6 h-6" />, 
    FastAPI: <SiFastapi className="text-green-700 w-6 h-6" />, 
    Firebase: <IoLogoFirebase className="text-orange-400 w-6 h-6" />, 
    Python: <FaPython className="text-yellow-300 w-6 h-6" />, 
    CSS: <FaCss3Alt className="text-blue-500 w-6 h-6" />, 
    Jupyter: <SiJupyter className="text-orange-500 w-6 h-6" />, 
    PHP: <FaPhp className="text-blue-700 w-6 h-6" />, 
    MySQL: <SiPhpmyadmin className="text-blue-500 w-6 h-6" />, 
    Tailwind: <SiTailwindcss className="text-blue-400 w-6 h-6" />, 
    Java: <FaJava className="text-blue-500 w-6 h-6" />, 
    GraphStream: <PiGraph className="text-blue-500 w-6 h-6" />,
    OpenStreetMap: <SiOpenstreetmap className="text-green-500 w-6 h-6" />,
};

export default function Project({ name, subtitle, url, image, github, description, technologies, keywords }: ProjectProps) {
    return (
        <div className="w-sm rounded-lg overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-cover" src={image} alt={name} />
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{name}</h2>
                {subtitle && <h3 className="text-gray-700 text-base mb-2">{subtitle}</h3>}
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex gap-4">
                {url && (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Visit Project
                    </a>
                )}
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                    <FaGithub className="w-5 h-5" /> GitHub
                </a>
            </div>
            <div className="px-6 pt-4">
                <h4 className="font-bold text-lg mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech, index) => (
                        <div key={index} className="relative group flex items-center gap-2">
                            {techIcons[tech] || <span className="text-gray-700">{tech}</span>}
                            <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {keywords && keywords.length > 0 && (
                <div className="px-6 pt-4">
                    <h4 className="font-bold text-lg mb-2">Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                    backgroundColor: `hsl(${Math.random() * 360}, 70%, 90%)`,
                                    color: `hsl(${Math.random() * 360}, 50%, 30%)`,
                                }}
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
