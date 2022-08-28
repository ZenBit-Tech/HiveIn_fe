import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { IFreelancer } from "services/profileInfo/typesDef";

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
  toggleButtonOptions?: string[];
  helperText?: string;
  maxLength?: number;
  freelancerInfo?: IFreelancer;
  direction?: "column" | "row";
  rate?: boolean;
}

export interface ILayoutElementWithTitleProps
  extends ILayoutElementWithoutControl {
  control: Control;
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  setValue?: UseFormSetValue<FieldValues>;
}
