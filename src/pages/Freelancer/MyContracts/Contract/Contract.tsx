import React from "react";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "utils/consts/routeConsts";
import { ContractStatusEnum, DurationTypeEnum } from "utils/enums";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import useModalHandler from "hooks/use-modal-handler";
import { Box, Title, Block, Container, ModalMessage } from "./CotnractStyle";

interface IContract {
  contractStatus: string;
  endDate: string;
  startDate: string;
  duration: number;
  durationType: DurationTypeEnum;
  title: string;
  jobDescription: string;
  rate: number;
  contractId: number;
  closeContract: (contractId: number) => void;
  openJobPost: (index: number) => void;
  jobPostIndex: number;
  chatId: number;
}

function Contract({
  contractStatus,
  endDate,
  startDate,
  duration,
  durationType,
  title,
  jobDescription,
  rate,
  contractId,
  closeContract,
  openJobPost,
  jobPostIndex,
  chatId,
}: IContract) {
  const { modal, toggleModal } = useModalHandler();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const modalHandler = () => {
    closeContract(contractId);
    toggleModal();
  };

  const openJobPostHandler = () => {
    openJobPost(jobPostIndex);
  };

  const onGoToChatClick = () => {
    navigate(`${CHAT_ROUTE}/${chatId}`);
  };

  return (
    <Container>
      <Modal
        onCancel={toggleModal}
        onOk={modalHandler}
        visible={modal}
        title={t("MyJobs.endContractTitle")}
      >
        <ModalMessage>{t("MyJobs.endContractMessage")}</ModalMessage>
      </Modal>
      <Box>
        <div>
          <Block>
            <Title>{t("MyContracts.rateString")}</Title>
            <span>{`${rate} $`}</span>
          </Block>
          <Block>
            <Title>{t("MyContracts.durationString")}</Title>
            <span>{`${duration} ${durationType}`}</span>
          </Block>
          <Block>
            <Title>{t("MyContracts.titleString")}</Title>
            <span>{title}</span>
          </Block>
        </div>
        <div>
          <Block>
            <Title>{t("MyContracts.contractStatusString")}</Title>
            <Button
              onClick={toggleModal}
              size="small"
              type="dashed"
              shape="round"
              style={{ width: "80px" }}
              disabled={contractStatus === ContractStatusEnum.CLOSED}
            >
              {contractStatus}
            </Button>
          </Block>
          <Block>
            <Title>{t("MyContracts.startDateString")}</Title>
            <span>{startDate}</span>
          </Block>
          <Block>
            <Title>{t("MyContracts.endDateString")}</Title>
            <span>{endDate}</span>
          </Block>
        </div>
      </Box>
      <Block>
        <Block>
          <Title>{t("MyContracts.descriptionString")}</Title>
          <span>{jobDescription}</span>
        </Block>
        <Button
          type="primary"
          shape="round"
          style={{ marginRight: "3px" }}
          onClick={onGoToChatClick}
        >
          {t("MyContracts.goToChatBtn")}
        </Button>
        <Button type="default" shape="round" onClick={openJobPostHandler}>
          {t("MyContracts.seeJobPostBtn")}
        </Button>
      </Block>
    </Container>
  );
}

export default Contract;
