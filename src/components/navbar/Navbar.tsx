import { useTranslation } from "react-i18next";
import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "components/navbar/NavbarStyles";
import logo from "components/navbar/imgs/logo.svg";
import useViewport from "hooks/useViewport";
import NavBarButton from "components/UI/navBarButton/NavBarButton";
import MenuDrawer from "components/UI/navBarDrawer/MenuDrawer";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { SIGN_UP_ROUTE, SIGN_IN_ROUTE, CHAT_ROUTE } from "utils/routeConsts";
import useAuth from "hooks/useAuth";
import { MOBILE_SCREEN_SIZE } from "utils/navBarConsts";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import navLinksPerRole, { NavLinkOptions } from "./NavLinksPerRole";

function Navbar() {
  const { authToken, signOut, role } = useAuth();
  const [navItens, setNavItens] = useState<NavLinkOptions | null>();
  const { t } = useTranslation();
  const { screenWidth } = useViewport();

  useEffect(() => {
    if (role) setNavItens(navLinksPerRole[role]);
    else {
      setNavItens(null);
    }
    // eslint-disable-next-line
  }, [role, authToken]);

  if (!authToken) {
    return (
      <NavbarStyles>
        <NavLink path={SIGN_UP_ROUTE}>
          <img height="50px" alt="logo" src={logo} />
        </NavLink>
        <NavLink path={SIGN_UP_ROUTE}>{t("SignUp.title")}</NavLink>
        <NavLink path={SIGN_IN_ROUTE}>{t("SignIn.signIn")}</NavLink>
      </NavbarStyles>
    );
  }

  return (
    <NavbarStyles>
      <NavLink path={navItens?.home ?? ""}>
        <img height="50px" alt="logo" src={logo} />
      </NavLink>
      <Menu
        defaultSelectedKeys={["jobs"]}
        mode="horizontal"
        style={{ width: "100%" }}
      >
        {navItens?.options.map(({ links, title }) => (
          <Menu.SubMenu
            icon={title === t("Profile.title") ? <UserOutlined /> : undefined}
            key={title}
            title={title}
          >
            {links.map((link) => (
              <Menu.Item key={link.to}>
                <Link to={link.to}>{link.title}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
        <Menu.Item key={t("Chat.title")}>
          <Link to={CHAT_ROUTE}>{t("Chat.title")}</Link>
        </Menu.Item>
      </Menu>
      <NavBarButtons>
        {screenWidth < MOBILE_SCREEN_SIZE ? (
          <MenuDrawer
            drawerLinks={navItens?.options.map(({ links }) => links)[0] ?? []}
          />
        ) : (
          <NavBarButton
            icon={<LogoutOutlined />}
            title={t("SignIn.signOut")}
            onClick={signOut}
          />
        )}
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
