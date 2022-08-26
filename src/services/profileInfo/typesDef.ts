interface IMutualEdEx {
  city: string;
  id: number;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface IEducation extends IMutualEdEx {
  degree: string;
  school: string;
}

export interface IExperience extends IMutualEdEx {
  jobTitle: string;
  company: string;
}

export interface IFreelancer {
  categoryId: number;
  education: IEducation[];
  englishLevel: "intermediate" | "pre-intermediate" | "upper-intermediate";
  experience: IExperience[];
  position: string;
  rate: string;
  skills: { id: number }[];
  userId: number;
}
