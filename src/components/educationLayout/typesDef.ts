import { Control } from "react-hook-form";

export interface IEducationLayoutProps {
  type: "education" | "experience";
  maxCountOfColumns: number;
  control: Control;
}
