import { ConfidentialSettings } from "utils/enums";

const createConfidentialInfo = (
  phone: boolean,
  email: boolean
): ConfidentialSettings => {
  if (phone && email) return ConfidentialSettings.VISIBLE;
  if (!phone && email) return ConfidentialSettings.EMAIL_ONLY;
  if (phone && !email) return ConfidentialSettings.PHONE_ONLY;

  return ConfidentialSettings.HIDDEN;
};

export default createConfidentialInfo;
