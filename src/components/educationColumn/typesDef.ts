import { Control } from "react-hook-form";

export interface IEducationColumnProps {
  type: "education" | "experience";
  id: string;
  removeHandler: (id: string, index: number) => void;
  index: number;
  append: any;
  control: Control;
}
