import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetOwnUserQuery,
  useUpdateUserMutation,
} from "services/user/setUserAPI";
import { ConfidentialSettings } from "utils/enums";
import contactEditFormValidationSchema from "validation/contactEditFormValidationSchema";
import i18next from "localization/en/en.json";

export interface IUserForContactInfo {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isVisibleEmail: boolean;
  isVisiblePhone: boolean;
}

const UseContactInfoForm = () => {
  const [initialState, setInitialState] = useState<IUserForContactInfo>();
  const { t } = useTranslation();

  const {
    data,
    isSuccess,
    isError: getUserError,
    refetch,
  } = useGetOwnUserQuery();
  const [
    updateUser,
    { error, isError: submitError, isSuccess: submitSuccess },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess)
      setInitialState({
        email: data.email,
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        phone: data.phone ? data.phone.slice(1) : undefined,
        isVisibleEmail:
          data.confidentialSetting === ConfidentialSettings.VISIBLE ||
          data.confidentialSetting === ConfidentialSettings.EMAIL_ONLY,
        isVisiblePhone:
          data.confidentialSetting === ConfidentialSettings.VISIBLE ||
          data.confidentialSetting === ConfidentialSettings.PHONE_ONLY,
      });
  }, [data, isSuccess]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IUserForContactInfo>({
    resolver: yupResolver(contactEditFormValidationSchema),
    defaultValues: initialState,
  });

  useEffect(() => {
    reset(initialState);
  }, [reset, initialState]);

  useEffect(() => {
    if (submitSuccess) toast.success(i18next.profileSuccessSubmitMessage);
    if (submitError) {
      toast.error(
        // @ts-ignore
        error?.data?.message[0] ||
          i18next.contactInfoForm.errorMessages.somethingWrong
      );
    }
    if (getUserError)
      toast.error(i18next.contactInfoForm.errorMessages.userNotFound);
    // eslint-disable-next-line
  }, [submitSuccess, submitError, getUserError]);

  return {
    isSuccess,
    updateUser,
    data,
    handleSubmit,
    refetch,
    control,
    errors,
    t,
  };
};

export default UseContactInfoForm;
