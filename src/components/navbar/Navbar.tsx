import { useTranslation } from "react-i18next";

import { SettingFilled, UserOutlined, MessageFilled } from "@ant-design/icons";
import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "components/navbar/NavbarStyles";
import logo from "components/navbar/imgs/logo.svg";
import useViewport from "hooks/useViewport";
import NavBarButton from "components/UI/navBarButton/NavBarButton";
import MenuDrawer from "components/UI/navBarDrawer/MenuDrawer";
import {
  SEARCH_WORK_ROUTE,
  HOME_PAGE_ROUTE,
  PROPOSALS_ROUTE,
  MY_CONTRACTS_ROUTE,
  CHAT_ROUTE,
  SETTINGS_ROUTE,
  PROFILE_ROUTE,
} from "utils/consts";

function Navbar() {
  const { t } = useTranslation();
  const { screenWidth } = useViewport();
  const mobileScreenSize = 768;

  return (
    <NavbarStyles>
      <NavLink path={HOME_PAGE_ROUTE}>
        <img height="50px" alt="logo" src={logo} />
        {/* {t("Home.title")} */}
      </NavLink>

      {screenWidth < mobileScreenSize ? (
        ""
      ) : (
        <>
          <NavLink path={SEARCH_WORK_ROUTE}>{t("SearchWork.title")}</NavLink>
          <NavLink path={PROPOSALS_ROUTE}>{t("Proposals.title")}</NavLink>
          <NavLink path={MY_CONTRACTS_ROUTE}>{t("MyContracts.title")}</NavLink>
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

        {screenWidth < mobileScreenSize ? <MenuDrawer /> : ""}
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
