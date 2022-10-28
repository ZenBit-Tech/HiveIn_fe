import { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import {
  IContract,
  useCloseContractMutation,
  useGetContractsQuery,
} from "services/contract/contractApi";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { DurationTypeEnum, FilterEnum } from "utils/enums";
import { INPUT_DATE_FORMAT_PRIMARY } from "utils/consts/inputPropsConsts";
import Contract from "pages/Freelancer/MyContracts/Contract/Contract";
import {
  Block,
  Container,
  Plug,
  Title,
} from "pages/Freelancer/MyContracts/MyContractsStyle";
import SearchWorkDrawer from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawer";
import useModalHandler from "hooks/use-modal-handler";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import { toast } from "react-toastify";

const ZERO = 0;

function MyContracts() {
  const { t } = useTranslation();

  const { Option } = Select;

  const { data } = useGetContractsQuery();

  const [closeContract, { isError, isSuccess, isLoading }] =
    useCloseContractMutation();

  const [selectedValue, setSelectedValue] = useState<FilterEnum>(
    FilterEnum.ALL
  );

  const { modal: drawer, toggleModal: toggleDrawer } = useModalHandler();

  const [jobPost, setJobPost] = useState<IJobPost>();

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(t("MyContracts.server.error"));
      return;
    }
    if (!isLoading && isSuccess) {
      toast.success(t("MyContracts.server.success"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const openJobPost = (index: number) => {
    if (data) {
      setJobPost(data[index].offer.jobPost);
      toggleDrawer();
    }
  };

  const onChangeHandler = (value: FilterEnum) => {
    setSelectedValue(value);
  };

  const closeContractHandler = async (contractId: number) => {
    await closeContract({
      contractId,
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
        transformResponse(data).map((contract, index) => (
          <Contract
            key={contract.id}
            chatId={contract.offer.jobPost.chatRoom[0]?.id}
            jobPostIndex={index}
            contractId={contract.id}
            closeContract={closeContractHandler}
            contractStatus={contract.status}
            startDate={dateCheck(contract.startDate)}
            endDate={dateCheck(contract.endDate)}
            duration={contract.offer.jobPost?.duration || ZERO}
            durationType={
              contract.offer.jobPost?.durationType || DurationTypeEnum.WEEK
            }
            title={contract.offer.jobPost?.title || t("MyContracts.empty")}
            jobDescription={
              contract.offer.jobPost?.jobDescription || t("MyContracts.empty")
            }
            rate={contract.offer.jobPost?.rate || ZERO}
            openJobPost={openJobPost}
          />
        ))
      ) : (
        <Plug>{t("MyContracts.noContracts")}</Plug>
      )}
      {jobPost && (
        <SearchWorkDrawer
          {...jobPost}
          onClose={toggleDrawer}
          visible={drawer}
          sendProposalButtonIsVisible={false}
        />
      )}
    </Container>
  );
}

export default MyContracts;
