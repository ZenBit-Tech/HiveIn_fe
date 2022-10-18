import React from "react";
import { FieldValues } from "react-hook-form";
import i18next from "localization/en/en.json";
import propsDataCollection from "components/profileEditForm/staticData";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import { TFreelancerForProfileForm } from "components/profileEditForm/typesDef";
import parseData from "utils/functions/parseDataProfileForm";
import useProfileEditForm from "hooks/useProfileEditForm";

function ProfileEditForm() {
  const {
    data,
    updateProfile,
    isSuccess,
    handleSubmit,
    control,
    setValue,
    errors,
  } = useProfileEditForm();

  const onSubmit = (formData: TFreelancerForProfileForm | FieldValues) => {
    const objectToQuery = {
      categoryId: Number(formData.category),
      englishLevel: formData.englishLevel,
      position: formData.position,
      rate: formData.rate,
      userId: formData.userId,
      id: data?.id,
      skillsIds: formData.skills,
      educations: parseData(formData.education, data?.education!),
      experiences: parseData(formData.experience, data?.experience!),
      user: {
        ...data?.user,
        description: formData.description,
      },
    };
    updateProfile(objectToQuery);
  };
  return (
    <>
      <h2>{i18next.ProfileEditForm.formTitle}</h2>
      {isSuccess && !!data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {propsDataCollection.map((propsData) => (
            <LayoutElementWithTitle
              freelancerInfo={data}
              errors={errors}
              key={propsData.title}
              control={control}
              setValue={setValue}
              {...propsData}
            />
          ))}
          <SButtonWrapper>
            <FormSubmitButton
              text={i18next.profileEditFormButtonsNames.submit}
            />
          </SButtonWrapper>
        </form>
      )}
    </>
  );
}

export default ProfileEditForm;
