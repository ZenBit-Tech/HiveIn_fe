import i18next from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: i18next.ProfileEditForm.position.title,
    element: "textInput",
    formFieldName: "position",
    containerWidth: "half",
    maxLength: 25,
  },
  {
    title: i18next.ProfileEditForm.category.title,
    element: "select",
    formFieldName: "category",
    containerWidth: "half",
  },
  {
    title: i18next.ProfileEditForm.rate.title,
    element: "numberInput",
    formFieldName: "rate",
    containerWidth: "half",
    rate: true,
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
    title: i18next.ProfileEditForm.description.title,
    element: "textarea",
    formFieldName: "description",
    containerWidth: "half",
    maxLength: 50,
    helperText: "Input 30-50 words",
  },
  {
    title: i18next.ProfileEditForm.education.title,
    element: "educationColumn",
    formFieldName: "education",
    containerWidth: "full",
  },
  {
    title: i18next.ProfileEditForm.experience.title,
    element: "experienceColumn",
    formFieldName: "experience",
    containerWidth: "full",
  },
];

export default propsDataCollection;
