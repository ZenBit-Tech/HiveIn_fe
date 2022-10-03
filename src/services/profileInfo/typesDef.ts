import { IUser } from "services/user/setUserAPI";
import { ICategory } from "services/jobPosts/setJobPostsAPI";

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
  employer: string;
}

export interface IFreelancer {
  id: number;
  categoryId: number;
  education: IEducation[];
  englishLevel: "intermediate" | "pre-intermediate" | "upper-intermediate";
  experience: IExperience[];
  position: string;
  rate: string;
  skills: { id: number; name?: string }[];
  userId: number;
  user: IUser;
  category: ICategory;
}
