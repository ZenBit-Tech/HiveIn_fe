import { Button, Typography, Modal } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Field from "components/DefaultField/DefaultField";
import { SIGN_IN_ROUTE } from "utils/consts/routeConsts";
import { useTranslation } from "react-i18next";
import { PRIMARY } from "utils/consts/colorConsts";
import { useForgotPasswordMutation } from "services/auth/forgotPassword";
import S from "pages/Auth/ForgotPassword/style";
import ForgotPasswordSchema from "pages/Auth/ForgotPassword/schema";
import { useEffect } from "react";

interface ForgotPasswordForm extends FieldValues {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const { t } = useTranslation();
  const { Title, Text } = Typography;

  const [forgotPassword, { isSuccess, data }] = useForgotPasswordMutation();

  async function onSubmit({ email }: ForgotPasswordForm) {
    forgotPassword({ email });
  }

  useEffect(() => {
    if (isSuccess)
      Modal.success({
        title: t(
          data ? "ForgotPassword.checkMailBox" : "ForgotPassword.GoogleSignIn"
        ),
        centered: true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  const goToLogin = () => {
    window.scroll(0, 0);
    navigate(SIGN_IN_ROUTE);
  };

  return (
    <S.Container>
      <S.FormBox>
        <S.TextsBox>
          <Title italic>{t("ForgotPassword.title")}</Title>
          <Title level={2} style={{ fontSize: "20px" }}>
            {t("ForgotPassword.subtitle")}
          </Title>
        </S.TextsBox>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Field label="Email" control={control} name="email" />
          <S.TextsBox>
            <Text italic>{t("ForgotPassword.rememberPassword")}</Text>
            <Text
              style={{ color: PRIMARY, cursor: "pointer", marginLeft: "5px" }}
              onClick={goToLogin}
            >
              {t("ForgotPassword.signIn")}
            </Text>
          </S.TextsBox>
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
          >
            {t("ForgotPassword.resetPassword")}
          </Button>
        </S.Form>
      </S.FormBox>
    </S.Container>
  );
}
