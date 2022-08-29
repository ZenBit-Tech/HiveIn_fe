import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "components/DiscoverFilterForm/schema";
import { useTranslation } from "react-i18next";
import propsDataCollection from "./staticData";
import Form, { CustomButton } from "./styles";

function DiscoverFilterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const changeIsFiltersOpen = () => setIsFiltersOpen(!isFiltersOpen);

  const onSubmit = () => {
    changeIsFiltersOpen();
  };

  const { t } = useTranslation();

  return (
    <>
      {isFiltersOpen && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {propsDataCollection.map((propsData) => (
            <LayoutElementWithTitle
              errors={errors}
              key={propsData.title}
              control={control}
              {...propsData}
            />
          ))}
          <CustomButton block type="primary" htmlType="submit">
            {t("Talent.Discover.search")}
          </CustomButton>
        </Form>
      )}
      <CustomButton block type="ghost" onClick={changeIsFiltersOpen}>
        {isFiltersOpen
          ? t("Talent.Discover.hideFilters")
          : t("Talent.Discover.showFilters")}
      </CustomButton>
    </>
  );
}

export default DiscoverFilterForm;
