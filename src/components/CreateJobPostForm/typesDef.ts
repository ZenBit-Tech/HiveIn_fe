export interface IJobPostFormFields {
  categoryId: number;
  duration: string;
  durationType: "week" | "month";
  englishLevel: "pre-intermediate" | "intermediate" | "upper-intermediate";
  file: File | null;
  jobDescription: string;
  rate: string;
  skills: number[];
  title: string;
}
