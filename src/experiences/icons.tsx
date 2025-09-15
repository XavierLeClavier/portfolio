import {JSX} from 'react';
import { FaReact, FaNodeJs, FaPython, FaCss3Alt, FaPhp, FaJava, FaDatabase, FaLinux, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFastapi, SiJupyter, SiPhpmyadmin, SiMysql, SiTailwindcss, SiOpenstreetmap, SiApachemaven, SiLooker, SiPostgresql, SiExpress } from 'react-icons/si';
import { IoLogoFirebase } from 'react-icons/io5';
import { PiGraph } from 'react-icons/pi';
import { BsBarChartFill, BsFiletypeJson } from 'react-icons/bs';
import { DiScrum } from "react-icons/di";
import { MdOutlineSchema } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";

export const techIcons: { [key: string]: JSX.Element } = {
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
    MySQL: <SiMysql className="text-orange-500 w-6 h-6" />,
    phpMyAdmin: <SiPhpmyadmin className="text-blue-500 w-6 h-6" />,
    Tailwind: <SiTailwindcss className="text-blue-400 w-6 h-6" />,
    Java: <FaJava className="text-blue-500 w-6 h-6" />,
    GraphStream: <PiGraph className="text-blue-500 w-6 h-6" />,
    OpenStreetMap: <SiOpenstreetmap className="text-green-500 w-6 h-6" />,
    "Power BI": <BsBarChartFill className="text-yellow-500 w-6 h-6" />,
    SQL: <FaDatabase className="text-purple-500 w-6 h-6" />,
    Linux: <FaLinux className="text-black w-6 h-6" />,
    "Apache Server": <SiApachemaven className="text-red-500 w-6 h-6" />,
    Docker: <FaDocker className="text-blue-500 w-6 h-6" />,
    JSON: <BsFiletypeJson className="text-yellow-500 w-6 h-6" />,
    Looker: <SiLooker className="text-blue-500 w-6 h-6" />,
    Scrum: <DiScrum className="text-orange-500 w-6 h-6" />,
    Git: <FaGitAlt className="text-orange-500 w-6 h-6" />,
    UML: <MdOutlineSchema className="text-yellow-500 w-6 h-6" />,
    "AI/ML": <LuBrainCircuit className="text-green-500 w-6 h-6" />,
    "Express": <SiExpress className="text-green-700 w-6 h-6" />,
    "PostgreSQL": <SiPostgresql className="text-blue-500 w-6 h-6" />,   
};