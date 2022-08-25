import React from "react";
import { useTranslation } from "react-i18next";
import { SButton } from "./styles";

export interface ISeeMoreLessButton {
  cardCount: number;
  cardInRow: number;
  isShowAll: boolean;
  changeShowAll: () => void;
}

function SeeMoreLessButton({
  cardCount,
  cardInRow,
  isShowAll,
  changeShowAll,
}: ISeeMoreLessButton) {
  const isShow = cardCount > cardInRow;
  const { t } = useTranslation();
  return (
    <SButton type="link" onClick={changeShowAll} show={isShow}>
      {isShowAll ? t("Talent.Discover.seeLess") : t("Talent.Discover.seeAll")}
    </SButton>
  );
}

export default SeeMoreLessButton;
