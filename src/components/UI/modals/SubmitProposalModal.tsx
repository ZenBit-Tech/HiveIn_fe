import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Space, Typography } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import submitProposalSchema from "components/UI/modals/SubmitProposalModelSchema";
import { Form } from "components/UI/modals/SubmitProposalStyles";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

const { Text } = Typography;
interface ISubmitProposalForm extends FieldValues {
  bid: number;
  exampleRequired: string;
}

interface SubmitProposalModalProps {
  visible: boolean;
  closeModal: () => void;
  clientBudget: number;
}

function SubmitProposalModal({
  visible,
  closeModal,
  clientBudget,
}: SubmitProposalModalProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<ISubmitProposalForm>({
    resolver: yupResolver(submitProposalSchema),
  });

  const onSubmit: SubmitHandler<ISubmitProposalForm> = (data) => {
    closeModal();
    reset();
    console.log(data);
  };

  return (
    <Modal
      title={t("SearchWork.modalTitle")}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Space size="large">
          <Text>
            {t("SearchWork.clientBudget")}
            {clientBudget}
            {t("MyJobs.perHour")}
          </Text>
          <Text>
            {t("SearchWork.profileRate")}
            {clientBudget}
            {t("MyJobs.perHour")}
          </Text>
        </Space>
        <Field
          label={t("SearchWork.bid")}
          control={control}
          name="bid"
          prefix={t("MyJobs.currency")}
          suffix={t("MyJobs.perHour")}
        />
        <Field
          label={t("SearchWork.coverLetter")}
          control={control}
          name="coverLetter"
          textArea
          maxLength={250}
        />
        <SendButton>{t("SearchWork.send")}</SendButton>
      </Form>
    </Modal>
  );
}

export default SubmitProposalModal;
