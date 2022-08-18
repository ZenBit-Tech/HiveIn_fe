import * as yup from "yup";
import i18next from "localization/en/en.json";

const contactEditFormValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, i18next.contactInfoForm.fieldsData.firstName.errorMessage)
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(2, i18next.contactInfoForm.fieldsData.lastName.errorMessage)
    .required(),
});

export default contactEditFormValidationSchema;
