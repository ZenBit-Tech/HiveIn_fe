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
    title: i18n.contactInfoForm.fieldsData.emailSettings.title,
    element: "switch",
    formFieldName: "isVisibleEmail",
    helperText: i18n.contactInfoForm.fieldsData.emailSettings.helperText,
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
  {
    containerWidth: "half",
    title: i18n.contactInfoForm.fieldsData.phoneSettings.title,
    element: "switch",
    formFieldName: "isVisiblePhone",
    helperText: i18n.contactInfoForm.fieldsData.phoneSettings.helperText,
  },
];

export default propsDataCollection;
