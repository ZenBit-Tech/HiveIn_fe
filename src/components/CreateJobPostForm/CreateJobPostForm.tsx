import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import propsDataCollection from "components/CreateJobPostForm/staticData";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import {
  IJobPostFormFields,
  IProps,
} from "components/CreateJobPostForm/typesDef";
import FileBox from "components/FileBox/FileBox";
import { SButtonsGroup } from "components/CreateJobPostForm/styles";
import { IFreelancer } from "services/profileInfo/typesDef";
import { useGetOwnUserQuery } from "services/user/setUserAPI";
import {
  usePostJobPostMutation,
  usePostDraftMutation,
} from "services/jobPosts/setJobPostsAPI";
import {
  createJobPostValidationSchema,
  jobPostsDraftSchema,
} from "validation/createJobPostValidationSchema";
import createDataForResolver from "utils/functions/createDataForResolver";
import { createJobAttachmentFileTypes } from "utils/consts/fileTypes";

function CreateJobPostForm(props: IProps) {
  const { existedDraftData, queriedSkills, setIsOpen } = props;
  const { data: userData, isError: getUserError } = useGetOwnUserQuery();

  const [
    postJobPost,
    {
      isSuccess: postJobSuccess,
      isError: postJobError,
      isLoading: postJobLoading,
    },
  ] = usePostJobPostMutation();
  const [
    postDraft,
    {
      isSuccess: postDraftSuccess,
      isError: postDraftError,
      isLoading: postDraftLoading,
    },
  ] = usePostDraftMutation();
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors: validationErrors, isSubmitSuccessful },
  } = useForm<IJobPostFormFields>({
    context: isDraft,
    defaultValues: existedDraftData,
    resolver: (data, context) => {
      const { errorsMessages, validData } = context
        ? createDataForResolver(data, jobPostsDraftSchema)
        : createDataForResolver(data, createJobPostValidationSchema);

      return {
        values: validData,
        errors: errorsMessages,
      };
    },
  });
  const fileTypes: string[] = Object.values(createJobAttachmentFileTypes);
  const MAX_FILE_SIZE = 5e6;

  useEffect(() => {
    if (!postDraftLoading) {
      if (postDraftSuccess) toast.success(t("PostJob.messages.draftSuccess"));
      if (postDraftError) toast.error(t("PostJob.messages.draftError"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDraftSuccess, postDraftError]);

  useEffect(() => {
    if (!postJobLoading) {
      if (postJobSuccess) toast.success(t("PostJob.messages.postSuccess"));
      if (postJobError) toast.error(t("PostJob.messages.postError"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postJobSuccess, postJobError]);

  useEffect(() => {
    setValue("file", selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSelectedFile(null);
      reset();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isSubmitSuccessful]);

  const handlerSubmitForm = (data: IJobPostFormFields) => {
    const { skills: skillsId, jobDescription, rate, duration, ...rest } = data;

    const objToRequest = {
      ...rest,
      skillsId: skillsId?.length >= 3 ? skillsId : null,
      jobDescription: jobDescription || null,
      rate: rate || null,
      duration: duration || undefined,
      userId: userData?.id!,
      isDraft,
    };

    if (isDraft) {
      postDraft(objToRequest);
      if (setIsOpen) setIsOpen(false);
      return;
    }

    const formData = new FormData();

    // eslint-disable-next-line array-callback-return
    Object.entries(objToRequest).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((element, index) =>
          formData.append(`${key}[${index}]`, `${element}`)
        );
      } else {
        formData.append(key, value instanceof File ? value : `${value}`);
      }
    });

    postJobPost(formData);
    if (setIsOpen) setIsOpen(false);
  };

  const handlerPostDraft = () => setIsDraft(() => true);
  const handlerPostJobPost = () => setIsDraft(() => false);

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
    <div>
      <h2>
        {existedDraftData
          ? t("PostJob.titleForDraft")
          : t("PostJob.titleForCreate")}
      </h2>
      <form onSubmit={handleSubmit(handlerSubmitForm)}>
        {propsDataCollection.map((propsData) => (
          <LayoutElementWithTitle
            key={propsData.title}
            isSubmitSuccess={isSubmitSuccessful}
            control={control as unknown as Control}
            errors={validationErrors as unknown as FieldErrors}
            setValue={setValue as unknown as UseFormSetValue<any>}
            freelancerInfo={
              {
                skills: queriedSkills || [],
              } as unknown as IFreelancer
            }
            {...propsData}
          />
        ))}
        {selectedFile ? (
          <FileBox file={selectedFile} handlerRemove={setSelectedFile} />
        ) : (
          <Button
            sx={{ marginLeft: "180px", marginBottom: "10px" }}
            variant="contained"
            component="label"
          >
            {t("PostJob.buttonsText.fileUpload")}
            <input
              hidden
              onChange={handleUploadFile}
              accept={fileTypes.join(", ")}
              type="file"
            />
          </Button>
        )}
        {!getUserError && (
          <SButtonsGroup>
            <LoadingButton
              loading={postDraftLoading || postJobLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
              onClick={handlerPostDraft}
            >
              {t("PostJob.buttonsText.postDraft")}
            </LoadingButton>
            <LoadingButton
              loading={postDraftLoading || postJobLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
              onClick={handlerPostJobPost}
            >
              {t("PostJob.buttonsText.postJob")}
            </LoadingButton>
          </SButtonsGroup>
        )}
      </form>
    </div>
  );
}

export default CreateJobPostForm;
