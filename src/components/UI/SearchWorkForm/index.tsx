import { FieldValues, useForm } from "react-hook-form";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import { useTranslation } from "react-i18next";
import { IFreelancer } from "services/profileInfo/typesDef";
import S from "components/UI/SearchWorkForm/styles";
import propsDataCollection from "components/UI/SearchWorkForm/staticData";
import { Typography } from "antd";
import { ISearchWorkFilters } from "components/UI/SearchWorkForm/typesDef";
import { DurationTypeEnum } from "utils/enums";
import { useState } from "react";
import { DEBOUNCE_DELAY } from "utils/consts/timeConsts";

interface ISearchWorkFormProps {
  filters: ISearchWorkFilters;
  setFilters: (filters: ISearchWorkFilters) => void;
  setDefaultPage: () => void;
}

const defaultDurationType = DurationTypeEnum.WEEK;

const defaultFIlters = {
  category: undefined,
  rate: undefined,
  skills: [],
  duration: undefined,
  keyWord: "",
  durationType: defaultDurationType,
  englishLevel: undefined,
};

function SearchWorkForm({
  filters,
  setFilters,
  setDefaultPage,
}: ISearchWorkFormProps) {
  const { Title } = Typography;

  const [isReset, setIsReset] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: filters,
  });
  const onSubmit = (filtersForm: FieldValues) => {
    setFilters({
      ...filtersForm,
      skills: filtersForm.skills.map((skill: number) => {
        return { id: skill };
      }),
    });
    setDefaultPage();
  };

  const onClear = () => {
    setIsReset(true);
    setFilters(defaultFIlters);
    reset(defaultFIlters);
    setTimeout(() => {
      setIsReset(false);
    }, DEBOUNCE_DELAY);
  };

  const { t } = useTranslation();

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Title level={3}>{t("SearchWork.filters")}</Title>

      {propsDataCollection.map((propsData) => (
        <LayoutElementWithTitle
          freelancerInfo={
            { skills: filters.skills || [] } as unknown as IFreelancer
          }
          setValue={setValue}
          errors={errors}
          isSubmitSuccess={isReset}
          key={propsData.title}
          control={control}
          {...propsData}
        />
      ))}
      <S.CustomButton block type="primary" htmlType="submit">
        {t("SearchWork.search")}
      </S.CustomButton>
      <S.CustomButton block type="ghost" onClick={onClear}>
        {t("SearchWork.clear")}
      </S.CustomButton>
    </S.Form>
  );
}

export default SearchWorkForm;
