import data from "./competencies.json";

export interface CompetencyData {
  id: string;
  code: string;
  niveauVise: string;
  niveauAutoEval: number;
  order: number;
  projectIds: string[];
}

export const competencies = (data as CompetencyData[])
  .slice()
  .sort((a, b) => a.order - b.order);
