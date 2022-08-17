import * as yup from "yup";
import i18next from "localization/en/en.json";

const regexpGreaterThanZero = /^[1-9][0-9]*$/;

const profileEditFormValidationSchema = yup.object().shape({
  position: yup
    .string()
    .trim()
    .required(i18next.profileFormErrorMessages.positionEmpty),
  category: yup
    .string()
    .required(i18next.profileFormErrorMessages.categoryNotChosen),
  rate: yup
    .string()
    .matches(
      regexpGreaterThanZero,
      i18next.profileFormErrorMessages.rateSmallerThenZero
    )
    .required(),
  skills: yup
    .array()
    .min(3, i18next.profileFormErrorMessages.skillsNotChosen)
    .required(),
  englishLevel: yup
    .string()
    .required(i18next.profileFormErrorMessages.englishLevelNotChosen),
  description: yup
    .string()
    .trim()
    .min(30, i18next.profileFormErrorMessages.descriptionEmpty)
    .required(),
});

export default profileEditFormValidationSchema;
