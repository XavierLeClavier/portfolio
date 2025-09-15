import { FaBriefcase, FaHeart } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import workExperience from "../experiences/workexperience.json";
import { useState } from "react";
import volunteerExperience from "../experiences/volunteerexperience.json";
import hobbies from "../experiences/hobbies.json";
import xavchef from "../img/xavchef.jpg";
import xavoile from "../img/xavoile.jpg";
import xavsupersympose from "../img/xavsupersympose.jpg";
import nuitinfo from "../img/nuitinfo.jpg";


type WorkExperience = {
  title: string;
  organization: string;
  period: string;
  details: string[];
  note?: string;
};

type VolunteerExperience = {
  title: string;
  organization: string;
  period: string;
  details: string[];
};

type Hobby = {
  title: string;
  description: string;
  image: string;
};

export default function WhoAmI() {
  const [collapsed, setCollapsed] = useState({
    work: true,
    volunteer: true,
    hobbies: true,
  });

  const allCollapsed = collapsed.work && collapsed.volunteer && collapsed.hobbies;
  const allExpanded = !collapsed.work && !collapsed.volunteer && !collapsed.hobbies;

  const handleToggleAll = () => {
    if (allCollapsed || !allExpanded) {
      setCollapsed({ work: false, volunteer: false, hobbies: false });
    } else {
      setCollapsed({ work: true, volunteer: true, hobbies: true });
    }
  };

  const handleToggle = (key: "work" | "volunteer" | "hobbies") => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Header section with photo, name and description */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="mb-6">
          <img
            src={xavsupersympose}
            alt="Xavier's Image"
            className="w-48 h-48 rounded-full mx-auto border-4 border-purple-500 object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-purple-400">
          Xavier Lacroix
        </h1>
        <p className="text-xl text-gray-100">
          Data Analyst & Aspiring Data Engineer
        </p>
        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-gray-100">
            I take great pleasure in transforming complex data into actionable
            insights to drive business decisions. With expertise in data
            visualization and programming, I'm passionate about solving
            real-world problems through data and machine learning.
          </p>
        </div>
      </div>

      {/* Expand/Collapse All Button */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow"
          onClick={handleToggleAll}
        >
          {allCollapsed ? "Expand All" : "Collapse All"}
        </button>
      </div>

      {/* Work Experience */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FaBriefcase className="text-purple-500 mr-3" />
            <span className="border-b-2 border-purple-500 pb-1">Work Experience</span>
          </h2>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-purple-400 px-3 py-1 rounded"
            onClick={() => handleToggle("work")}
          >
            {collapsed.work ? "Expand" : "Collapse"}
          </button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${collapsed.work ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}`}
        >
          {(workExperience as WorkExperience[]).map((exp, idx) => (
            <div className="mb-8" key={idx}>
              <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-xl font-semibold text-purple-300">{exp.title}</h3>
                <span className="text-gray-400">{exp.period}</span>
              </div>
              <div className="text-gray-500 mb-2">{exp.organization}</div>
              <ul className="text-gray-100 list-disc pl-5 space-y-2">
                {exp.details.map((d: string, i: number) => (
                  <li key={i}>{d}</li>
                ))}
                {exp.note && <p className="font-bold">{exp.note}</p>}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Work */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FaHeart className="text-purple-500 mr-3" />
            <span className="border-b-2 border-purple-500 pb-1">Volunteer Work</span>
          </h2>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-purple-400 px-3 py-1 rounded"
            onClick={() => handleToggle("volunteer")}
          >
            {collapsed.volunteer ? "Expand" : "Collapse"}
          </button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${collapsed.volunteer ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}`}
        >
          {(volunteerExperience as VolunteerExperience[]).map((exp, idx) => (
            <div className="mb-8" key={idx}>
              <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-xl font-semibold text-purple-300">{exp.title}</h3>
                <span className="text-gray-400">{exp.period}</span>
              </div>
              <div className="text-gray-500 mb-2">{exp.organization}</div>
              <ul className="text-gray-100 list-disc pl-5 space-y-2">
                {exp.details.map((d: string, i: number) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies and Passions */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <TbStarsFilled className="text-purple-500 mr-3" />
            <span className="border-b-2 border-purple-500 pb-1">Hobbies & Passions</span>
          </h2>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-purple-400 px-3 py-1 rounded"
            onClick={() => handleToggle("hobbies")}
          >
            {collapsed.hobbies ? "Expand" : "Collapse"}
          </button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${collapsed.hobbies ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(hobbies as Hobby[]).map((hobby, idx) => {
              const imgSrc = hobby.image === "xavchef.jpg" ? xavchef : hobby.image === "xavoile.jpg" ? xavoile : hobby.image === "nuitinfo.jpg" ? nuitinfo : undefined;
              return (
                <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors border-l-4 border-purple-500 flex flex-col justify-between" key={idx}>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">{hobby.title}</h3>
                  <p className="text-gray-400">{hobby.description}</p>
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={hobby.title}
                      className="mt-4 rounded-lg w-full h-48 object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
