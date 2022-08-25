import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "validation/profileEditFormValidationSchema";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import { SButtonWrapper } from "components/profileEditForm/styles";
import propsDataCollection from "./staticData";
import Form from "./styles";

function DiscoverFilterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      position: "",
      category: "",
      skills: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {};
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {propsDataCollection.map((propsData) => (
        <LayoutElementWithTitle
          errors={errors}
          key={propsData.title}
          control={control}
          {...propsData}
        />
      ))}
      <SButtonWrapper>
        <FormSubmitButton text="Search" />
      </SButtonWrapper>
    </Form>
  );
}

export default DiscoverFilterForm;
