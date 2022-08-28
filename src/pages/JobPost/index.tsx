import JobPostLayoutForm from "components/jobPostLayoutForm";
import React from "react";
import { useTranslation } from "react-i18next";
import S from "./style";

function JobPost() {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.Title>{t("JobPost.title")}</S.Title>
      <JobPostLayoutForm />
    </S.Container>
  );
}

export default JobPost;
