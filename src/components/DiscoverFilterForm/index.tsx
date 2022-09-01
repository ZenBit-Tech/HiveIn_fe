import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "components/DiscoverFilterForm/schema";
import { useTranslation } from "react-i18next";
import propsDataCollection from "./staticData";
import S from "./styles";

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
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {propsDataCollection.map((propsData) => (
            <LayoutElementWithTitle
              errors={errors}
              key={propsData.title}
              control={control}
              {...propsData}
            />
          ))}
          <S.CustomButton block type="primary" htmlType="submit">
            {t("Talent.search")}
          </S.CustomButton>
        </S.Form>
      )}
      <S.CustomButton block type="ghost" onClick={changeIsFiltersOpen}>
        {isFiltersOpen ? t("Talent.hideFilters") : t("Talent.showFilters")}
      </S.CustomButton>
    </>
  );
}

export default DiscoverFilterForm;
