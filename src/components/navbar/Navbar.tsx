import { useTranslation } from "react-i18next";
import { SettingFilled, UserOutlined, MessageFilled } from "@ant-design/icons";

import NavLink from "../UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "./NavbarStyles";
import logo from "./imgs/logo.svg";
import useViewport from "../../hooks/useViewport";
import NavBarButton from "../UI/navBarButton/NavBarButton";
import MenuDrawer from "../UI/navBarDrawer/MenuDrawer";

function Navbar() {
  const { t } = useTranslation();
  const { screenWidth } = useViewport();
  const mobileScreenSize = 768;

  return (
    <NavbarStyles>
      <NavLink path="/">
        <img height="50px" alt="logo" src={logo} />
        {/* {t("Home.title")} */}
      </NavLink>

      {screenWidth < mobileScreenSize ? (
        ""
      ) : (
        <>
          <NavLink path="/search-work">{t("SearchWork.title")}</NavLink>
          <NavLink path="/proposals">{t("Proposals.title")}</NavLink>
          <NavLink path="/my-contracts">{t("MyContracts.title")}</NavLink>
        </>
      )}

      <NavBarButtons>
        <NavLink path="/chat">
          <NavBarButton icon={<MessageFilled />} title={t("Chat.title")} />
        </NavLink>
        <NavLink path="/settings">
          <NavBarButton icon={<SettingFilled />} title={t("Settings.title")} />
        </NavLink>
        <NavLink path="/profile">
          <NavBarButton icon={<UserOutlined />} title={t("Profile.title")} />
        </NavLink>

        {screenWidth < mobileScreenSize ? <MenuDrawer /> : ""}
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
