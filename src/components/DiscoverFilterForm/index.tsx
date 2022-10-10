import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "components/DiscoverFilterForm/schema";
import { useTranslation } from "react-i18next";
import { IFreelancer } from "services/profileInfo/typesDef";
import { Skeleton } from "antd";
import TalentPart, { ITalentPartData } from "components/TalentPart/TalentPart";
import {
  IFilters,
  useFilterQuery,
  useGetAllFreelancerQuery,
} from "services/jobOwner/talentAPI";
import S from "components/DiscoverFilterForm/styles";
import propsDataCollection from "components/DiscoverFilterForm/staticData";
import { DEBOUNCE_DELAY } from "utils/consts/timeConsts";

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

  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters | any>({});
  const [isAllFreelancer, setIsAllFreelancer] = useState<boolean>(true);

  const filtersData = useFilterQuery({ ...filters });

  const {
    data: filteredFreelancers,
    isSuccess,
    isFetching,
    isLoading,
  } = filtersData;

  const allFreelancersData = useGetAllFreelancerQuery();

  const {
    data: allFreelancers,
    isSuccess: isAllFreelancerSuccess,
    isLoading: isAllFreelancerLoading,
  } = allFreelancersData;

  useEffect(() => {
    if (filtersData.data) setIsAllFreelancer(false);
  }, [filtersData.data]);

  const changeIsFiltersOpen = () => setIsFiltersOpen(!isFiltersOpen);
  const onSubmit = (filtersForm: FieldValues) => {
    setFilters(filtersForm);
    setTimeout(changeIsFiltersOpen, DEBOUNCE_DELAY);
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
              setIsModalOpen={setIsModalOpen}
              setUserId={setUserId}
              data={filtersData as unknown as ITalentPartData}
              title={t("Talent.filterResults")}
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
              setIsModalOpen={setIsModalOpen}
              setUserId={setUserId}
              data={allFreelancersData as unknown as ITalentPartData}
              title={t("Talent.allFreelancers")}
            />
          )
        ))}
    </S.Div>
  );
}

export default DiscoverFilterForm;
