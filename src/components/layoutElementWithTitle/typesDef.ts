import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { IFreelancer } from "services/profileInfo/typesDef";

export type TEnglishLevel =
  | "pre-intermediate"
  | "intermediate"
  | "upper-intermediate";

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
    | "skillsLayoutSmall"
    | "text"
    | "phoneInput"
    | "durationPicker";
  containerWidth: "full" | "half";
  formFieldName: string;
  toggleButtonOptions?: string[] | TEnglishLevel[];
  helperText?: string;
  maxLength?: number;
  freelancerInfo?: IFreelancer;
  rowsOfTextArea?: number;
}

export interface ILayoutElementWithTitleProps
  extends ILayoutElementWithoutControl {
  control: Control;
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  setValue?: UseFormSetValue<FieldValues>;
  isSubmitSuccess?: boolean;
}
