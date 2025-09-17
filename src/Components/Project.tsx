import { techIcons } from "../experiences/icons";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

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

const projectNameToSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };
export default function Project({ name, subtitle, url, image, github, description, technologies, keywords }: ProjectProps) {
    return (
        <div className="w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 border border-gray-700">
            <div className="bg-gray-900">
                <Link to={projectNameToSlug(name)} className="bg-gray-900">
                    <ImageWithPlaceholder
                        src={image}
                        alt={name}
                        className="w-full h-48 object-cover"
                        shape="rounded"
                    />
                    <div className="px-6 py-4">
                        <h2 className="font-bold text-xl mb-2 text-white">{name}</h2>
                        {subtitle && <h3 className="text-gray-300 text-base mb-2">{subtitle}</h3>}
                        <p className="text-gray-300 text-base line-clamp-3 overflow-hidden">
                            {description.length > 100 ? `${description.substring(0, 100)}... ` : description}
                            {description.length > 100 && <span className="text-purple-400 italic">Click to read more</span>}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="px-6 pt-4 pb-2 flex gap-4">
                {url && (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                        Visit Project
                    </a>
                )}
                { github && (<a href={github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    <FaGithub className="w-5 h-5" /> GitHub
                </a>)}
            </div>
            <div className="px-6 pt-4">
                <h4 className="font-bold text-lg mb-2 text-white">Technologies:</h4>
                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech, index) => (
                        <div key={index} className="relative group flex items-center gap-2">
                            {techIcons[tech] || <span className="text-gray-300">{tech}</span>}
                            <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-600 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {keywords && keywords.length > 0 && (
                <div className="px-6 pt-4 mb-4">
                    <h4 className="font-bold text-lg mb-2 text-white">Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                    backgroundColor: `hsl(${Math.random() * 360}, 70%, 25%)`,
                                    color: `hsl(${Math.random() * 360}, 80%, 80%)`,
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
