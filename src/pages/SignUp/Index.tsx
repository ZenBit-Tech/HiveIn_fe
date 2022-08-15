import React, { useEffect } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Field from "components/DefaultField/Index";
import { COMPLETE_REGISTRATION_ROUTE } from "utils/routeConsts";
import { useTranslation } from "react-i18next";
import api from "services/user/signUp";
import { toast } from "react-toastify";
import S from "./style";
import signUpSchema from "./schema";

interface SignUpForm extends FieldValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });
  const { useSignUpMutation } = api;
  const [signUp, { isError, isSuccess, isLoading }] = useSignUpMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("An error ocurred");
      return;
    }
    if (!isLoading && isSuccess) {
      toast.success("Successful Sign up");
      navigate(COMPLETE_REGISTRATION_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  async function onSubmit({ email, password }: SignUpForm) {
    await signUp({ email, password });
  }
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.FormBox>
        <Button type="primary" icon={<GoogleOutlined />}>
          {t("SignUp.signUpGoogle")}
        </Button>
        <div style={{ textAlign: "center" }}>
          <span>{t("SignUp.or")}</span>
          <br />
          <span>{t("SignUp.useEmail")}</span>
        </div>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Field label="Email" control={control} name="email" />
          <Field
            label="Create a password"
            type="password"
            control={control}
            name="password"
          />
          <Field
            label="Confirm password"
            control={control}
            name="passwordConfirm"
            type="password"
          />
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
          >
            {t("SignUp.register")}
          </Button>
        </S.Form>
      </S.FormBox>
    </S.Container>
  );
}
