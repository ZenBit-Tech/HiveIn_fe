import i18n from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.email.title,
    element: "text",
    formFieldName: "",
  },
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.firstName.title,
    element: "textInput",
    formFieldName: "firstName",
  },
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.lastName.title,
    element: "textInput",
    formFieldName: "lastName",
  },
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.phoneNumber.title,
    element: "phoneInput",
    formFieldName: "phoneNumber",
  },
];

export default propsDataCollection;
