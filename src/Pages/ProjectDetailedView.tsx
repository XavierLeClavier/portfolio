import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { techIcons } from "../experiences/icons";
import { FaGithub } from "react-icons/fa";
import projectsData from "../experiences/projects.json";

interface Project {
  name: string;
  subtitle: string;
  url: string;
  image: string;
  github: string;
  description: string;
  implication: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  keywords: string[];
}

export default function ProjectDetailedView() {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectName) {
      navigate("/projects");
      return;
    }

    // Convert URL format (with hyphens) to project name format (with spaces)
    const urlProjectName = projectName.replace(/-/g, " ");

    // Find the project by comparing normalized names (case insensitive)
    const foundProject = projectsData.find(
      (p) => p.name.toLowerCase() === urlProjectName.toLowerCase()
    );

    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate("/projects");
    }

    setLoading(false);
  }, [projectName, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Project not found
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border-2 border-purple-500/30">
          {/* Header */}
          <div className="bg-gradient-to-t from-gray-900 to-purple-900/40 p-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-purple-400">{project.name}</span>
              </h1>
              <p className="text-gray-400 mt-1">
                {project.subtitle} - {project.startDate}{" "}
                {project.endDate && <>to {project.endDate}</>}
              </p>
            </div>
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                className="h-20 w-auto object-contain"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-300 border-b border-purple-500/30 pb-1">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-300 border-b border-purple-500/30 pb-1">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="relative group">
                    <div className="flex items-center justify-center p-2 rounded-lg bg-gray-700 hover:bg-purple-900 transition-colors">
                      {techIcons[tech] || (
                        <span className="text-sm text-white">{tech}</span>
                      )}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-purple-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-300 border-b border-purple-500/30 pb-1">
                Work
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {project.implication}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-300 border-b border-purple-500/30 pb-1">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm hover:bg-purple-800 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Visit Website
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-purple-800 transition flex items-center gap-2"
                >
                  <FaGithub className="text-purple-300" />
                  GitHub Repository
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 border border-purple-500/50 rounded text-purple-300 hover:bg-purple-900/30 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
}
