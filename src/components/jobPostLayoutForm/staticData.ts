import i18next from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: i18next.JobPost.postTitle.title,
    element: "textInput",
    formFieldName: "post title",
    containerWidth: "full",
    helperText: i18next.JobPost.postTitle.placeholder,
    direction: "column",
  },
  {
    title: i18next.JobPost.duration.title,
    element: "numberInput",
    formFieldName: "duration",
    containerWidth: "full",
    helperText: i18next.JobPost.duration.placeholder,
    direction: "column",
  },
  {
    title: i18next.JobPost.period.title,
    element: "select",
    formFieldName: "period",
    containerWidth: "half",
    selectOptions: i18next.JobPost.period.options,
    direction: "column",
  },
  {
    title: i18next.JobPost.category.title,
    element: "select",
    formFieldName: "category",
    containerWidth: "half",
    selectOptions: i18next.JobPost.category.options,
    direction: "column",
  },
  {
    title: i18next.JobPost.rate.title,
    element: "numberInput",
    formFieldName: "rate",
    containerWidth: "full",
    rate: true,
    helperText: i18next.JobPost.rate.placeholder,
    direction: "column",
  },
  {
    title: i18next.JobPost.skills.title,
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "full",
    skillsOptions: i18next.JobPost.skills.options,
    direction: "column",
  },
  {
    title: i18next.JobPost.englishLevel.title,
    element: "toggleButton",
    formFieldName: "englishLevel",
    containerWidth: "full",
    toggleButtonOptions: i18next.JobPost.englishLevel.options,
    direction: "column",
  },
  {
    title: i18next.JobPost.description.title,
    element: "textarea",
    formFieldName: "description",
    containerWidth: "full",
    maxLength: 5000,
    direction: "column",
    helperText: i18next.JobPost.description.placeholder,
  },
];

export default propsDataCollection;
