import ContractStatusEnum from "utils/enums";
import Contract from "./Contract/Contract";

interface IForgotPassword {
  id: number;
  user: string;
  link: string;
}
interface IFile {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
}
interface IUser {
  id: number;
  email: string;
  password: string;
  role: "client" | "freelancer" | "";
  googleId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  description?: string;
  avatarURL?: string;
  user?: string;
  forgotPassword?: IForgotPassword[];
  recentlyViewedFreelancers?: string[];
  savedFreelancers?: string[];
  hiredFreelancers?: string[];
}
interface IEducation {
  id: number;
  city: string;
  degree: string;
  description: string;
  school: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  freelancer: string;
  freelancerId: number;
}
interface IExperience {
  id: number;
  city: string;
  description: string;
  employer: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  freelancer: string;
  freelancerId: number;
}
interface ISkills {
  id: number;
  name: string;
  createdAt: Date;
  UpdatedAt: Date;
  freelancers: string[];
  jobPosts: string[];
}
interface IJobPost {
  id: number;
  title: string;
  duration: number;
  durationType: "week" | "month";
  category?: {
    id: number;
  };
  user: IUser;
  contract: string;
  file?: IFile;
  fileId?: number;
  rate: number;
  skills?: ISkills[];
  isDraft: boolean;
  englishLevel: "advanced" | "pre-intermediate" | "intermediate";
  jobDescription: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IFreelancer {
  id: number;
  englishLevel: string;
  position: string;
  rate: string;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: number;
  };
  user?: IUser;
  education?: IEducation[];
  experience?: IExperience[];
  skills?: ISkills[];
  userId: number;
  categoryId?: number;
}

export interface IContract {
  id: number;
  jobPost?: IJobPost;
  freelancer?: IFreelancer;
  contractStatus: ContractStatusEnum;
  startDate?: Date;
  endDate?: Date;
}

function MyContracts() {
  const contracts: IContract[] = [
    {
      id: 1,
      contractStatus: ContractStatusEnum.ACTIVE,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 2,
      contractStatus: ContractStatusEnum.CLOSED,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 3,
      contractStatus: ContractStatusEnum.PENDING,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 4,
      contractStatus: ContractStatusEnum.PENDING,
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 5,
      contractStatus: ContractStatusEnum.PENDING,
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  return (
    <div>
      <h3>My Contracts</h3>
      {contracts.map((c) => (
        <Contract
          key={c.id}
          contractStatus={c.contractStatus}
          startDate={c.startDate}
          endDate={c.endDate}
        />
      ))}
    </div>
  );
}

export default MyContracts;
