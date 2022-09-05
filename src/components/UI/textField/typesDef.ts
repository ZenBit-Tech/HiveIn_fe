import { Control, FieldErrorsImpl } from "react-hook-form";

export interface ITextFieldProps {
  type: "number" | "text";
  width: "full" | "half";
  formFieldName?: string;
  control?: Control<any>;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  errors?: FieldErrorsImpl;
  disabled?: boolean;
}
