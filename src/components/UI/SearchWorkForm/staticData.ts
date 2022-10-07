/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";
import i18next from "localization/en/en.json";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: "SearchWork.keyWord",
    element: "textInput",
    formFieldName: "keyWord",
    containerWidth: "half",
  },
  {
    title: "SearchWork.byCategory",
    element: "select",
    formFieldName: "category",
    containerWidth: "half",
  },
  {
    title: "SearchWork.bySkills",
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "half",
  },
  {
    title: "SearchWork.byPrice",
    element: "numberInput",
    formFieldName: "rate",
    containerWidth: "half",
    helperText: i18next.ProfileEditForm.rate.helperText,
  },
  {
    title: "SearchWork.byTime",
    element: "durationPicker",
    formFieldName: "",
    containerWidth: "half",
  },
  {
    title: "SearchWork.byEnglish",
    element: "toggleButton",
    formFieldName: "englishLevel",
    containerWidth: "half",
    toggleButtonOptions: i18next.ProfileEditForm.englishLevel.options,
  },
];

export default propsDataCollection;
