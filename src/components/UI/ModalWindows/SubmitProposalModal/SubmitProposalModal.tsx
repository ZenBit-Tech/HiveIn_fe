import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Space, Typography } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import submitProposalSchema from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalModelSchema";
import { Form } from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalStyles";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSendProposalMutation } from "services/jobPosts/proposalsAPI";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";
import { ProposalType } from "utils/enums";
import { useGetOwnProfileQuery } from "services/profileInfo/profileInfoAPI";
import { createJobAttachmentFileTypes } from "utils/consts/fileTypes";
import { Button } from "@mui/material";
import FileBox from "components/FileBox/FileBox";

const { Text } = Typography;

interface ISubmitProposalForm extends FieldValues {
  bid: number;
  message: string;
  file: File | null;
}

interface ISubmitProposalModalProps {
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
}: ISubmitProposalModalProps) {
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState<null | File>(null);

  const { data: freelancer } = useGetOwnProfileQuery();
  const { rate, id } = freelancer!;

  const { control, setValue, handleSubmit, reset } =
    useForm<ISubmitProposalForm>({
      resolver: yupResolver(submitProposalSchema),
      defaultValues: {
        bid: +rate,
      },
    });

  const [runSendProposalMutation, { isError, isLoading, isSuccess }] =
    useSendProposalMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(t("ServerErrors.FETCH_ERROR"));
      return;
    }
    if (!isLoading && isSuccess) {
      toast.success(t("SearchWork.success"));
      reset();
    }

    setValue("file", selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, selectedFile]);

  const fileTypes: string[] = Object.values(createJobAttachmentFileTypes);
  const MAX_FILE_SIZE = 5e6;

  const onSubmit: SubmitHandler<ISubmitProposalForm> = async (data) => {
    const formData = new FormData();
    // formData.append("file", file[0]);

    const reqObject = {
      ...data,
      idJobPost,
      idFreelancer: id,
      type: ProposalType.PROPOSAL,
    };

    // eslint-disable-next-line array-callback-return
    Object.entries(reqObject).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((element, index) =>
          formData.append(`${key}[${index}]`, `${element}`)
        );
      } else {
        formData.append(key, value instanceof File ? value : `${value}`);
      }
    });

    if (freelancer) await runSendProposalMutation(formData);

    closeModal();
    reset();
  };

  const handleUploadFile: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files && target.files[0]) {
      const file = target.files[0];

      if (fileTypes.includes(file.type) && file.size < MAX_FILE_SIZE) {
        setSelectedFile(file);
      } else if (!fileTypes.includes(file.type)) {
        toast.error(t("PostJob.messages.unsupportedFile"));
      } else {
        toast.error(t("PostJob.messages.bigFileSize"));
      }
    }
  };

  return (
    <Modal
      title={t("SearchWork.modalTitle")}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
      confirmLoading={isLoading}
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
          name="message"
          textArea
          maxLength={MAX_LENGTH_OF_COVER_LETTER}
        />
        {selectedFile ? (
          <FileBox file={selectedFile} handlerRemove={setSelectedFile} />
        ) : (
          <Button variant="contained" component="label">
            {t("PostJob.buttonsText.fileUpload")}
            <input
              hidden
              onChange={handleUploadFile}
              accept={fileTypes.join(", ")}
              type="file"
            />
          </Button>
        )}

        <SendButton>{t("SearchWork.send")}</SendButton>
      </Form>
    </Modal>
  );
}

export default SubmitProposalModal;
