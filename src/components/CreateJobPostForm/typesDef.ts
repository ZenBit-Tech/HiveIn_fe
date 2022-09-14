import { Dispatch } from "react";
import { TEnglishLevel } from "components/layoutElementWithTitle/typesDef";
import { ISkills } from "services/jobPosts/setJobPostsAPI";
import { DurationTypeEnum } from "utils/enums";

export interface IJobPostFormFields {
  categoryId: number;
  duration: string;
  durationType: DurationTypeEnum;
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
  durationType: DurationTypeEnum;
  englishLevel?: TEnglishLevel;
}

export interface IProps {
  existedDraftData?: IJobPostFormFields;
  queriedSkills?: ISkills[];
  setIsOpen?: Dispatch<boolean>;
}
