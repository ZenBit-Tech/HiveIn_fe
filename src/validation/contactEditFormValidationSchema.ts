import * as yup from "yup";
import i18next from "localization/en/en.json";

const contactEditFormValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, i18next.contactInfoForm.fieldsData.firstName.errorMessage)
    .required(i18next.contactInfoForm.fieldsData.firstName.errorMessage),
  lastName: yup
    .string()
    .trim()
    .min(2, i18next.contactInfoForm.fieldsData.lastName.errorMessage)
    .required(i18next.contactInfoForm.fieldsData.lastName.errorMessage),
});

export default contactEditFormValidationSchema;
