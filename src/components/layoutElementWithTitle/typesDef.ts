import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
} from "react-hook-form";

export interface ILayoutElementWithoutControl {
  title: string;
  element:
    | "textInput"
    | "numberInput"
    | "textarea"
    | "select"
    | "toggleButton"
    | "educationColumn"
    | "experienceColumn"
    | "skillsLayout"
    | "text"
    | "phoneInput";
  containerWidth: "full" | "half";
  formFieldName: string;
  selectOptions?: string[];
  toggleButtonOptions?: string[];
  skillsOptions?: string[];
  helperText?: string;
  maxLength?: number;
  message?: string;
}

export interface ILayoutElementWithTitleProps
  extends ILayoutElementWithoutControl {
  control: Control;
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
}
