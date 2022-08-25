import { useTranslation } from "react-i18next";

import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "components/navbar/NavbarStyles";
import logo from "components/navbar/imgs/logo.svg";
import useViewport from "hooks/useViewport";
import NavBarButton from "components/UI/navBarButton/NavBarButton";
import MenuDrawer from "components/UI/navBarDrawer/MenuDrawer";
import {
  SettingFilled,
  UserOutlined,
  MessageFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  SEARCH_WORK_ROUTE,
  HOME_PAGE_ROUTE,
  PROPOSALS_ROUTE,
  MY_CONTRACTS_ROUTE,
  CHAT_ROUTE,
  SETTINGS_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  DASHBOARD_ROUTE,
} from "utils/routeConsts";
import useAuth from "hooks/useAuth";
import { MOBILE_SCREEN_SIZE } from "utils/navBarConsts";

function Navbar() {
  const { authToken, signOut } = useAuth();
  const { t } = useTranslation();
  const { screenWidth } = useViewport();

  if (!authToken) {
    return (
      <NavbarStyles>
        <NavLink path={HOME_PAGE_ROUTE}>
          <img height="50px" alt="logo" src={logo} />
        </NavLink>
        <NavLink path={SIGN_UP_ROUTE}>{t("SignUp.title")}</NavLink>
        <NavLink path={SIGN_IN_ROUTE}>{t("SignIn.signIn")}</NavLink>
      </NavbarStyles>
    );
  }

  return (
    <NavbarStyles>
      <NavLink path={HOME_PAGE_ROUTE}>
        <img height="50px" alt="logo" src={logo} />
      </NavLink>

      {screenWidth < MOBILE_SCREEN_SIZE ? (
        ""
      ) : (
        <>
          <NavLink path={SEARCH_WORK_ROUTE}>{t("SearchWork.title")}</NavLink>
          <NavLink path={PROPOSALS_ROUTE}>{t("Proposals.title")}</NavLink>
          <NavLink path={MY_CONTRACTS_ROUTE}>{t("MyContracts.title")}</NavLink>
          <NavLink path={DASHBOARD_ROUTE}>{t("Dashboard.title")}</NavLink>
        </>
      )}

      <NavBarButtons>
        <NavLink path={CHAT_ROUTE}>
          <NavBarButton icon={<MessageFilled />} title={t("Chat.title")} />
        </NavLink>
        <NavLink path={SETTINGS_ROUTE}>
          <NavBarButton icon={<SettingFilled />} title={t("Settings.title")} />
        </NavLink>
        <NavLink path={PROFILE_ROUTE}>
          <NavBarButton icon={<UserOutlined />} title={t("Profile.title")} />
        </NavLink>
        <NavBarButton
          icon={<LogoutOutlined />}
          title={t("SignIn.signOut")}
          onClick={signOut}
        />

        {screenWidth < MOBILE_SCREEN_SIZE ? <MenuDrawer /> : ""}
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
