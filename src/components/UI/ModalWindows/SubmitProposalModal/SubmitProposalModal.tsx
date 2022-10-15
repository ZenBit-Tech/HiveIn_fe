import { Modal, Space, Typography, Upload } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { Form } from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalStyles";
import { useTranslation } from "react-i18next";
import { MAX_LENGTH_OF_COVER_LETTER } from "utils/consts/numberConsts";
import { InboxOutlined } from "@ant-design/icons";
import useSubmitProposal from "hooks/useSubmitProposal";

const { Text } = Typography;

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

  const { isLoading, control, handleSubmit, onSubmit, setSelectedFile } =
    useSubmitProposal({ idJobPost, refetch, closeModal });

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
