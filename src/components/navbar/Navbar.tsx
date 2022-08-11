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
        <NavBarButton icon={<MessageFilled />} title="Chat" />
        <NavBarButton icon={<SettingFilled />} title="Settings" />
        <NavBarButton icon={<UserOutlined />} title="Profile" />

        {screenWidth < mobileScreenSize ? <MenuDrawer /> : ""}
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
