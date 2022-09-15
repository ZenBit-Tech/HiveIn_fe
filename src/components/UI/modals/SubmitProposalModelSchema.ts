import * as yup from "yup";
import i18next from "localization/en/en.json";

const submitProposalSchema = yup.object({
  bid: yup
    .number()
    .required(i18next.SendProposalErrors.bidRequired)
    .positive(i18next.SendProposalErrors.bidPositive)
    .typeError(i18next.SendProposalErrors.bidTypeError),
  coverLetter: yup
    .string()
    .required(i18next.SendProposalErrors.coverLetterRequired)
    .max(250, i18next.SendProposalErrors.coverLetterMax),
});

export default submitProposalSchema;
