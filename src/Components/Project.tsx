import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { getIcon } from "../data/icons";
import ImageWithPlaceholder from "./ImageWithPlaceholder";
import { useContent } from "../i18n";

export interface ProjectCardProps {
  id: string;
  name: string;
  subtitle?: string;
  summary: string;
  image: string;
  url?: string;
  github?: string;
  technologies: string[];
  keywords?: string[];
}

/** Deterministic pastel colour for a keyword chip (was Math.random per render). */
function keywordStyle(keyword: string) {
  let hash = 0;
  for (let i = 0; i < keyword.length; i++) {
    hash = (hash * 31 + keyword.charCodeAt(i)) % 360;
  }
  return {
    backgroundColor: `hsl(${hash} 45% 22%)`,
    color: `hsl(${hash} 70% 82%)`,
  };
}

export default function Project({
  id,
  name,
  subtitle,
  summary,
  image,
  url,
  github,
  technologies,
  keywords,
}: ProjectCardProps) {
  const { card } = useContent("projects");
  const isExternal = url ? /^https?:\/\//.test(url) : false;

  return (
    <div className="w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 border border-gray-700">
      <div className="bg-gray-900">
        <Link to={`/projects/${id}`} className="bg-gray-900">
          <ImageWithPlaceholder src={image} alt={name} className="w-full h-48 object-cover" shape="rounded" />
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2 text-white">{name}</h2>
            {subtitle && <h3 className="text-gray-300 text-base mb-2">{subtitle}</h3>}
            <p className="text-gray-300 text-base line-clamp-3 overflow-hidden">
              {summary}{" "}
              <span className="text-purple-400 italic">{card.readMore}</span>
            </p>
          </div>
        </Link>
      </div>
      <div className="px-6 pt-4 pb-2 flex gap-4">
        {url && (isExternal ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
            {card.visit}
          </a>
        ) : (
          <Link to={url} className="text-purple-400 hover:text-purple-300">
            {card.visit}
          </Link>
        ))}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
            <FaGithub className="w-5 h-5" /> {card.github}
          </a>
        )}
      </div>
      <div className="px-6 pt-4">
        <h4 className="font-bold text-lg mb-2 text-white">{card.technologies}</h4>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <div key={tech} className="relative group flex items-center gap-2">
              {getIcon(tech) || <span className="text-gray-300">{tech}</span>}
              <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-600 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
      {keywords && keywords.length > 0 && (
        <div className="px-6 pt-4 mb-4">
          <h4 className="font-bold text-lg mb-2 text-white">{card.keywords}</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span key={keyword} className="px-3 py-1 rounded-full text-sm font-medium" style={keywordStyle(keyword)}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
