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
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "services/profileInfo/profileInfoAPI";
import useJwtDecoder from "hooks/useJwtDecoder";
import { IEducation, IExperience } from "services/profileInfo/typesDef";

function ProfileEditForm() {
  const { sub } = useJwtDecoder();
  const { data, isSuccess, isError } = useGetProfileQuery(Number(sub!));

  const [updateProfile, { isSuccess: submitSuccess, isError: submitError }] =
    useUpdateProfileMutation();

  const [initialState, setInitialState] = useState<typeof data | any>();

  useEffect(() => {
    if (isSuccess && data) {
      setInitialState({
        ...data,
        skills: data.skills.map(({ id }) => id),
        category: data.categoryId,
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
    if (submitSuccess) toast.success(i18next.profileSuccessSubmitMessage);
    if (submitError || isError)
      toast.error(i18next.profileFormErrorMessages.defaultError);
    if (data === null)
      toast.error(i18next.profileFormErrorMessages.userNotFound);
  }, [submitSuccess, submitError, data, isError]);

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

  const onSubmit = (formData: any) => {
    const objectToQuery = {
      categoryId: Number(formData.category),
      englishLevel: formData.englishLevel,
      position: formData.position,
      rate: formData.rate,
      userId: formData.userId,
      id: formData.id,
      description: formData.description,
      skillsIds: formData.skills,
      educations: parseData(formData.education, data?.education!),
      experiences: parseData(formData.experience, data?.experience!),
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
