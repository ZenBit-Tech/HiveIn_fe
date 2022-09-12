import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    title: "SearchWork.byCategory",
    element: "select",
    formFieldName: "category",
    containerWidth: "half",
  },
  {
    title: "SearchWork.bySkills",
    element: "skillsLayoutSmall",
    formFieldName: "skills",
    containerWidth: "half",
  },
  {
    title: "SearchWork.byPrice",
    element: "textInput",
    formFieldName: "keyWords",
    containerWidth: "half",
    maxLength: 25,
  },

  {
    title: "SearchWork.byTime",
    element: "textInput",
    formFieldName: "fuy",
    containerWidth: "half",
  },
  {
    title: "SearchWork.byEnglish",
    element: "numberInput",
    formFieldName: "erg",
    containerWidth: "half",
  },
];

export default propsDataCollection;
