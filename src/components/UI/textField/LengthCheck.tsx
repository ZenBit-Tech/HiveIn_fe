import { useTranslation } from "react-i18next";
import { ILengthCheckProps } from "./typesDef";

function LengthCheck(props: ILengthCheckProps) {
  const { characters, maxLength } = props;
  const { t } = useTranslation();
  return <p>{`${characters}/${maxLength} ${t("UI.description.length")}`}</p>;
}

export default LengthCheck;
