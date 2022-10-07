import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Typography, Space } from "antd";
import LinkButton from "components/UI/buttons/LinkButton/LinkButton";
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
import { CREATE_JOB_POST } from "utils/consts/routeConsts";

const { Text } = Typography;

interface ISubmitInviteForm extends FieldValues {
  inviteMessage: string;
  idFreelancer: number;
  idJobPost: number;
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

  const onSubmit: SubmitHandler<ISubmitInviteForm> = async (
    data: ISubmitInviteForm
  ) => {
    await runSendProposalMutation({
      ...data,
      bid,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Modal
      title={
        jobPosts?.length === 0
          ? t("Talent.dontHavePost")
          : `${firstName} ${lastName} ${t("Talent.inviteTitle")}`
      }
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      confirmLoading={isLoading}
    >
      {jobPostIsSuccess &&
        (jobPosts.length === 0 ? (
          <Space size="large" direction="vertical">
            <Text>{t("Talent.createFirstJob")}</Text>
            <LinkButton link={CREATE_JOB_POST}>
              {t("MyJobs.postJob")}
            </LinkButton>
          </Space>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Space size="large">
              <Text>
                {t("Talent.freelancerRate")}
                {bid}
                {t("MyJobs.perHour")}
              </Text>
            </Space>
            <Field
              label={t("Talent.inviteMessage")}
              control={control}
              name="inviteMessage"
              textArea
              maxLength={MAX_LENGTH_OF_COVER_LETTER}
            />
            <JobSelect
              options={jobPosts}
              label={t("Talent.jobs")}
              control={control}
              name="idJobPost"
            />
            <SendButton>{t("Talent.sendButton")}</SendButton>
          </Form>
        ))}
    </Modal>
  );
}

export default SubmitInviteModal;
