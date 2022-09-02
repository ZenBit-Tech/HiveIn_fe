import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import schema from "components/DiscoverFilterForm/schema";
import { useTranslation } from "react-i18next";
import { useGetProfileQuery } from "services/profileInfo/profileInfoAPI";
import useJwtDecoder from "hooks/useJwtDecoder";
import { IFreelancer } from "services/profileInfo/typesDef";
import propsDataCollection from "./staticData";
import S from "./styles";

function DiscoverFilterForm() {
  const { sub } = useJwtDecoder();
  const { data, isSuccess } = useGetProfileQuery(Number(sub!));
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
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: initialState,
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
    </>
  );
}

export default DiscoverFilterForm;
