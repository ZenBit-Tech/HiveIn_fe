import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import i18next from "localization/en/en.json";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import propsDataCollection from "components/contactInfoForm/staticData";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import contactEditFormValidationSchema from "validation/contactEditFormValidationSchema";
import { IContactInfoState } from "components/contactInfoForm/typesDef";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "services/contactInfo/contactInfoAPI";
import { RootState } from "store/store";

function ContactInfoForm() {
  const [initialState, setInitialState] = useState<IContactInfoState>();

  const userId = useSelector<RootState>(({ user }) => user.id);
  const {
    data,
    isSuccess,
    isError: getUserError,
  } = useGetUserQuery(Number(userId));
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
        phone: data.phone === null ? null : data.phone.slice(1),
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
    if (submitSuccess) toast.success("changes saved");
    //  @ts-ignore
    if (submitError) toast.error(error.data.message[0]);
    if (getUserError)
      toast.error(i18next.contactInfoForm.errorMessages.userNotFound);
    // eslint-disable-next-line
  }, [submitSuccess, submitError, getUserError]);

  const onSubmit = (formData: any) => {
    const phone = !formData.phone ? null : `+${formData.phone}`;

    if (isSuccess)
      updateUser({
        ...formData,
        phone,
        id: data.id,
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
