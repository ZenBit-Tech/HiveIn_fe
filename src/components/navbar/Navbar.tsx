import { useTranslation } from "react-i18next";
import NavLink from "../UI/navlink/NavLink";
import NavbarStyles from "./style";

function Navbar() {
  const { t } = useTranslation();

  return (
    <NavbarStyles>
      <NavLink path="/">{t("Home.title")}</NavLink>
      <NavLink path="/dashboard">{t("Dashboard.title")}</NavLink>
      <NavLink path="/redux-test">{t("Redux.title")}</NavLink>
    </NavbarStyles>
  );
}

export default Navbar;
