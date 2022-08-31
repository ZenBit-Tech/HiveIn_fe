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
  CHAT_ROUTE,
  SETTINGS_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  CLIENT_PROFILE,
  CLIENT_HOME,
} from "utils/routeConsts";
import useAuth from "hooks/useAuth";
import { MOBILE_SCREEN_SIZE } from "utils/navBarConsts";
import { useEffect, useState } from "react";
import navLinksPerRole, { NavRoleOptions } from "components/navbar/NavLinks";

function Navbar() {
  const { authToken, signOut, role } = useAuth();
  const [navLinks, setNavLinks] = useState<NavRoleOptions[]>([]);
  const { t } = useTranslation();
  const { screenWidth } = useViewport();

  useEffect(() => {
    if (role) setNavLinks(navLinksPerRole[role]);
  }, [role]);

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
      <NavLink path={role === "freelancer" ? SEARCH_WORK_ROUTE : CLIENT_HOME}>
        <img height="50px" alt="logo" src={logo} />
      </NavLink>

      {screenWidth < MOBILE_SCREEN_SIZE ? (
        ""
      ) : (
        <>
          {navLinks.map(({ title, to }) => (
            <NavLink key={to} path={to}>
              {title}
            </NavLink>
          ))}
        </>
      )}

      <NavBarButtons>
        <NavLink path={CHAT_ROUTE}>
          <NavBarButton icon={<MessageFilled />} title={t("Chat.title")} />
        </NavLink>
        {role === "freelancer" ? (
          <>
            <NavLink path={SETTINGS_ROUTE}>
              <NavBarButton
                icon={<SettingFilled />}
                title={t("Settings.title")}
              />
            </NavLink>
            <NavLink path={PROFILE_ROUTE}>
              <NavBarButton
                icon={<UserOutlined />}
                title={t("Profile.title")}
              />
            </NavLink>
          </>
        ) : (
          <NavLink path={CLIENT_PROFILE}>
            <NavBarButton icon={<UserOutlined />} title={t("Profile.title")} />
          </NavLink>
        )}

        {screenWidth < MOBILE_SCREEN_SIZE ? (
          <MenuDrawer drawerLinks={navLinks} />
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
