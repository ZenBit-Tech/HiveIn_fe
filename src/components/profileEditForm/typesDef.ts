import { IFreelancer } from "services/profileInfo/typesDef";

type Modify<T, R> = Omit<T, keyof R> & R;

export type TFreelancerForProfileForm = Modify<
  IFreelancer,
  {
    skills: number[];
    category: number;
    description?: string;
  }
>;
