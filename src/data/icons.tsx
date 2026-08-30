import type { ReactElement } from "react";
import {
  FaReact, FaNodeJs, FaPython, FaCss3Alt, FaPhp, FaJava, FaDatabase,
  FaLinux, FaDocker, FaGitAlt, FaHtml5,
} from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiFastapi, SiJupyter, SiPhpmyadmin, SiMysql,
  SiTailwindcss, SiOpenstreetmap, SiApachemaven, SiLooker, SiPostgresql,
  SiExpress, SiFoodpanda, SiSqlite, SiOllama, SiLangchain, SiQt, SiPandas,
  SiNumpy, SiScikitlearn, SiGithub,
} from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { PiGraph } from "react-icons/pi";
import { BsBarChartFill, BsFiletypeJson } from "react-icons/bs";
import { DiScrum, DiVisualstudio } from "react-icons/di";
import { MdOutlineSchema } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { TbCircleLetterCFilled, TbCircleLetterS, TbMathFunction } from "react-icons/tb";
import { GiCroissant, GiKangaroo, GiMaracas } from "react-icons/gi";

const SIZE = 24;

/**
 * Single icon registry for technology / language names. Merged from the old
 * `experiences/icons.tsx` map and `experiences/getTechIcon.tsx` switch.
 * Keys are the technology names used in `src/data/` and GitHub language names.
 */
export const techIcons: Record<string, ReactElement> = {
  // Frontend
  React: <FaReact color="#3b82f6" size={SIZE} />,
  TypeScript: <SiTypescript color="#2563eb" size={SIZE} />,
  JavaScript: <SiJavascript color="#fde047" size={SIZE} />,
  CSS: <FaCss3Alt color="#3b82f6" size={SIZE} />,
  HTML: <FaHtml5 color="#f97316" size={SIZE} />,
  Tailwind: <SiTailwindcss color="#38bdf8" size={SIZE} />,

  // Backend
  NodeJS: <FaNodeJs color="#22c55e" size={SIZE} />,
  FastAPI: <SiFastapi color="#15803d" size={SIZE} />,
  Express: <SiExpress color="#15803d" size={SIZE} />,
  Firebase: <IoLogoFirebase color="#fb923c" size={SIZE} />,
  PHP: <FaPhp color="#1d4ed8" size={SIZE} />,
  Java: <FaJava color="#3b82f6" size={SIZE} />,
  MySQL: <SiMysql color="#f97316" size={SIZE} />,
  PostgreSQL: <SiPostgresql color="#3b82f6" size={SIZE} />,
  phpMyAdmin: <SiPhpmyadmin color="#3b82f6" size={SIZE} />,
  SQLite: <SiSqlite color="#93c5fd" size={SIZE} />,
  SQL: <FaDatabase color="#a855f7" size={SIZE} />,

  // Data science & analysis
  Python: <FaPython color="#fde047" size={SIZE} />,
  Jupyter: <SiJupyter color="#f97316" size={SIZE} />,
  "Jupyter Notebook": <SiJupyter color="#f97316" size={SIZE} />,
  Pandas: <SiPandas color="#a855f7" size={SIZE} />,
  NumPy: <SiNumpy color="#3b82f6" size={SIZE} />,
  SkLearn: <SiScikitlearn color="#f97316" size={SIZE} />,
  "AI/ML": <LuBrainCircuit color="#22c55e" size={SIZE} />,
  "Power BI": <BsBarChartFill color="#fde047" size={SIZE} />,
  "Power Query": <BsBarChartFill color="#eab308" size={SIZE} />,
  DAX: <TbMathFunction color="#fde047" size={SIZE} />,
  Looker: <SiLooker color="#3b82f6" size={SIZE} />,
  SAS: <TbCircleLetterS color="#2563eb" size={SIZE} />,

  // AI / LLM
  Ollama: <SiOllama color="#ffffff" size={SIZE} />,
  LangChain: <SiLangchain color="#22c55e" size={SIZE} />,

  // Desktop / GUI
  PySide6: <SiQt color="#22c55e" size={SIZE} />,
  Qt: <SiQt color="#22c55e" size={SIZE} />,

  // DevOps & tooling
  Linux: <FaLinux color="#ffffff" size={SIZE} />,
  Docker: <FaDocker color="#3b82f6" size={SIZE} />,
  Git: <FaGitAlt color="#f97316" size={SIZE} />,
  GitHub: <SiGithub color="#ffffff" size={SIZE} />,
  "VS Code": <DiVisualstudio color="#3b82f6" size={SIZE} />,
  "Apache Server": <SiApachemaven color="#ef4444" size={SIZE} />,

  // Specialised libraries & methods
  JSON: <BsFiletypeJson color="#fde047" size={SIZE} />,
  GraphStream: <PiGraph color="#3b82f6" size={SIZE} />,
  OpenStreetMap: <SiOpenstreetmap color="#22c55e" size={SIZE} />,
  Scrum: <DiScrum color="#f97316" size={SIZE} />,
  UML: <MdOutlineSchema color="#fde047" size={SIZE} />,
  "Star schema": <MdOutlineSchema color="#a855f7" size={SIZE} />,
  Cronitor: <TbCircleLetterCFilled color="#22c55e" size={SIZE} />,

  // Spoken languages
  French: <GiCroissant color="#2563eb" size={SIZE} />,
  English: <GiKangaroo color="#fde047" size={SIZE} />,
  Spanish: <GiMaracas color="#fb923c" size={SIZE} />,
  Chinese: <SiFoodpanda color="#de2910" size={SIZE} />,
};

/** Icon for a technology name, or `null` if none is registered. */
export function getIcon(name: string): ReactElement | null {
  return techIcons[name] ?? null;
}
