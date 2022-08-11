import { useTranslation } from "react-i18next";
import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles from "components/navbar/style";
import {
  DASHBOARD_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  REDUX_TEST_PAGE_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/consts";

function Navbar() {
  const { t } = useTranslation();

  return (
    <NavbarStyles>
      <NavLink path={HOME_PAGE_ROUTE}>{t("Home.title")}</NavLink>
      <NavLink path={DASHBOARD_PAGE_ROUTE}>{t("Dashboard.title")}</NavLink>
      <NavLink path={REDUX_TEST_PAGE_ROUTE}>{t("Redux.title")}</NavLink>
      <NavLink path={SIGN_UP_ROUTE}>{t("SignUp.title")}</NavLink>
    </NavbarStyles>
  );
}

export default Navbar;
