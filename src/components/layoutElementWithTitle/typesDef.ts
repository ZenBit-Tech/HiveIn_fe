export interface IProps {
  title: string;
  element:
    | "textInput"
    | "select"
    | "numberInput"
    | "toggleButton"
    | "educationColumn"
    | "experienceColumn";
  selectOptions?: string[];
  toggleButtonOptions?: string[];
  helperText?: string;
}
