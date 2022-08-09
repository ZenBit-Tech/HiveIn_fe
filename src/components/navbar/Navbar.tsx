import { useTranslation } from "react-i18next";
import NavLink from "../UI/navlink/NavLink";
import NavbarStyles from "./style";
import {
  DASHBOARD_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  REDUX_TEST_PAGE_ROUTE,
} from "../../utils/consts";

function Navbar() {
  const { t } = useTranslation();

  return (
    <NavbarStyles>
      <NavLink path={HOME_PAGE_ROUTE}>{t("Home.title")}</NavLink>
      <NavLink path={DASHBOARD_PAGE_ROUTE}>{t("Dashboard.title")}</NavLink>
      <NavLink path={REDUX_TEST_PAGE_ROUTE}>{t("Redux.title")}</NavLink>
    </NavbarStyles>
  );
}

export default Navbar;
