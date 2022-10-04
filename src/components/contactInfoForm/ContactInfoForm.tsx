import React, { useEffect, useState } from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import i18next from "localization/en/en.json";
import { toast } from "react-toastify";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import propsDataCollection from "components/contactInfoForm/staticData";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import contactEditFormValidationSchema from "validation/contactEditFormValidationSchema";
import {
  useGetOwnUserQuery,
  useUpdateUserMutation,
} from "services/user/setUserAPI";
import { ConfidentialSettings } from "utils/enums";
import createConfidentialInfo from "utils/functions/createConfidentialInfo";

interface IUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isVisibleEmail: boolean;
  isVisiblePhone: boolean;
}

function ContactInfoForm() {
  const [initialState, setInitialState] = useState<IUser>();

  const { data, isSuccess, isError: getUserError } = useGetOwnUserQuery();
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
  } = useForm<IUser>({
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

  const onSubmit = (formData: IUser) => {
    const phone = !formData.phone ? undefined : `+${formData.phone}`;
    const { isVisibleEmail, isVisiblePhone, ...restData } = formData;
    const confidentialSetting = createConfidentialInfo(
      isVisiblePhone,
      isVisibleEmail
    );

    if (isSuccess)
      updateUser({
        ...data,
        ...restData,
        phone,
        confidentialSetting,
      });

    return null;
  };

  return (
    <>
      <h2>{i18next.contactInfoForm.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {propsDataCollection.map((propsData) => (
          <LayoutElementWithTitle
            key={propsData.title}
            control={control as unknown as Control}
            errors={errors as unknown as FieldErrors}
            {...propsData}
          />
        ))}
        {isSuccess && (
          <SButtonWrapper>
            <FormSubmitButton text={i18next.contactInfoForm.submitButtonText} />
          </SButtonWrapper>
        )}
      </form>
    </>
  );
}

export default ContactInfoForm;
