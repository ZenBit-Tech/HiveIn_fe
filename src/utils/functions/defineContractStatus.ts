import { ContractStatusEnum } from "utils/enums";

const defineContractStatus = (endDate?: Date): ContractStatusEnum => {
  if (!endDate) {
    return ContractStatusEnum.ACTIVE;
  }
  return ContractStatusEnum.CLOSED;
};
export default defineContractStatus;
