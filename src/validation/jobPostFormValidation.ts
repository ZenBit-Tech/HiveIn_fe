import * as yup from "yup";
import i18next from "localization/en/en.json";

const regexpGreaterThanZero = /^[1-9][0-9]*$/;

const jobPostFormValidationSchema = yup.object().shape({
  title: yup.string().trim().required(i18next.JobPost.validation.title),
  category: yup.string().required(i18next.JobPost.validation.category),
  rate: yup
    .string()
    .matches(regexpGreaterThanZero, i18next.JobPost.validation.rate)
    .required(),
  skills: yup.array().min(3, i18next.JobPost.validation.skills).required(),
  englishLevel: yup.string().required(i18next.JobPost.validation.englishLevel),
  description: yup
    .string()
    .trim()
    .min(30, i18next.JobPost.validation.description)
    .required(),
});

export default jobPostFormValidationSchema;
