import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSendInviteMutation } from "services/jobPosts/proposalsAPI";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";
import { IUser } from "services/user/setUserAPI";
import { useGetOwnJobPostsQuery } from "services/jobPosts/setJobPostsAPI";
import JobSelect from "components/UI/jobSelect/JobSelect";
import submitInviteSchema from "components/UI/ModalWindows/SubmitInviteModal/SubmitInviteModalSchema";
import { Form } from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalStyles";

interface ISubmitInviteForm extends FieldValues {
  categoryId: number;
  exampleRequired: string;
}

interface ISubmitInviteModalProps {
  freelancerId: number;
  visible: boolean;
  closeModal: () => void;
  freelancerUser: IUser;
}

function SubmitInviteModal({
  freelancerId,
  visible,
  closeModal,
  freelancerUser: { lastName, firstName },
}: ISubmitInviteModalProps) {
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm<ISubmitInviteForm>({
    resolver: yupResolver(submitInviteSchema),
    defaultValues: {
      coverLetter: t("Talent.defaultInviteMessage"),
    },
  });

  const { data: jobPosts, isSuccess: jobPostIsSuccess } =
    useGetOwnJobPostsQuery();

  const [runSendInviteMutation, { isError, isLoading, isSuccess }] =
    useSendInviteMutation();

  const onSubmit: SubmitHandler<ISubmitInviteForm> = async ({
    jobId,
    coverLetter,
  }) => {
    await runSendInviteMutation({ jobId, coverLetter, freelancerId });
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
            name="jobId"
          />
        )}
        <SendButton>{t("Talent.sendButton")}</SendButton>
      </Form>
    </Modal>
  );
}

export default SubmitInviteModal;
