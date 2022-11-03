import * as yup from "yup";
import i18next from "localization/en/en.json";
import { regexpGreaterThanZero } from "validation/profileEditFormValidationSchema";
import { MIN_LENGTH_OF_JOB_DESCRIPTION } from "utils/consts/numberConsts";

export const jobPostsDraftSchema = yup.object().shape(
  {
    title: yup.string().required(i18next.PostJob.required),
    rate: yup
      .string()
      .nullable()
      .notRequired()
      .when("rate", {
        is: (value: string) => value?.length,
        then: (rule) =>
          rule.matches(
            regexpGreaterThanZero,
            i18next.profileFormErrorMessages.rateSmallerThenZero
          ),
      }),
    duration: yup
      .string()
      .nullable()
      .notRequired()
      .when("duration", {
        is: (value: string) => value?.length,
        then: (rule) =>
          rule.matches(
            regexpGreaterThanZero,
            i18next.profileFormErrorMessages.rateSmallerThenZero
          ),
      }),
  },
  [
    ["rate", "rate"],
    ["duration", "duration"],
  ]
);

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
