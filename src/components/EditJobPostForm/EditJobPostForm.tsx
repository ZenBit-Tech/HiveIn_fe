import React, { Dispatch, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useGetOwnUserQuery } from "services/user/setUserAPI";
import { useUpdatePostMutation } from "services/jobPosts/setJobPostsAPI";
import { SDiv } from "components/EditJobPostForm/styles";
import schema from "validation/editFormValidationSchema";
import { useTranslation } from "react-i18next";

interface IState {
  jobDescription: string;
  rate: number;
}

interface IProps extends IState {
  postId: number;
  setIsOpen: Dispatch<boolean>;
}

function EditJobPostForm({ jobDescription, rate, postId, setIsOpen }: IProps) {
  const {
    data: userData,
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    isLoading: isGetUserLoading,
  } = useGetOwnUserQuery();
  const [updatePost, { isSuccess, isError, isLoading }] =
    useUpdatePostMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IState>({
    defaultValues: {
      jobDescription,
      rate,
    },
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess && !isLoading)
      toast.success(t("EditDeletePost.edit.updatedSuccessfully"));
    if (isError && !isLoading)
      toast.error(t("EditDeletePost.edit.updateError"));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isGetUserError && !isLoading)
      toast.error(t("EditDeletePost.edit.userNotFound"));
  }, [isGetUserError]);

  const onSubmit = (data: IState) => {
    if (isGetUserSuccess)
      updatePost({ ...data, userId: userData?.id!, postId });

    setIsOpen(false);
  };

  const endAdornment = <InputAdornment position="end">$</InputAdornment>;

  return (
    <>
      <h2>{t("EditDeletePost.edit.title")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SDiv>
          <p>{t("EditDeletePost.edit.text")}</p>
          <Controller
            control={control}
            name="rate"
            render={({ field }) => (
              <TextField
                error={!!errors.rate?.message}
                helperText={errors.rate?.message}
                {...field}
                type="number"
                label={t("EditDeletePost.edit.labelRate")}
                InputProps={{ endAdornment }}
              />
            )}
          />
          <Controller
            control={control}
            name="jobDescription"
            render={({ field }) => (
              <TextField
                error={!!errors.jobDescription?.message}
                multiline
                rows={4}
                InputProps={{ inputProps: { maxLength: 5000 } }}
                label={t("EditDeletePost.edit.descriptionLabel")}
                {...field}
                helperText={errors.jobDescription?.message}
              />
            )}
          />
          {isGetUserSuccess && (
            <LoadingButton
              loading={isLoading || isGetUserLoading}
              type="submit"
              variant="contained"
            >
              {t("EditDeletePost.edit.submitButtonText")}
            </LoadingButton>
          )}
        </SDiv>
      </form>
    </>
  );
}

export default EditJobPostForm;
