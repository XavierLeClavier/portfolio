import { useState } from "react";
import { FaBriefcase, FaHeart } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";
import { LuBuilding2, LuServer } from "react-icons/lu";
import { useContent } from "../i18n";
import ImageWithPlaceholder from "../Components/ImageWithPlaceholder";
import workExperience from "../data/workExperience.json";
import volunteerExperience from "../data/volunteerExperience.json";
import hobbiesData from "../data/hobbies.json";
import xavsupersympose from "../img/xavsupersympose.jpg";
import xavoile from "../img/xavoile.jpg";
import xavchef from "../img/xavchef.jpg";
import nuitinfo from "../img/nuitinfo.jpg";

const HOBBY_IMAGES: Record<string, string> = { xavoile, xavchef, nuitinfo };

type ExperienceEntry = {
  title: string;
  organization: string;
  period: string;
  details: string[];
  note?: string;
};

type SectionKey = "work" | "volunteer" | "hobbies";

export default function Parcours() {
  const c = useContent("parcours");
  const { buttons } = useContent("common");

  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    work: false,
    volunteer: true,
    hobbies: true,
  });

  const allCollapsed = collapsed.work && collapsed.volunteer && collapsed.hobbies;

  const toggleAll = () => {
    const next = !allCollapsed;
    setCollapsed({ work: next, volunteer: next, hobbies: next });
  };

  const toggle = (key: SectionKey) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const workItems = workExperience
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((d) => (c.work.items as Record<string, ExperienceEntry>)[d.id])
    .filter(Boolean);

  const volunteerItems = volunteerExperience
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((d) => (c.volunteer.items as Record<string, ExperienceEntry>)[d.id])
    .filter(Boolean);

  const hobbyItems = hobbiesData
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((d) => ({
      ...(c.hobbies.items as Record<string, { title: string; description: string }>)[d.id],
      image: HOBBY_IMAGES[d.image],
    }));

  const renderExperience = (items: ExperienceEntry[]) => (
    <>
      {items.map((exp, idx) => (
        <div className="mb-8" key={idx}>
          <div className="flex flex-col md:flex-row justify-between mb-1">
            <h3 className="text-xl font-semibold text-purple-300">{exp.title}</h3>
            <span className="text-gray-400">{exp.period}</span>
          </div>
          <div className="text-gray-500 mb-2">{exp.organization}</div>
          <ul className="text-gray-100 list-disc pl-5 space-y-2">
            {exp.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          {exp.note && <p className="mt-2 text-sm italic text-gray-400">{exp.note}</p>}
        </div>
      ))}
    </>
  );

  const sectionShell = (
    key: SectionKey,
    icon: React.ReactNode,
    title: string,
    body: React.ReactNode,
  ) => (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-purple-500 mr-3">{icon}</span>
          <span className="border-b-2 border-purple-500 pb-1">{title}</span>
        </h2>
        <button
          className="bg-gray-800 hover:bg-gray-700 text-purple-400 px-3 py-1 rounded"
          onClick={() => toggle(key)}
        >
          {collapsed[key] ? buttons.expand : buttons.collapse}
        </button>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          collapsed[key] ? "max-h-0 opacity-0" : "max-h-[4000px] opacity-100"
        }`}
      >
        {body}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="mb-6 relative w-48 h-48 mx-auto">
          <ImageWithPlaceholder
            src={xavsupersympose}
            alt={c.header.name}
            className="w-48 h-48 mx-auto border-4 border-purple-500 object-cover"
            shape="circle"
            placeholder="/placeholder.svg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-purple-400">{c.header.name}</h1>
        <p className="text-xl text-gray-100">{c.header.role}</p>
        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-gray-100">{c.header.bio}</p>
        </div>
      </div>

      {/* Lysarc */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold flex items-center mb-6">
          <LuBuilding2 className="text-purple-500 mr-3" />
          <span className="border-b-2 border-purple-500 pb-1">{c.lysarc.title}</span>
        </h2>
        <div className="space-y-4 text-gray-100">
          {c.lysarc.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Environnement technique */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold flex items-center mb-6">
          <LuServer className="text-purple-500 mr-3" />
          <span className="border-b-2 border-purple-500 pb-1">{c.environnement.title}</span>
        </h2>
        <p className="text-gray-100 mb-4">{c.environnement.intro}</p>
        <ul className="text-gray-100 list-disc pl-5 space-y-2">
          {c.environnement.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Parcours — reverse chronological, one line per entry */}
      <div className="max-w-4xl mx-auto mb-14">
        <h2 className="text-2xl font-bold mb-6">
          <span className="border-b-2 border-purple-500 pb-1">{c.frise.title}</span>
        </h2>
        <ul className="border-t border-gray-800">
          {c.frise.steps.map((step, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 py-3 border-b border-gray-800"
            >
              <span className="text-sm text-purple-300 sm:w-44 shrink-0">{step.period}</span>
              <span className="text-gray-100">{step.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expand / collapse all */}
      <div className="max-w-4xl mx-auto flex justify-end mb-6">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow"
          onClick={toggleAll}
        >
          {allCollapsed ? buttons.expandAll : buttons.collapseAll}
        </button>
      </div>

      {sectionShell("work", <FaBriefcase />, c.sections.work, renderExperience(workItems))}
      {sectionShell("volunteer", <FaHeart />, c.sections.volunteer, renderExperience(volunteerItems))}
      {sectionShell(
        "hobbies",
        <TbStarsFilled />,
        c.sections.hobbies,
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hobbyItems.map((hobby, idx) => (
            <div
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors border-l-4 border-purple-500 flex flex-col justify-between"
              key={idx}
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-2">{hobby.title}</h3>
              <p className="text-gray-400">{hobby.description}</p>
              {hobby.image && (
                <ImageWithPlaceholder
                  src={hobby.image}
                  alt={hobby.title}
                  className="mt-4 w-full h-48 object-cover"
                  shape="rounded"
                />
              )}
            </div>
          ))}
        </div>,
      )}
    </div>
  );
}
