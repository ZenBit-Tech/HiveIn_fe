import { TEnglishLevel } from "components/layoutElementWithTitle/typesDef";

export interface IJobPostFormFields {
  categoryId: number;
  duration: string;
  durationType: "week" | "month";
  englishLevel: TEnglishLevel;
  file: File | null;
  jobDescription: string;
  rate: string;
  skills: number[];
  title: string;
}

export interface IDraftRequestObject {
  title: string;
  skillsId: number[] | null;
  jobDescription: string | null;
  rate: string | null;
  userId: string;
  isDraft: boolean;
  duration?: string;
  categoryId?: number;
  durationType: "week" | "month";
  englishLevel?: TEnglishLevel;
}
