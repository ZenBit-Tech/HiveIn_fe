import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Space, Typography, Upload } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import submitProposalSchema from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalModelSchema";
import { Form } from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalStyles";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSendProposalMutation } from "services/jobPosts/proposalsAPI";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";
import { ProposalType } from "utils/enums";
import { useGetOwnProfileQuery } from "services/profileInfo/profileInfoAPI";

import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const { Text } = Typography;

interface ISubmitProposalForm extends FieldValues {
  bid: number;
  message: string;
  file: RcFile | undefined;
}

interface ISubmitProposalModalProps {
  idJobPost: number;
  visible: boolean;
  closeModal: () => void;
  clientBudget: number;
  refetch: () => void;
}

function SubmitProposalModal({
  idJobPost,
  visible,
  closeModal,
  clientBudget,
  refetch,
}: ISubmitProposalModalProps) {
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState<RcFile | undefined>(
    undefined
  );

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
      setSelectedFile(undefined);
      refetch();
    }

    setValue("file", selectedFile!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, selectedFile]);

  const onSubmit: SubmitHandler<ISubmitProposalForm> = async (data) => {
    const formData = new FormData();

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
        <Upload.Dragger
          onChange={({ file }) => setSelectedFile(file.originFileObj)}
          maxCount={1}
          listType="picture"
          beforeUpload={() => false}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess!("ok");
            }, 0);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <Text>{t("Proposals.upload")}</Text>
        </Upload.Dragger>

        <SendButton>{t("SearchWork.send")}</SendButton>
      </Form>
    </Modal>
  );
}

export default SubmitProposalModal;
