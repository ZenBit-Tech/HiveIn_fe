import { useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import {
  useCloseContractMutation,
  useGetContractsQuery,
} from "services/contract/contractApi";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { DurationTypeEnum, FilterEnum } from "utils/enums";
import { INPUT_DATE_FORMAT_PRIMARY } from "utils/consts/inputPropsConsts";
import Contract from "pages/Freelancer/MyContracts/Contract/Contract";
import { IContract } from "pages/Freelancer/MyContracts/Contract/interfaces";
import {
  Block,
  Container,
  Plug,
  Title,
} from "pages/Freelancer/MyContracts/MyContractsStyle";

const ZERO = 0;

function MyContracts() {
  const { t } = useTranslation();

  const { Option } = Select;

  const { data } = useGetContractsQuery();

  const [closeContract] = useCloseContractMutation();

  const [selectedValue, setSelectedValue] = useState<FilterEnum>(
    FilterEnum.ALL
  );

  const onChangeHandler = (value: FilterEnum) => {
    setSelectedValue(value);
  };

  const closeContractHandler = async (
    contractId: number,
    freelancerId: number
  ) => {
    await closeContract({
      contractId,
      endDate: new Date(),
      freelancer: freelancerId,
    });
  };

  const dateCheck = (date?: string): string => {
    if (date) {
      return formatToStandardDate(new Date(date), INPUT_DATE_FORMAT_PRIMARY);
    }
    return t("MyContracts.empty");
  };

  const transformResponse = (contracts: IContract[]) => {
    return contracts
      .map((contract) => ({
        ...contract,
        status: contract.endDate ? FilterEnum.CLOSED : FilterEnum.ACTIVE,
      }))
      .filter((contract) => {
        if (selectedValue !== FilterEnum.ALL) {
          return contract.status === selectedValue;
        }
        return contract;
      });
  };

  return (
    <Container>
      <Block>
        <Title>{t("MyContracts.title")}</Title>
        <Select
          disabled={!data?.length}
          style={{ width: "100px" }}
          defaultValue={FilterEnum.ALL}
          onChange={onChangeHandler}
        >
          <Option value={FilterEnum.ACTIVE}>
            {t("MyContracts.filter.active")}
          </Option>
          <Option value={FilterEnum.CLOSED}>
            {t("MyContracts.filter.closed")}
          </Option>
          <Option value={FilterEnum.ALL}>{t("MyContracts.filter.all")}</Option>
        </Select>
      </Block>
      {data?.length ? (
        transformResponse(data).map((contract) => (
          <Contract
            key={contract.id}
            contractId={contract.id}
            freelancerId={contract.freelancer.id}
            closeContract={closeContractHandler}
            contractStatus={contract.status}
            startDate={dateCheck(contract.startDate)}
            endDate={dateCheck(contract.endDate)}
            duration={contract.jobPost?.duration || ZERO}
            durationType={
              contract.jobPost?.durationType || DurationTypeEnum.WEEK
            }
            title={contract.jobPost?.title || t("MyContracts.empty")}
            jobDescription={
              contract.jobPost?.jobDescription || t("MyContracts.empty")
            }
            rate={contract.jobPost?.rate || ZERO}
          />
        ))
      ) : (
        <Plug>{t("MyContracts.noContracts")}</Plug>
      )}
    </Container>
  );
}

export default MyContracts;
