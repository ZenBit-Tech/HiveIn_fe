import React from "react";
import { Button, Modal, Typography } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import Field from "components/DefaultField/DefaultField";
import { SIGN_IN_ROUTE } from "utils/routeConsts";
import { useTranslation } from "react-i18next";
import { useRestorePasswordMutation } from "services/auth/forgotPassword";
import S from "./style";
import RestorePasswordSchema from "./schema";

interface RestorePasswordForm extends FieldValues {
  password: string;
  passwordConfirm: string;
}

export default function RestorePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const { t } = useTranslation();

  const [restorePassword] = useRestorePasswordMutation();

  const { Title } = Typography;
  const { control, handleSubmit } = useForm<RestorePasswordForm>({
    resolver: yupResolver(RestorePasswordSchema),
  });

  async function onSubmit({ password }: RestorePasswordForm) {
    if (token) {
      await restorePassword({ token, password });
    }

    Modal.success({
      title: t("RestorePassword.successfullyTitle"),
      content: t("RestorePassword.successfullyText"),
      centered: true,
    });
    navigate(SIGN_IN_ROUTE);
  }

  return (
    <S.Container>
      <S.FormBox>
        <S.TextsBox>
          <Title italic>{t("RestorePassword.title")}</Title>

          <Title level={2} style={{ fontSize: "20px" }}>
            {t("RestorePassword.subtitle")}
          </Title>
        </S.TextsBox>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Field
            label={t("RestorePassword.newPassword")}
            control={control}
            type="password"
            name="password"
          />
          <Field
            label={t("RestorePassword.confirmNewPassword")}
            control={control}
            type="password"
            name="passwordConfirm"
          />
          <Button
            style={{ width: "50%", height: "50px", fontSize: "18px" }}
            type="primary"
            htmlType="submit"
          >
            {t("RestorePassword.signIn")}
          </Button>
        </S.Form>
      </S.FormBox>
    </S.Container>
  );
}
