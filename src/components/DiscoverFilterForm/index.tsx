import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "components/DiscoverFilterForm/schema";
import { useTranslation } from "react-i18next";
import { IFreelancer } from "services/profileInfo/typesDef";
import { Skeleton } from "antd";
import TalentPart from "components/TalentPart/TalentPart";
import {
  IFilters,
  useFilterQuery,
  useGetAllFreelancerQuery,
} from "services/jobOwner/talentAPI";
import S from "components/DiscoverFilterForm/styles";
import propsDataCollection from "components/DiscoverFilterForm/staticData";
import { ONESECOND } from "utils/consts/timeConsts";

function DiscoverFilterForm() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<IFilters | any>({});
  const [isAllFreelancer, setIsAllFreelancer] = useState(true);

  const {
    data: filteredFreelancers,
    isSuccess,
    isLoading,
    isFetching,
  } = useFilterQuery({ ...filters });

  const {
    data: allFreelancers,
    isSuccess: isAllFreelancerSuccess,
    isLoading: isAllFreelancerLoading,
  } = useGetAllFreelancerQuery();

  useEffect(() => {
    if (filteredFreelancers) setIsAllFreelancer(false);
  }, [filteredFreelancers]);

  const changeIsFiltersOpen = () => setIsFiltersOpen(!isFiltersOpen);
  const onSubmit = (filtersForm: FieldValues) => {
    setFilters(filtersForm);
    setTimeout(changeIsFiltersOpen, ONESECOND);
  };

  const { t } = useTranslation();

  return (
    <S.Div>
      {isFiltersOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      )}
      <S.CustomButton block type="ghost" onClick={changeIsFiltersOpen}>
        {isFiltersOpen ? t("Talent.hideFilters") : t("Talent.showFilters")}
      </S.CustomButton>
      {!isAllFreelancer &&
        (isLoading || isFetching ? (
          <Skeleton active />
        ) : (
          isSuccess &&
          filteredFreelancers && (
            <TalentPart
              freelancers={filteredFreelancers!}
              title={t("Talent.filterResults")}
              isSuccess={isSuccess}
              isLoading={isLoading}
            />
          )
        ))}
      {isAllFreelancer &&
        (isAllFreelancerLoading ? (
          <Skeleton active />
        ) : (
          isAllFreelancerSuccess &&
          allFreelancers && (
            <TalentPart
              freelancers={allFreelancers!}
              title={t("Talent.allFreelancers")}
              isSuccess={isAllFreelancerSuccess}
              isLoading={isAllFreelancerLoading}
            />
          )
        ))}
    </S.Div>
  );
}

export default DiscoverFilterForm;
