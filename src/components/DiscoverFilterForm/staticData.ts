import i18next from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: "Talent.Discover.keyWords",
    element: "textInput",
    formFieldName: "position",
    containerWidth: "half",
    maxLength: 25,
  },
  {
    title: "Talent.Discover.category",
    element: "select",
    formFieldName: "category",
    containerWidth: "half",
    selectOptions: i18next.ProfileEditForm.category.options,
  },
  {
    title: "Talent.Discover.skills",
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "full",
    skillsOptions: i18next.ProfileEditForm.skills.skillsOptions,
  },
];

export default propsDataCollection;
