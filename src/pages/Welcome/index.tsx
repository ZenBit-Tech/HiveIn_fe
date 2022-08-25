import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { PROFILE_ROUTE } from "utils/routeConsts";
import S from "./style";

function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { email } = useSelector((store: RootState) => store.user);
  return (
    <div style={{ textAlign: "center" }}>
      <S.Container>
        <S.Title>{t("Welcome.title")}</S.Title>, {email}
      </S.Container>
      <S.Link onClick={() => navigate(PROFILE_ROUTE)}>
        {t("Welcome.link")}
      </S.Link>
    </div>
  );
}

export default Welcome;
