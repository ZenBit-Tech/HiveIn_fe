import { FieldErrorsImpl } from "react-hook-form";

export interface ISkillsProps {
  errors: FieldErrorsImpl;
  options: { id: number }[];
  setValue: any;
  isSubmitSuccess?: boolean;
}
