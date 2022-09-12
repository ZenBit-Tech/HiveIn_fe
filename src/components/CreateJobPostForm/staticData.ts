import i18next from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: i18next.PostJob.formFieldsInfo.title.title,
    element: "textInput",
    formFieldName: "title",
    containerWidth: "half",
    maxLength: 25,
    helperText: i18next.PostJob.formFieldsInfo.title.helperText,
  },
  {
    title: i18next.ProfileEditForm.category.title,
    element: "select",
    formFieldName: "categoryId",
    containerWidth: "half",
  },
  {
    title: i18next.PostJob.formFieldsInfo.duration.title,
    element: "durationPicker",
    formFieldName: "",
    containerWidth: "half",
  },
  {
    title: i18next.ProfileEditForm.rate.title,
    element: "numberInput",
    formFieldName: "rate",
    containerWidth: "half",
    helperText: i18next.ProfileEditForm.rate.helperText,
  },
  {
    title: i18next.ProfileEditForm.skills.title,
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "full",
  },
  {
    title: i18next.ProfileEditForm.englishLevel.title,
    element: "toggleButton",
    formFieldName: "englishLevel",
    containerWidth: "full",
    toggleButtonOptions: i18next.ProfileEditForm.englishLevel.options,
  },
  {
    title: i18next.PostJob.formFieldsInfo.description.title,
    element: "textarea",
    formFieldName: "jobDescription",
    containerWidth: "full",
    maxLength: 5000,
    helperText: i18next.PostJob.formFieldsInfo.description.helperText,
    rowsOfTextArea: 4,
  },
];

export default propsDataCollection;
