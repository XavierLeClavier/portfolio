import {JSX} from 'react';
import { FaReact, FaNodeJs, FaPython, FaCss3Alt, FaPhp, FaJava, FaDatabase, FaLinux, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFastapi, SiJupyter, SiPhpmyadmin, SiMysql, SiTailwindcss, SiOpenstreetmap, SiApachemaven, SiLooker, SiPostgresql, SiExpress } from 'react-icons/si';
import { IoLogoFirebase } from 'react-icons/io5';
import { PiGraph } from 'react-icons/pi';
import { BsBarChartFill, BsFiletypeJson } from 'react-icons/bs';
import { DiScrum } from "react-icons/di";
import { MdOutlineSchema } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { TbCircleLetterCFilled } from "react-icons/tb";


export const techIcons: { [key: string]: JSX.Element } = {
    React: <FaReact color="#3b82f6" size={24} />,
    TypeScript: <SiTypescript color="#2563eb" size={24} />,
    JavaScript: <SiJavascript color="#fde047" size={24} />,
    NodeJS: <FaNodeJs color="#22c55e" size={24} />,
    FastAPI: <SiFastapi color="#15803d" size={24} />,
    Firebase: <IoLogoFirebase color="#fb923c" size={24} />,
    Python: <FaPython color="#fde047" size={24} />,
    CSS: <FaCss3Alt color="#3b82f6" size={24} />,
    Jupyter: <SiJupyter color="#f97316" size={24} />,
    PHP: <FaPhp color="#1d4ed8" size={24} />,
    MySQL: <SiMysql color="#f97316" size={24} />,
    phpMyAdmin: <SiPhpmyadmin color="#3b82f6" size={24} />,
    Tailwind: <SiTailwindcss color="#38bdf8" size={24} />,
    Java: <FaJava color="#3b82f6" size={24} />,
    GraphStream: <PiGraph color="#3b82f6" size={24} />,
    OpenStreetMap: <SiOpenstreetmap color="#22c55e" size={24} />,
    "Power BI": <BsBarChartFill color="#fde047" size={24} />,
    SQL: <FaDatabase color="#a855f7" size={24} />,
    Linux: <FaLinux color="#000000" size={24} />,
    "Apache Server": <SiApachemaven color="#ef4444" size={24} />,
    Docker: <FaDocker color="#3b82f6" size={24} />,
    JSON: <BsFiletypeJson color="#fde047" size={24} />,
    Looker: <SiLooker color="#3b82f6" size={24} />,
    Scrum: <DiScrum color="#f97316" size={24} />,
    Git: <FaGitAlt color="#f97316" size={24} />,
    UML: <MdOutlineSchema color="#fde047" size={24} />,
    "AI/ML": <LuBrainCircuit color="#22c55e" size={24} />,
    "Express": <SiExpress color="#15803d" size={24} />,
    "PostgreSQL": <SiPostgresql color="#3b82f6" size={24} />,
    "Cronitor": <TbCircleLetterCFilled color="#22c55e" size={24} />,
};