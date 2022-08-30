import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import i18next from "localization/en/en.json";
import { toast } from "react-toastify";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import propsDataCollection from "components/contactInfoForm/staticData";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import contactEditFormValidationSchema from "validation/contactEditFormValidationSchema";
import {
  IUser,
  useGetUserQuery,
  useUpdateUserMutation,
} from "services/user/setUserAPI";
import useJwtDecoder from "hooks/useJwtDecoder";

function ContactInfoForm() {
  const [initialState, setInitialState] = useState<IUser>();

  const { sub } = useJwtDecoder();
  const { data, isSuccess, isError: getUserError } = useGetUserQuery(sub!);
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
      });
  }, [data, isSuccess]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
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

  const onSubmit = (formData: any) => {
    const phone = !formData.phone ? null : `+${formData.phone}`;

    if (isSuccess)
      updateUser({
        ...data,
        ...formData,
        id: sub,
        phone,
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
            control={control}
            errors={errors}
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
