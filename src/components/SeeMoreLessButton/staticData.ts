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
    selectOptions: i18next.ProfileEditForm.category.options,
  },
  {
    title: i18next.ProfileEditForm.skills.title,
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "full",
    skillsOptions: i18next.ProfileEditForm.skills.skillsOptions,
  },
];

export default propsDataCollection;
