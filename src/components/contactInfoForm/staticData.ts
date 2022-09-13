import i18n from "localization/en/en.json";
import { ILayoutElementWithoutControl } from "components/layoutElementWithTitle/typesDef";

const propsDataCollection: ILayoutElementWithoutControl[] = [
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.email.title,
    element: "text",
    formFieldName: "email",
  },
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.firstName.title,
    element: "textInput",
    formFieldName: "firstName",
    maxLength: 30,
  },
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.lastName.title,
    element: "textInput",
    formFieldName: "lastName",
    maxLength: 30,
  },
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.phoneNumber.title,
    element: "phoneInput",
    formFieldName: "phone",
  },
];

export default propsDataCollection;
