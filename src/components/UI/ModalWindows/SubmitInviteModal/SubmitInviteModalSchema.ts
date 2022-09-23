import * as yup from "yup";
import i18next from "localization/en/en.json";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";

const submitInviteSchema = yup.object({
  inviteMessage: yup
    .string()
    .required(i18next.SendProposalErrors.coverLetterRequired)
    .max(MAX_LENGTH_OF_COVER_LETTER, i18next.SendProposalErrors.coverLetterMax),
});

export default submitInviteSchema;
