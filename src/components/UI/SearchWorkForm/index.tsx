/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "components/DiscoverFilterForm/schema";
import { useTranslation } from "react-i18next";
import { IFreelancer } from "services/profileInfo/typesDef";
import { Divider, Skeleton } from "antd";
import TalentPart from "components/TalentPart/TalentPart";
import { IFilters, useFilterQuery } from "services/jobOwner/talentAPI";
import S from "components/UI/SearchWorkForm/styles";
import propsDataCollection from "components/UI/SearchWorkForm/staticData";

function SearchWorkForm() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [filters, setFilters] = useState<IFilters | any>({});

  const changeIsFiltersOpen = () => setIsFiltersOpen(!isFiltersOpen);
  const onSubmit = (filtersForm: FieldValues) => {
    setFilters(filtersForm);
    changeIsFiltersOpen();
  };

  const { t } = useTranslation();

  return (
    <>
      {isFiltersOpen && (
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {propsDataCollection.map((propsData) => (
            <LayoutElementWithTitle
              freelancerInfo={{ skills: [] } as unknown as IFreelancer}
              setValue={setValue}
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
      <Divider />
    </>
  );
}

export default SearchWorkForm;
