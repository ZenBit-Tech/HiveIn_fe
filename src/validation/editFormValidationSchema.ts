import * as yup from "yup";
import i18next from "localization/en/en.json";
import { regexpGreaterThanZero } from "validation/profileEditFormValidationSchema";

const createJobPostValidationSchema = yup.object({
  rate: yup
    .string()
    .matches(
      regexpGreaterThanZero,
      i18next.profileFormErrorMessages.rateSmallerThenZero
    )
    .required(),
  jobDescription: yup
    .string()
    .trim()
    .min(10, i18next.profileFormErrorMessages.descriptionEmpty)
    .required(i18next.profileFormErrorMessages.descriptionEmpty),
});

export default createJobPostValidationSchema;
