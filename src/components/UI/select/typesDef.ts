import { Control, FieldErrorsImpl } from "react-hook-form";

export interface ISelectProps {
  options: string[];
  control: Control;
  formFieldName: string;
  errors: FieldErrorsImpl;
}
