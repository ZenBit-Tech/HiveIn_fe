import { FieldValues, useForm } from "react-hook-form";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import { useTranslation } from "react-i18next";
import { IFreelancer } from "services/profileInfo/typesDef";
import S from "components/UI/SearchWorkForm/styles";
import propsDataCollection from "components/UI/SearchWorkForm/staticData";
import { Typography } from "antd";
import { useState } from "react";
import { ISearchWorkFilters } from "./typesDef";

interface ISearchWorkFormProps {
  filters: ISearchWorkFilters;
  setFilters: (filters: ISearchWorkFilters) => void;
}

const defaultCategoryId = 1;
const defaultDurationType = "week";

function SearchWorkForm({ filters, setFilters }: ISearchWorkFormProps) {
  const { Title } = Typography;

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: filters,
  });

  const [skills, setSkills] = useState(filters.skills);
  const onSubmit = (filtersForm: FieldValues) => {
    setFilters(filtersForm);
  };

  const { t } = useTranslation();

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Title level={3}>Filters</Title>
      {propsDataCollection.map((propsData) => (
        <LayoutElementWithTitle
          freelancerInfo={{ skills } as unknown as IFreelancer}
          setValue={setValue}
          errors={errors}
          key={propsData.title}
          control={control}
          {...propsData}
        />
      ))}
      <S.CustomButton block type="primary" htmlType="submit">
        {t("SearchWork.search")}
      </S.CustomButton>
      <S.CustomButton
        block
        type="ghost"
        onClick={() => {
          reset({
            category: defaultCategoryId,
            rate: "",
            duration: "",
            durationType: defaultDurationType,
            englishLevel: undefined,
          });
          setSkills([]);
          setValue("skills", []);
        }}
      >
        {t("SearchWork.clear")}
      </S.CustomButton>
    </S.Form>
  );
}

export default SearchWorkForm;
