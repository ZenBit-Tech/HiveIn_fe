import { Button } from "antd";
import { useTranslation } from "react-i18next";

export interface ISeeMoreLessButton {
  isShowAll: boolean;
  changeShowAll: () => void;
}

function SeeMoreLessButton({ isShowAll, changeShowAll }: ISeeMoreLessButton) {
  const { t } = useTranslation();
  return (
    <Button shape="round" size="large" type="primary" onClick={changeShowAll}>
      {isShowAll ? t("Talent.seeAll") : t("Talent.seeLess")}
    </Button>
  );
}

export default SeeMoreLessButton;
