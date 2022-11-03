import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import i18next from "localization/en/en.json";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import propsDataCollection from "components/contactInfoForm/staticData";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import PhotoUpload from "components/photoUpload/PhotoUpload";
import { SDiv, SH, SWrapper } from "components/layoutElementWithTitle/style";
import createConfidentialInfo from "utils/functions/createConfidentialInfo";
import useContactInfoForm, {
  IUserForContactInfo,
} from "hooks/useContactInfoForm";

function ContactInfoForm() {
  const {
    isSuccess,
    updateUser,
    data,
    handleSubmit,
    refetch,
    control,
    errors,
    t,
  } = useContactInfoForm();

  const onSubmit = (formData: IUserForContactInfo) => {
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
        <SWrapper>
          <SH>{t("profileUploadPhoto.title")} </SH>
          <SDiv width="full">
            <PhotoUpload avatarUrl={data?.avatar?.url} refetch={refetch} />
          </SDiv>
        </SWrapper>

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
