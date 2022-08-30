import React from "react";
import { Button } from "antd";
import TextField from "components/UI/textField/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import S from "./style";
import resolver from "./schema";

export default function ClientProfile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resolver),
  });
  const { t } = useTranslation();

  function onSubmit(evt: any) {
    return evt;
  }
  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "50%" }}>
          <S.InputBox>
            <TextField
              errors={errors}
              formFieldName="name"
              type="text"
              width="full"
              helperText="Name*"
              control={control}
            />
          </S.InputBox>
          <S.InputBox>
            <TextField
              errors={errors}
              formFieldName="description"
              multiline
              type="text"
              width="full"
              helperText="Description of your company"
              rows={5}
              control={control}
            />
          </S.InputBox>
          <Button htmlType="submit" shape="round" size="large" type="primary">
            {t("Dashboard.buttons.save")}
          </Button>
        </div>
      </S.Form>
    </S.Container>
  );
}
