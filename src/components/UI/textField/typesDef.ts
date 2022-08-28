import { Control, FieldErrorsImpl } from "react-hook-form";

export interface ITextFieldProps {
  type: "number" | "text" | "textarea";
  width: "full" | "half";
  formFieldName?: string;
  control?: Control;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  errors?: FieldErrorsImpl;
  disabled?: boolean;
  rate?: boolean;
}

export interface ILengthCheckProps {
  characters?: number;
  maxLength?: number;
}
