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
  MY_JOBS_ROUTE,
  CHAT_ROUTE,
  SETTINGS_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  CLIENT_PROFILE,
  CLIENT_HOME,
  MY_CONTRACTS_ROUTE,
} from "utils/routeConsts";
import useAuth from "hooks/useAuth";
import { MOBILE_SCREEN_SIZE } from "utils/navBarConsts";
import { useEffect, useState } from "react";

interface NavLinkType {
  title: string;
  to: string;
}

function Navbar() {
  const { authToken, signOut, role } = useAuth();
  const [navLinks, setNavLinks] = useState<NavLinkType[]>([]);
  const { t } = useTranslation();
  const { screenWidth } = useViewport();

  useEffect(() => {
    if (role === "freelancer") {
      setNavLinks([
        {
          to: SEARCH_WORK_ROUTE,
          title: t("SearchWork.title"),
        },
        {
          to: PROPOSALS_ROUTE,
          title: t("Proposals.title"),
        },
        {
          title: t("MyJobs.title"),
          to: MY_JOBS_ROUTE,
        },
        {
          to: MY_CONTRACTS_ROUTE,
          title: t("MyContracts.title"),
        },
      ]);
    }
    if (role === "client") {
      setNavLinks([
        {
          to: CLIENT_HOME,
          title: "Jobs",
        },
        {
          to: CLIENT_HOME,
          title: "Talent",
        },
      ]);
    }
    // eslint-disable-next-line
  }, [role, authToken]);

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
      <NavLink path={role === "freelancer" ? HOME_PAGE_ROUTE : CLIENT_HOME}>
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
