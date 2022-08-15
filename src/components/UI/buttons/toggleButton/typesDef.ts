import { Control, FieldErrorsImpl } from "react-hook-form";

export interface IToggleButtonProps {
  options: string[];
  control: Control;
  formFieldName: string;
  errors: FieldErrorsImpl;
}
