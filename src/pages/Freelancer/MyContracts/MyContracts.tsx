import { useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import {
  useCloseContractMutation,
  useGetContractsQuery,
} from "services/contract/contractApi";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { DurationTypeEnum, FilterEnum } from "utils/enums";
import Contract from "./Contract/Contract";
import { IContract } from "./Contract/interfaces";

const ZERO = 0;
const dateFormat = "dd/MM/yyyy";

function MyContracts() {
  const { t } = useTranslation();

  const { Option } = Select;

  const { data, refetch } = useGetContractsQuery();

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
    await refetch();
  };

  const dateCheck = (date?: string): string => {
    if (date) {
      return formatToStandardDate(new Date(date), dateFormat);
    }
    return t("MyContracts.empty");
  };

  const transformResponse = (contracts: IContract[]) => {
    return contracts
      .map((e) => ({
        ...e,
        status: e.endDate ? FilterEnum.CLOSED : FilterEnum.ACTIVE,
      }))
      .filter((e) => {
        if (selectedValue !== FilterEnum.ALL) {
          return e.status === selectedValue;
        }
        return e;
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <h3 style={{ margin: "0 10px" }}>{t("MyContracts.title")}</h3>
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
      </div>
      {data?.length ? (
        transformResponse(data).map((c) => (
          <Contract
            key={c.id}
            contractId={c.id}
            freelancerId={c.freelancer.id}
            closeContract={closeContractHandler}
            contractStatus={c.status}
            startDate={dateCheck(c.startDate)}
            endDate={dateCheck(c.endDate)}
            duration={c.jobPost?.duration || ZERO}
            durationType={c.jobPost?.durationType || DurationTypeEnum.WEEK}
            title={c.jobPost?.title || t("MyContracts.empty")}
            jobDescription={c.jobPost?.jobDescription || t("MyContracts.empty")}
            rate={c.jobPost?.rate || ZERO}
          />
        ))
      ) : (
        <div style={{ margin: "0 auto", fontSize: "24px" }}>
          {t("MyContracts.noContracts")}
        </div>
      )}
    </div>
  );
}

export default MyContracts;
