import React from "react";
import { Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import propsDataCollection from "components/profileEditForm/staticData";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "validation/profileEditFormValidationSchema";
import i18next from "localization/en/en.json";

function ProfileEditForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      position: "",
      category: "",
      rate: 0,
      skills: [],
      englishLevel: "",
      description: "",
      education: [],
      experience: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <>
      <h2>{i18next.ProfileEditForm.formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {propsDataCollection.map((propsData) => (
          <LayoutElementWithTitle
            errors={errors}
            key={propsData.title}
            control={control}
            {...propsData}
          />
        ))}
        <Button
          sx={{ marginLeft: "180px", width: "350px" }}
          type="submit"
          variant="contained"
        >
          {i18next.profileEditFormButtonsNames.submit}
        </Button>
      </form>
    </>
  );
}

export default ProfileEditForm;
