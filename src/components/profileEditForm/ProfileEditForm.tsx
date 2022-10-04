import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import i18next from "localization/en/en.json";
import propsDataCollection from "components/profileEditForm/staticData";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "validation/profileEditFormValidationSchema";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import {
  useGetOwnProfileQuery,
  useUpdateProfileMutation,
} from "services/profileInfo/profileInfoAPI";

import { IEducation, IExperience } from "services/profileInfo/typesDef";
import { TFreelancerForProfileForm } from "components/profileEditForm/typesDef";

function ProfileEditForm() {
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

  type TArgs = IEducation[] | IExperience[];

  const parseData = (current: TArgs, queried: TArgs) => {
    const queriedId = queried.map(({ id }) => id);
    const currentId = current.map(({ id }) => id);

    const filteredId = queriedId.filter((id) => !currentId.includes(id));

    const shouldBeDeleted = filteredId.map((id) => ({
      id,
      active: false,
    }));

    return [...current, ...shouldBeDeleted];
  };

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
