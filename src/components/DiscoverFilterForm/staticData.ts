import i18next from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: "Talent.keyWords",
    element: "textInput",
    formFieldName: "keyWords",
    containerWidth: "half",
    maxLength: 25,
  },
  {
    title: "Talent.category",
    element: "select",
    formFieldName: "category",
    containerWidth: "half",
    selectOptions: i18next.ProfileEditForm.category.options,
  },
  {
    title: "Talent.skills",
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "full",
    skillsOptions: i18next.ProfileEditForm.skills.skillsOptions,
  },
];

export default propsDataCollection;
