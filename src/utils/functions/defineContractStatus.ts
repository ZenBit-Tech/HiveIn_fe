import { ContractStatusEnum } from "utils/enums";

const defineContractStatus = (
  startDate?: Date,
  endDate?: Date
): ContractStatusEnum => {
  if (!startDate) {
    return ContractStatusEnum.PENDING;
  }
  if (!endDate) {
    return ContractStatusEnum.ACTIVE;
  }
  return ContractStatusEnum.CLOSED;
};
export default defineContractStatus;
