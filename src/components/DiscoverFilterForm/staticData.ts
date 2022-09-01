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
  },
  {
    title: "Talent.skills",
    element: "skillsLayout",
    formFieldName: "skills",
    containerWidth: "full",
  },
];

export default propsDataCollection;
