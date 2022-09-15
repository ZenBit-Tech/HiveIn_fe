export interface ISearchWorkFilters {
  take?: number;
  skip?: number;
  category?: number;
  skills?: { id: number }[];
  rate?: number;
  duration?: number;
  durationType?: string;
  englishLevel?: string;
}
