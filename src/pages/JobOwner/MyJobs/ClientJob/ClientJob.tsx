import { useParams } from "react-router-dom";
import PageContainer, {
  Card,
  ContractStatus,
  Header,
  Section,
  SMenuWrapper,
  TitleText,
} from "pages/JobOwner/MyJobs/ClientJobsStyles";
import JobItem from "components/UI/JobItem/JobItem";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button, Modal, notification } from "antd";
import useModalHandler from "hooks/use-modal-handler";
import defineContractStatus from "utils/functions/defineContractStatus";
import { ContractStatusEnum } from "utils/enums";
import LongMenu from "components/UI/DropdownMenus/LongMenu/LongMenu";
import { useCloseContractMutation } from "services/contract/contractApi";
import { useEffect } from "react";

dayjs.extend(relativeTime);

function ClientJob(): JSX.Element {
  const { jobId } = useParams();
  const { t } = useTranslation();
  const { data, refetch } = useGetOneJobPostQuery({
    id: Number(jobId),
  });

  const [closeContract, { isError, isSuccess, isLoading }] =
    useCloseContractMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      notification.error({
        description: `${t("MyContracts.server.tryAgain")}`,
        message: `${t("MyContracts.server.error")}`,
      });
      return;
    }
    if (!isLoading && isSuccess) {
      notification.success({
        description: `${t("MyContracts.server.statusChanged")}`,
        message: `${t("MyContracts.server.success")}`,
      });
      refetch();
    }
  }, [isLoading]);

  const { modal, toggleModal } = useModalHandler();

  const onModalOk = async () => {
    if (data?.contract) {
      await closeContract({
        contractId: data?.contract.id,
        endDate: new Date(),
      });
      toggleModal();
    }
  };

  return (
    <PageContainer>
      <Modal
        visible={modal}
        title={t("MyJobs.endContractTitle")}
        onOk={onModalOk}
        onCancel={toggleModal}
        okText={t("MyJobs.continueText")}
      >
        <p> {t("MyJobs.endContractMessage")}</p>
      </Modal>
      <Header wd="70%">
        <TitleText font_sz="2.5em" pd="20px" pd_bottom="5%">
          {data?.title || t("NotFound.notFound")}
          <TitleText font_sz="0.4em" pd="5px" pd_bottom="1%">
            {data?.createdAt
              ? dayjs(data?.createdAt).fromNow()
              : t("NotFound.notFound")}
          </TitleText>
        </TitleText>
        <ContractStatus>
          <span style={{ marginRight: "10px" }}>
            {t("MyJobs.contractStatusTitle")}
          </span>
          <Button
            size="small"
            type={
              defineContractStatus(
                data?.contract?.startDate,
                data?.contract?.endDate
              ) === ContractStatusEnum.ACTIVE
                ? "primary"
                : "dashed"
            }
            shape="round"
            disabled={
              defineContractStatus(
                data?.contract?.startDate,
                data?.contract?.endDate
              ) !== ContractStatusEnum.ACTIVE
            }
            onClick={toggleModal}
          >
            {defineContractStatus(
              data?.contract?.startDate,
              data?.contract?.endDate
            )}
          </Button>
        </ContractStatus>
      </Header>
      <Section wd="70%">
        <Card>
          {data && (
            <SMenuWrapper>
              <LongMenu id={data.id} />
            </SMenuWrapper>
          )}
          <JobItem
            description={data?.jobDescription || t("NotFound.notFound")}
            hourlyRate={String(data?.rate || t("NotFound.notFound"))}
            skills={data?.skills.map((item) => item.name) || [""]}
          />
        </Card>
      </Section>
    </PageContainer>
  );
}

export default ClientJob;
