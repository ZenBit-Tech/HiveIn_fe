import { yupResolver } from "@hookform/resolvers/yup";
import { RcFile } from "antd/lib/upload";
import submitProposalSchema from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalModelSchema";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSendProposalMutation } from "services/jobPosts/proposalsAPI";
import { useGetOwnProfileQuery } from "services/profileInfo/profileInfoAPI";
import { ProposalType } from "utils/enums";

interface ISubmitProposalForm extends FieldValues {
  bid: number;
  message: string;
  file: RcFile | undefined;
}

interface IUseSubmitProposalProps {
  idJobPost: number;
  refetch: () => void;
  closeModal: () => void;
}

const useSubmitProposal = ({
  idJobPost,
  refetch,
  closeModal,
}: IUseSubmitProposalProps) => {
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

  return { control, handleSubmit, onSubmit, isLoading, setSelectedFile };
};

export default useSubmitProposal;
