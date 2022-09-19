import { TEnglishLevel } from "components/layoutElementWithTitle/typesDef";
import { DurationTypeEnum } from "utils/enums";

export interface ISearchWorkFilters {
  take?: number;
  skip?: number;
  category?: number;
  skills?: { id: number }[];
  rate?: number;
  duration?: number;
  durationType?: DurationTypeEnum;
  englishLevel?: TEnglishLevel;
}
