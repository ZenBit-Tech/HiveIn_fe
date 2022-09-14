import * as yup from "yup";
import i18next from "localization/en/en.json";
import { regexpGreaterThanZero } from "validation/profileEditFormValidationSchema";
import { MIN_LENGTH_OF_JOB_DESCRIPTION } from "utils/consts/numberConsts";

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
    .min(
      MIN_LENGTH_OF_JOB_DESCRIPTION,
      i18next.profileFormErrorMessages.descriptionEmpty
    )
    .required(i18next.profileFormErrorMessages.descriptionEmpty),
});

export default createJobPostValidationSchema;
