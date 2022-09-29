import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Typography, Space } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSendProposalMutation } from "services/jobPosts/proposalsAPI";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";
import { IUser } from "services/user/setUserAPI";
import { useGetOwnJobPostsQuery } from "services/jobPosts/setJobPostsAPI";
import JobSelect from "components/UI/jobSelect/JobSelect";
import submitInviteSchema from "components/UI/ModalWindows/SubmitInviteModal/SubmitInviteModalSchema";
import { Form } from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalStyles";
import { ProposalType } from "utils/enums";

const { Text } = Typography;

interface ISubmitInviteForm extends FieldValues {
  inviteMessage: string;
  idFreelancer: number;
  idJobPost: number;
  bid: number;
}

interface ISubmitInviteModalProps {
  freelancerId: number;
  bid: number;
  visible: boolean;
  closeModal: () => void;
  freelancerUser: IUser;
}

function SubmitInviteModal({
  freelancerId,
  visible,
  bid,
  closeModal,
  freelancerUser: { lastName, firstName },
}: ISubmitInviteModalProps) {
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm<ISubmitInviteForm>({
    resolver: yupResolver(submitInviteSchema),
    defaultValues: {
      inviteMessage: t("Talent.defaultInviteMessage"),
    },
  });

  const { data: jobPosts, isSuccess: jobPostIsSuccess } =
    useGetOwnJobPostsQuery(false);

  const [runSendProposalMutation, { isError, isLoading, isSuccess }] =
    useSendProposalMutation();

  const onSubmit: SubmitHandler<ISubmitInviteForm> = async (data) => {
    await runSendProposalMutation({
      ...data,
      message: data.inviteMessage,
      idFreelancer: freelancerId,
      type: ProposalType.INVITE,
    });
    closeModal();
    reset();
  };

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(t("ServerErrors.FETCH_ERROR"));
      return;
    }
    if (!isLoading && isSuccess) {
      toast.success(t("Talent.success"));
      reset();
    }
  }, [isLoading]);

  return (
    <Modal
      title={`${firstName} ${lastName} ${t("Talent.inviteTitle")}`}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      confirmLoading={isLoading}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Space size="large">
          <Text>
            {t("Talent.freelancerRate")}
            {bid}
            {t("MyJobs.perHour")}
          </Text>
        </Space>
        <Field
          control={control}
          name="bid"
          prefix={t("MyJobs.currency")}
          suffix={t("MyJobs.perHour")}
        />
        <Field
          label={t("Talent.inviteMessage")}
          control={control}
          name="inviteMessage"
          textArea
          maxLength={MAX_LENGTH_OF_COVER_LETTER}
        />
        {jobPostIsSuccess && (
          <JobSelect
            options={jobPosts}
            label={t("Talent.jobs")}
            control={control}
            name="idJobPost"
          />
        )}
        <SendButton>{t("Talent.sendButton")}</SendButton>
      </Form>
    </Modal>
  );
}

export default SubmitInviteModal;
