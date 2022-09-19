import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "components/navbar/NavbarStyles";
import logo from "components/navbar/imgs/logo.svg";
import { BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  CLIENT_PROFILE,
} from "utils/consts/routeConsts";
import useAuth from "hooks/useAuth";
import { Badge, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  useGetNotificationsQuery,
  getSocket,
} from "services/notifications/setNotificationsAPI";
import NavBarButton from "components/UI/buttons/navBarButton/NavBarButton";
import navLinksPerRole, {
  NavLinkOptions,
} from "components/navbar/NavLinksPerRole";
import { CLIENT_ROLE } from "utils/consts/navBarConsts";

function Navbar() {
  const { authToken, signOut, role } = useAuth();
  const { data, isError, isLoading } = useGetNotificationsQuery();
  const { t } = useTranslation();

  const [navItens, setNavItens] = useState<NavLinkOptions | null>();
  const [countNotifications, setCountNotifications] = useState<number>(0);

  const socket = getSocket();
  socket.on("first-message", () => {
    setCountNotifications(countNotifications + 1);
  });

  useEffect(() => {
    if (!isError && !isLoading && role) {
      const count = data?.filter((item) => !item.read).length;
      setCountNotifications(count || 0);
    }
  }, [data, isError, isLoading, role]);

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

  function verifyMenuItemIcon(itemTitle: string) {
    switch (itemTitle) {
      case t("Profile.title"):
        return <UserOutlined />;
      case t("Chat.title"):
        return (
          <Badge size="small" count={countNotifications}>
            <BellOutlined />
          </Badge>
        );
      default:
        return undefined;
    }
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
        {role === CLIENT_ROLE ? (
          <Menu.Item key={t("Profile.title")}>
            <Link to={CLIENT_PROFILE}>{t("Profile.title")}</Link>
          </Menu.Item>
        ) : null}
        {navItens?.options.map(({ links, title }) => (
          <Menu.SubMenu
            icon={verifyMenuItemIcon(title)}
            key={title}
            title={title === t("Chat.title") ? "" : title}
          >
            {links.map((link) => (
              <Menu.Item key={link.to}>
                <Link to={link.to}>{link.title}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
      <NavBarButtons>
        <NavBarButton
          icon={<LogoutOutlined />}
          title={t("SignIn.signOut")}
          onClick={signOut}
        />
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
