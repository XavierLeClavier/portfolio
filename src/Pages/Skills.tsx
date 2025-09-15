import { Link } from "react-router-dom";
import { techIcons } from "../experiences/icons";

export default function Skills() {
  // Define actual skills
  const skills = [
    {
      name: "Carry out",
      frName: "Réaliser",
      description:
        "Through my studies and personal projects, I constantly develop new applications and features. From the conception phase to the final deployment, I ensure that each project meets high standards of quality and performance.",
      projects: ["DESCAR-T", "Didactypo", "Secured Air Enforcer"],
      improvements: [
        "Integrating more complex features",
        "Working with even larger codebases",
      ],
      proExperience: ["Data Analyst Intern at LYSARC", "Sailing instructor", "Camp director"],
      level: 95,
    },
    {
      name: "Optimise",
      frName: "Optimiser",
      description:
        "Through my data-oriented or user-focused projects, I apply best practices to optimize performance and user experience. This includes code refactoring, performance tuning, and implementing efficient algorithms.",
      projects: ["Secured Air Enforcer", "DESCAR-T"],
      improvements: [
        "Fine-tuning LLM models",
        "Choosing the right model",
        "Hyperparameter tuning",
      ],
      proExperience: ["Data Analyst Intern at LYSARC"],
      level: 60,
    },
    {
      name: "Administer",
      frName: "Administrer",
      description:
        "I have experience in managing and deploying applications using modern DevOps practices. This includes setting up CI/CD pipelines, managing cloud resources, and ensuring application reliability.",
      projects: ["Home server", "Self tracker", "Didactypo"],
      improvements: ["MLOps", "Kubernetes", "Docker"],
      proExperience: ["Data Analyst Intern at LYSARC"],
      level: 60,
    },
    {
      name: "Manage",
      frName: "Gérer",
      description:
        "I am a natural team-worker and leader, capable of managing teams and projects effectively. Through school projects, my volunteer work, and summer jobs, I have developed strong organizational and communication skills that allow me to lead projects to success.",
      projects: ["Didactypo", "Secured Air Enforcer"],
      improvements: [
        "Working with more non-technical people",
        "Project management tools",
      ],
      proExperience: ["Data Analyst Intern at LYSARC", "Camp director"],
      level: 70,
    },
    {
      name: "Conduct",
      frName: "Conduire",
      description:
        "I ensure that each project is delivered on time and meets the expectations of stakeholders. I am skilled in project management methodologies, allowing me to effectively plan, execute, and monitor projects from start to finish.",
      projects: ["DESCAR-T", "Didactypo", "Secured Air Enforcer"],
      improvements: ["Working in chalenging high-stress environments"],
      proExperience: ["Data Analyst Intern at LYSARC", "Sailing instructor"],
      level: 80,
    },
    {
      name: "Collaborate",
      frName: "Collaborer",
      description:
        "I thrive in collaborative environments, working closely with team members to achieve common goals. My experience in group projects has taught me the importance of effective communication and teamwork.",
      projects: ["DESCAR-T", "Didactypo", "Secured Air Enforcer"],
      improvements: ["Presenting to non-technical audiences"],
      proExperience: ["Data Analyst Intern at LYSARC", "Sailing instructor", "Camp director"],
      level: 89.5,
    },
  ];

  // Helper function to convert project name to URL slug
  const projectNameToSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="p-8 max-w-7xl mx-auto"></div>
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        My Skills
      </h1>
      <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
        These are the 6 main skills from the national French program. For each,
        I present my experience and mastery level, as well as areas for
        development and projects where I've directly integrated these skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-2 pb-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="border border-gray-700 rounded-lg p-6 bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <p className="text-xs italic text-purple-300">
                {skill.frName} 🇫🇷
              </p>
            </div>
            <p className="mt-2 text-gray-300">{skill.description}</p>

            <div className="mt-4 flex items-center">
              {[...Array(5)].map((_, i) => {
                // Convert skill.level (0-100) to star scale (0-5)
                const starValue = skill.level / 20;

                // Calculate fill percentage for this star (0-100%)
                let fillPercentage;
                if (i < Math.floor(starValue)) {
                  fillPercentage = 100; // Full star
                } else if (i === Math.floor(starValue)) {
                  fillPercentage = (starValue % 1) * 100; // Partial star
                } else {
                  fillPercentage = 0; // Empty star
                }

                return (
                  <div key={i} className="relative inline-block text-3xl">
                    <span className="text-gray-600">★</span>
                    <div
                      className="absolute top-0 left-0 overflow-hidden text-purple-400"
                      style={{ width: `${fillPercentage}%` }}
                    >
                      <span>★</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {skill.improvements && skill.improvements.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-purple-300">
                  Areas for improvement:
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  These are the skills I am still developing and would love to
                  work with.
                </p>
                <ul className="list-disc pl-5 mt-1">
                  {skill.improvements.map((improvement) => (
                    <li key={improvement} className="text-gray-300">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <h4 className="font-medium text-purple-300">Related Projects:</h4>
              <ul className="list-disc pl-5 mt-1">
                {skill.projects.map((project) => (
                  <li key={project} className="text-gray-300">
                    <Link
                      to={`/projects/${projectNameToSlug(project)}`}
                      className="text-purple-400 hover:text-purple-300 hover:underline"
                    >
                      {project}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {skill.proExperience && skill.proExperience.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-purple-300">
                  Real world application:
                </h4>
                <ul className="list-disc pl-5 mt-1">
                  {skill.proExperience.map((improvement) => (
                    <li key={improvement} className="text-gray-300">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

        <div className="my-12 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Technical Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
                {/* Data Science & Analysis */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Data Science & Analysis</h3>
                    <div className="flex flex-wrap gap-4">
                        {['Python', 'Jupyter', 'Power BI', 'Looker', 'AI/ML', 'SAS', 'SQL'].map(tech => (
                            <div key={tech} className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <span className="mr-2">{techIcons[tech]}</span>
                                <span className="text-gray-200">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Frontend */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Frontend</h3>
                    <div className="flex flex-wrap gap-4">
                        {['React', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind'].map(tech => (
                            <div key={tech} className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <span className="mr-2">{techIcons[tech]}</span>
                                <span className="text-gray-200">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Backend */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Backend</h3>
                    <div className="flex flex-wrap gap-4">
                        {['PostgreSQL', 'NodeJS', 'FastAPI', 'PHP', 'Java', 'SQL', 'MySQL', 'Firebase', 'Express'].map(tech => (
                            <div key={tech} className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <span className="mr-2">{techIcons[tech]}</span>
                                <span className="text-gray-200">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* DevOps & Infrastructure */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">DevOps & Infrastructure</h3>
                    <div className="flex flex-wrap gap-4">
                        {['Linux', 'Git', 'Docker', 'Apache Server', 'phpMyAdmin'].map(tech => (
                            <div key={tech} className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <span className="mr-2">{techIcons[tech]}</span>
                                <span className="text-gray-200">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Tools & Other */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 ">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Tools & Specialized Libraries</h3>
                    <div className="flex flex-wrap gap-4">
                        {['JSON', 'GraphStream', 'OpenStreetMap', 'Scrum', 'UML'].map(tech => (
                            <div key={tech} className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <span className="mr-2">{techIcons[tech]}</span>
                                <span className="text-gray-200">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-4">
                        {['🇫🇷 French - Native', '🇦🇺 English - Native', '🇪🇸 Spanish - B1', '🇹🇼 Chinese - HSK 2'].map(lang => (
                            <div key={lang} className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <span className="text-gray-200">{lang}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Link to="/technologies" className="mt-6 inline-block text-purple-400 hover:text-purple-300 hover:underline">
                See my full tech stack & tools (demo) →
            </Link>
        </div>

      <p className="text-center text-gray-300 pb-8 max-w-3xl mx-auto">
        Some of these skills are more mastered than others, and I am
        constantly working to improve them. I love a good challenge and
        learning new things, so I am always looking for opportunities to
        put these skills to the test.
      </p>
    </div>
  );
}
