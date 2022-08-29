import * as yup from "yup";
import i18next from "localization/en/en.json";

const profileEditFormValidationSchema = yup.object().shape({
  category: yup
    .string()
    .required(i18next.profileFormErrorMessages.categoryNotChosen),
  skills: yup
    .array()
    .min(3, i18next.profileFormErrorMessages.skillsNotChosen)
    .required(),
  keyWords: yup.string().trim().required(),
});

export default profileEditFormValidationSchema;
