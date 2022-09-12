import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Space, Typography } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import submitProposalSchema from "components/UI/modals/SubmitProposalModelSchema";
import { Form } from "components/UI/modals/SubmitProposalStyles";
import { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSendProposalMutation } from "services/jobPosts/proposalsAPI";

const { Text } = Typography;
interface ISubmitProposalForm extends FieldValues {
  bid: number;
  exampleRequired: string;
}

interface SubmitProposalModalProps {
  idJobPost: number;
  visible: boolean;
  closeModal: () => void;
  clientBudget: number;
}

function SubmitProposalModal({
  idJobPost,
  visible,
  closeModal,
  clientBudget,
}: SubmitProposalModalProps) {
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm<ISubmitProposalForm>({
    resolver: yupResolver(submitProposalSchema),
  });

  const [runSendProposalMutation, { isError, isLoading, isSuccess }] =
    useSendProposalMutation();

  const onSubmit: SubmitHandler<ISubmitProposalForm> = async ({
    bid,
    coverLetter,
  }) => {
    await runSendProposalMutation({ bid, coverLetter, idJobPost });
    closeModal();

    reset();
  };

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(t("ServerErrors.FETCH_ERROR"));
      return;
    }
    if (!isLoading && isSuccess) {
      toast.success(t("SearchWork.success"));
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
