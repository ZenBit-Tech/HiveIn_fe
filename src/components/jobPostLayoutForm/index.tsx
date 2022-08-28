import { yupResolver } from "@hookform/resolvers/yup";
import LayoutElementWithTitle from "components/layoutElementWithTitle/LayoutElementWithTitle";
import FormSubmitButton from "components/UI/buttons/formSubmitButton/FormSubmitButton";
import FileUpload from "components/UI/fileUpload";
import i18next from "localization/en/en.json";
import { FieldValues, useForm } from "react-hook-form";
import schema from "validation/jobPostFormValidation";
import S from "./style";
import propsDataCollection from "./staticData";

function JobPostLayoutForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      category: "IT",
      duration: 0,
      period: "weeks",
      rate: 0,
      skills: [],
      englishLevel: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {propsDataCollection.map((propsData) => (
        <LayoutElementWithTitle
          errors={errors}
          key={propsData.title}
          control={control}
          {...propsData}
        />
      ))}
      <FileUpload />
      <S.SaveBtn type="link">{i18next.JobPost.save}</S.SaveBtn>
      <FormSubmitButton text={i18next.JobPost.post} />
    </form>
  );
}

export default JobPostLayoutForm;
