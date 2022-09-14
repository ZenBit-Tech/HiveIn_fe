import React from "react";
import styled from "styled-components";
import { ContractStatusEnum, DurationTypeEnum } from "utils/enums";
import { DARK_BLUE } from "utils/consts/colorConsts";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import useModalHandler from "hooks/use-modal-handler";

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
  freelancerId: number;
  closeContract: (contractId: number, freelancerId: number) => void;
}

const Container = styled.div`
  max-width: 800px;
  border: 1px solid ${DARK_BLUE};
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  margin-right: 5px;
  font-weight: 700;
  text-decoration: underline;
  &:after {
    content: ":";
  }
`;
const Block = styled.div`
  margin: 5px 0;
`;

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
  freelancerId,
}: IContract) {
  const { modal, toggleModal } = useModalHandler();

  const { t } = useTranslation();

  const modalHandler = () => {
    closeContract(contractId, freelancerId);
    toggleModal();
  };

  return (
    <Container>
      <Modal
        onCancel={toggleModal}
        onOk={modalHandler}
        visible={modal}
        title={t("MyJobs.endContractTitle")}
      >
        <p style={{ fontSize: "20px" }}>{t("MyJobs.endContractMessage")}</p>
      </Modal>
      <Box>
        <div>
          <Block>
            <Title>{t("MyContracts.rateString")}</Title>
            <span>{`${rate}${t("MyJobs.currency")}`}</span>
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
        <Block style={{ maxWidth: "500px" }}>
          <Title>{t("MyContracts.descriptionString")}</Title>
          <span>{jobDescription}</span>
        </Block>
        <Button type="primary" shape="round" style={{ marginRight: "3px" }}>
          {t("MyContracts.goToChatBtn")}
        </Button>
        <Button type="default" shape="round">
          {t("MyContracts.seeJobPostBtn")}
        </Button>
      </Block>
    </Container>
  );
}

export default Contract;
