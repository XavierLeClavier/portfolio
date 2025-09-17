
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import Project from "../Components/Project"
import projectsData from "../experiences/projects.json"

interface ProjectData {
    name: string;
    subtitle: string;
    url?: string;
    image?: string;
    github?: string;
    description: string;
    technologies: string[];
    keywords: string[];
}

export default function Projects() {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
                const timer = setTimeout(() => setLoading(false), 500);
                return () => clearTimeout(timer);
        }, []);

        if (loading) {
                return <Loading fullscreen={true} />;
        }

        return (
                <div className="flex flex-col items-center bg-gray-800 ">
                        <h1 className="text-4xl font-bold text-white mt-8 mb-2">My projects</h1>
                        <p className="text-white mx-8 lg:mx-40 lg:mt-8 mb-4 text-center">For the last 10 years, I've been putting my ideas into practice through IT projects. Here is a compilation of my most recent ones, spanning over multiple themes and skillsets.</p>
                        <p className="text-gray-400 mb-6">Hover over the tech icons to get their name</p>
                        <div className="flex flex-wrap items-center gap-24 justify-center mt-5 mx-3">
                                {(projectsData as ProjectData[]).map((project, index) => (
                                        <Project
                                                key={index}
                                                name={project.name}
                                                subtitle={project.subtitle}
                                                url={project.url || ""}
                                                image={project.image || ""}
                                                github={project.github || ""}
                                                description={project.description}
                                                technologies={project.technologies}
                                                keywords={project.keywords}
                                        />
                                ))}
                        </div>
                </div>
        );
}
