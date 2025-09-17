
import React from "react";
import { FaReact, FaNodeJs, FaPython, FaCss3Alt, FaPhp, FaJava, FaDatabase, FaLinux, FaDocker, FaGitAlt, FaHtml5 } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFastapi, SiJupyter, SiPhpmyadmin, SiMysql, SiTailwindcss, SiOpenstreetmap, SiApachemaven, SiLooker, SiPostgresql, SiExpress, SiFoodpanda } from 'react-icons/si';
import { IoLogoFirebase } from 'react-icons/io5';
import { PiGraph } from 'react-icons/pi';
import { BsBarChartFill, BsFiletypeJson } from 'react-icons/bs';
import { DiScrum } from "react-icons/di";
import { MdOutlineSchema } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { TbCircleLetterCFilled, TbCircleLetterS } from "react-icons/tb";
import { GiCroissant, GiKangaroo, GiMaracas } from "react-icons/gi";

export function getTechIcon(name: string): React.ReactElement | null {
  switch (name) {
    case "React": return <FaReact color="#3b82f6" size={24} />;
    case "TypeScript": return <SiTypescript color="#2563eb" size={24} />;
    case "JavaScript": return <SiJavascript color="#fde047" size={24} />;
    case "NodeJS": return <FaNodeJs color="#22c55e" size={24} />;
    case "FastAPI": return <SiFastapi color="#15803d" size={24} />;
    case "Firebase": return <IoLogoFirebase color="#fb923c" size={24} />;
    case "Python": return <FaPython color="#fde047" size={24} />;
    case "CSS": return <FaCss3Alt color="#3b82f6" size={24} />;
    case "Jupyter" : return <SiJupyter color="#f97316" size={24} />;
    case "Jupyter Notebook": return <SiJupyter color="#f97316" size={24} />;
    case "PHP": return <FaPhp color="#1d4ed8" size={24} />;
    case "MySQL": return <SiMysql color="#f97316" size={24} />;
    case "phpMyAdmin": return <SiPhpmyadmin color="#3b82f6" size={24} />;
    case "Tailwind": return <SiTailwindcss color="#38bdf8" size={24} />;
    case "Java": return <FaJava color="#3b82f6" size={24} />;
    case "GraphStream": return <PiGraph color="#3b82f6" size={24} />;
    case "OpenStreetMap": return <SiOpenstreetmap color="#22c55e" size={24} />;
    case "Power BI": return <BsBarChartFill color="#fde047" size={24} />;
    case "SQL": return <FaDatabase color="#a855f7" size={24} />;
    case "Linux": return <FaLinux color="#ffffff" size={24} />;
    case "Apache Server": return <SiApachemaven color="#ef4444" size={24} />;
    case "Docker": return <FaDocker color="#3b82f6" size={24} />;
    case "JSON": return <BsFiletypeJson color="#fde047" size={24} />;
    case "Looker": return <SiLooker color="#3b82f6" size={24} />;
    case "Scrum": return <DiScrum color="#f97316" size={24} />;
    case "Git": return <FaGitAlt color="#f97316" size={24} />;
    case "UML": return <MdOutlineSchema color="#fde047" size={24} />;
    case "AI/ML": return <LuBrainCircuit color="#22c55e" size={24} />;
    case "Express": return <SiExpress color="#15803d" size={24} />;
    case "PostgreSQL": return <SiPostgresql color="#3b82f6" size={24} />;
    case "Cronitor": return <TbCircleLetterCFilled color="#22c55e" size={24} />;
    case "HTML": return <FaHtml5 color="#f97316" size={24} />;
    case "SAS": return <TbCircleLetterS color="#2563eb" size={24} />;
    case "French": return <GiCroissant color="#2563eb" size={24} />;
    case "English": return <GiKangaroo color="#fde047" size={24} />;
    case "Spanish": return <GiMaracas color="#fb923c" size={24} />;
    case "Chinese": return <SiFoodpanda color="#de2910" size={24} />;
    default: return null;
  }
}
