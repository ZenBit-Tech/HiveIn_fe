import * as yup from "yup";
import i18next from "localization/en/en.json";
import { regexpGreaterThanZero } from "validation/profileEditFormValidationSchema";
import { MIN_LENGTH_OF_JOB_DESCRIPTION } from "utils/consts/numberConsts";

export const jobPostsDraftSchema = yup.object({
  title: yup.string().required(i18next.PostJob.required),
});

export const createJobPostValidationSchema = jobPostsDraftSchema.shape({
  categoryId: yup
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
  jobDescription: yup
    .string()
    .trim()
    .min(
      MIN_LENGTH_OF_JOB_DESCRIPTION,
      i18next.profileFormErrorMessages.descriptionEmpty
    )
    .required(i18next.profileFormErrorMessages.descriptionEmpty),
  duration: yup
    .string()
    .matches(
      regexpGreaterThanZero,
      i18next.profileFormErrorMessages.rateSmallerThenZero
    )
    .required(i18next.PostJob.required),
});
