import { Control, FieldErrorsImpl } from "react-hook-form";

export interface ISelectProps {
  control: Control;
  formFieldName: string;
  errors: FieldErrorsImpl;
}
