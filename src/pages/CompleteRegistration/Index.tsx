import React from "react";
import { useTranslation } from "react-i18next";

export default function CompleteRegistration() {
  const { t } = useTranslation();
  return <h1>{t("CompleteRegistration.helloWorld")}</h1>;
}
