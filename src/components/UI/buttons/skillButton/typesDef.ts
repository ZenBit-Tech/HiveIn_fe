import { FieldValues, UseFieldArrayAppend } from "react-hook-form";

export interface ISkillButtonProps {
  text: string;
  append: UseFieldArrayAppend<FieldValues, "skills">;
  remove: any;
}
