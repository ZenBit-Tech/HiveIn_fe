import React, { useEffect, useState } from "react";
import { Button, Typography, Modal } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Field from "components/DefaultField/DefaultField";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";
import { useSignInMutation } from "services/auth/setAuthAPI";
import GoogleAuthButton from "components/UI/buttons/googleAuthButton/GoogleAuthButton";
import {
  FORGOT_PASSWORD_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/consts/routeConsts";
import { PRIMARY } from "utils/consts/colorConsts";
import S from "pages/Auth/SignIn/style";
import signInSchema from "pages/Auth/SignIn/schema";

interface SignInForm extends FieldValues {
  email: string;
  password: string;
}

const { Title, Text } = Typography;

export default function SignIn() {
  const { signIn } = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { control, handleSubmit } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema),
  });

  const [runSignIn, { isError, isLoading, isSuccess, data, error }] =
    useSignInMutation();

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const errorMessage = (statusCode: string | number) => {
    Modal.error({
      title: t(`ServerErrors.${statusCode}`),
      centered: true,
      okButtonProps: { danger: true },
    });
  };

  useEffect(() => {
    if (!isLoading && isError) {
      if ("status" in error!) {
        errorMessage(error.status);
        return;
      }
    }
    if (!isLoading && isSuccess) {
      signIn(data!);
      navigate(PROFILE_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  async function onSubmit({ email, password }: SignInForm) {
    await runSignIn({ email, password });
  }

  return (
    <S.Container>
      <S.FormBox>
        <S.TextsBox>
          <Title italic>{t("SignIn.title")}</Title>
          <Title style={{ fontWeight: "400" }} level={2}>
            {t("SignIn.subtitle")}
          </Title>
        </S.TextsBox>
        <GoogleAuthButton>{t("SignIn.signInGoogle")}</GoogleAuthButton>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputContainer>
            <Field label={t("SignIn.email")} control={control} name="email" />
            <Field
              type="password"
              label={t("SignIn.password")}
              control={control}
              name="password"
            />
            <Text
              style={{ color: PRIMARY, cursor: "pointer" }}
              onClick={() => {
                navigate(FORGOT_PASSWORD_ROUTE);
              }}
            >
              {t("SignIn.forgotPass")}
            </Text>
          </S.InputContainer>
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("SignIn.signIn")}
          </Button>
          <Text
            onClick={() => {
              navigate(SIGN_UP_ROUTE);
            }}
            style={{ color: PRIMARY, fontSize: "16px", cursor: "pointer" }}
          >
            {t("SignIn.register")}
          </Text>
        </S.Form>
      </S.FormBox>
      <Modal
        visible={isErrorModalOpen}
        title="Succesful login"
        onOk={() => navigate("/test")}
        onCancel={handleCloseErrorModal}
        centered
        cancelButtonProps={{ style: { display: "none" } }}
      />
    </S.Container>
  );
}
