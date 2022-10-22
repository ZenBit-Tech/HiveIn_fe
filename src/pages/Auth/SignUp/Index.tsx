import React, { useEffect } from "react";
import { Button, Modal, Typography } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Field from "components/DefaultField/DefaultField";
import { COMPLETE_REGISTRATION_ROUTE } from "utils/consts/routeConsts";
import GoogleAuthButton from "components/UI/buttons/googleAuthButton/GoogleAuthButton";
import { useSignUpMutation } from "services/auth/setAuthAPI";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";
import S from "pages/Auth/SignUp/style";
import signUpSchema from "pages/Auth/SignUp/schema";
import { InputContainer, TextsBox } from "pages/Auth/SignIn/style";

const { Title } = Typography;

interface SignUpForm extends FieldValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });
  const [signUp, { isError, isSuccess, isLoading, data, error }] =
    useSignUpMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      if ("status" in error!) {
        toast.error(t(`ServerErrors.${error.status}`));
        return;
      }
    }
    if (!isLoading && isSuccess) {
      Modal.success({
        title: t("SignUp.successfulSignUp"),
        onOk: () => {
          navigate(COMPLETE_REGISTRATION_ROUTE);
          signIn(data!);
        },
        centered: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  async function onSubmit({ email, password }: SignUpForm) {
    await signUp({ email, password });
  }

  return (
    <S.Container>
      <S.FormBox>
        <TextsBox>
          <Title italic>{t("SignIn.title")}</Title>
          <Title style={{ fontWeight: "400" }} level={2}>
            {t("SignIn.subtitle")}
          </Title>
        </TextsBox>
        <GoogleAuthButton>{t("SignUp.signUpGoogle")}</GoogleAuthButton>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
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
          </InputContainer>
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("SignUp.register")}
          </Button>
        </S.Form>
      </S.FormBox>
    </S.Container>
  );
}
