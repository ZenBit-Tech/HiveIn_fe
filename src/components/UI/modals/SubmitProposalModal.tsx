import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import Field from "components/DefaultField/DefaultField";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import submitProposalSchema from "components/UI/modals/SubmitProposalModelSchema";
import { Form } from "components/UI/modals/SubmitProposalStyles";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface ISubmitProposalForm extends FieldValues {
  bid: number;
  exampleRequired: string;
}

interface SubmitProposalModalProps {
  visible: boolean;
  closeModal: () => void;
}

function SubmitProposalModal({
  visible,
  closeModal,
}: SubmitProposalModalProps) {
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
      title="Additional Information"
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="Your Bid"
          control={control}
          name="bid"
          prefix="$"
          suffix="/h"
        />
        <Field
          label="Your Cover Letter"
          control={control}
          name="coverLetter"
          textArea
          maxLength={250}
        />
        <SendButton>Submit Proposal</SendButton>
      </Form>
    </Modal>
  );
}

export default SubmitProposalModal;
