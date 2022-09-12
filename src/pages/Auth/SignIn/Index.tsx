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
import S from "./style";
import signInSchema from "./schema";

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

  const success = () => {
    Modal.success({
      title: t("SignIn.successLogin"),
      onOk: () => {
        navigate(PROFILE_ROUTE);
        signIn(data!);
      },
      centered: true,
    });
  };

  const errorMessage = (statusCode: string | number) => {
    Modal.error({
      title: t(`ServerErrors.${statusCode}`),
      centered: true,
      okButtonProps: { danger: true },
    });
  };

  const goToRegister = () => {
    window.scroll(0, 0);
    navigate(SIGN_UP_ROUTE);
  };

  const goToForgotPassword = () => {
    window.scroll(0, 0);
    navigate(FORGOT_PASSWORD_ROUTE);
  };

  useEffect(() => {
    if (!isLoading && isError) {
      if ("status" in error!) {
        errorMessage(error.status);
        return;
      }
    }
    if (!isLoading && isSuccess) {
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  async function onSubmit({ email, password }: SignInForm) {
    await runSignIn({ email, password });
  }

  return (
    <S.Container>
      <S.TextsBox>
        <Title italic>{t("SignIn.title")}</Title>
        <Title style={{ fontWeight: "400" }} level={2}>
          {t("SignIn.subtitle")}
        </Title>
      </S.TextsBox>
      <S.FormBox>
        <GoogleAuthButton>{t("SignIn.signInGoogle")}</GoogleAuthButton>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputContainer>
            <Field label="Email or username" control={control} name="email" />
            <Field
              type="password"
              label="Password"
              control={control}
              name="password"
            />
            <Text
              style={{ color: PRIMARY, cursor: "pointer" }}
              onClick={goToForgotPassword}
            >
              {t("SignIn.forgotPass")}
            </Text>
          </S.InputContainer>
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
          >
            {t("SignIn.signIn")}
          </Button>
        </S.Form>
      </S.FormBox>
      <S.Footer>
        <Text style={{ fontSize: "16px" }}>{t("SignIn.dontHaveAccount")}</Text>
        <Text
          onClick={goToRegister}
          style={{ color: PRIMARY, fontSize: "16px", cursor: "pointer" }}
        >
          {t("SignIn.register")}
        </Text>
      </S.Footer>
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
