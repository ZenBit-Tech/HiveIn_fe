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
import S from "components/DiscoverFilterForm/styles";
import propsDataCollection from "components/DiscoverFilterForm/staticData";

interface IDiscoverFilterFormProps {
  setUserId: (id: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

function DiscoverFilterForm({
  setUserId,
  setIsModalOpen,
}: IDiscoverFilterFormProps) {
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

  const {
    data: filteredFreelancers,
    isSuccess,
    isLoading,
  } = useFilterQuery({ ...filters });

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
      {isLoading && <Skeleton active />}
      {isSuccess && filteredFreelancers && (
        <TalentPart
          setIsModalOpen={setIsModalOpen}
          setUserId={setUserId}
          freelancers={filteredFreelancers!}
          title=""
          isSuccess={isSuccess}
          isLoading={isLoading}
        />
      )}
      <Divider />
    </>
  );
}

export default DiscoverFilterForm;
