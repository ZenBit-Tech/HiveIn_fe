import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { toast } from "react-toastify";
import {
  useGetOwnProfileQuery,
  useUpdateProfileMutation,
} from "services/profileInfo/profileInfoAPI";
import { TFreelancerForProfileForm } from "components/profileEditForm/typesDef";
import schema from "validation/profileEditFormValidationSchema";
import i18next from "localization/en/en.json";

const useProfileEditForm = () => {
  const { data, isSuccess, isError, refetch } = useGetOwnProfileQuery();

  const [
    updateProfile,
    { isSuccess: submitSuccess, isError: submitError, isLoading },
  ] = useUpdateProfileMutation();

  const [initialState, setInitialState] = useState<TFreelancerForProfileForm>();

  useEffect(() => {
    if (isSuccess && data) {
      setInitialState({
        ...data,
        skills: data.skills.map(({ id }) => id),
        category: data.categoryId,
        description: data?.user.description || "",
      });
    }
  }, [data, isSuccess]);

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  useEffect(() => {
    reset(initialState);
  }, [reset, initialState]);

  useEffect(() => {
    if (!isLoading && submitSuccess) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, submitSuccess]);

  useEffect(() => {
    if (submitSuccess && !isLoading)
      toast.success(i18next.profileSuccessSubmitMessage);
    if ((submitError || isError) && !isLoading)
      toast.error(i18next.profileFormErrorMessages.defaultError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSuccess, submitError, isError]);

  useEffect(() => {
    if (data === null && !isLoading)
      toast.error(i18next.profileFormErrorMessages.userNotFound);
  }, [data, isLoading]);

  return {
    data,
    updateProfile,
    isSuccess,
    handleSubmit,
    control,
    setValue,
    errors,
  };
};

export default useProfileEditForm;
