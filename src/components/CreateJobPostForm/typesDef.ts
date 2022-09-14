import { Dispatch } from "react";
import { TEnglishLevel } from "components/layoutElementWithTitle/typesDef";
import { ISkills } from "services/jobPosts/setJobPostsAPI";

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

export interface IProps {
  existedDraftData?: IJobPostFormFields;
  queriedSkills?: ISkills[];
  setIsOpen?: Dispatch<boolean>;
}
