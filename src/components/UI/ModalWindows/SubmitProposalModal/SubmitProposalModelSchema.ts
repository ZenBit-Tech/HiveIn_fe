import * as yup from "yup";
import i18next from "localization/en/en.json";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";

const submitProposalSchema = yup.object({
  bid: yup
    .number()
    .required(i18next.SendProposalErrors.bidRequired)
    .positive(i18next.SendProposalErrors.bidPositive)
    .typeError(i18next.SendProposalErrors.bidTypeError),
  message: yup
    .string()
    .required(i18next.SendProposalErrors.coverLetterRequired)
    .max(MAX_LENGTH_OF_COVER_LETTER, i18next.SendProposalErrors.coverLetterMax),
});

export default submitProposalSchema;
