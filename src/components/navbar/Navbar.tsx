import { useTranslation } from "react-i18next";
import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "components/navbar/NavbarStyles";
import logo from "components/navbar/imgs/logo.svg";
import useViewport from "hooks/useViewport";
import NavBarButton from "components/UI/navBarButton/NavBarButton";
import MenuDrawer from "components/UI/navBarDrawer/MenuDrawer";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  SEARCH_WORK_ROUTE,
  HOME_PAGE_ROUTE,
  PROPOSALS_ROUTE,
  MY_JOBS_ROUTE,
  SETTINGS_ROUTE,
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  CLIENT_HOME,
  MY_CONTRACTS_ROUTE,
  SETTINGS_CONTACT_INFO_ROUTE,
  CLIENT_PROFILE,
  CHAT_ROUTE,
} from "utils/routeConsts";
import useAuth from "hooks/useAuth";
import { MOBILE_SCREEN_SIZE } from "utils/navBarConsts";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

interface LinkType {
  title: string;
  to: string;
}
interface NavLinkType {
  title: string;
  links: LinkType[];
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
          title: t("MyJobs.jobs"),
          links: [
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
          ],
        },
        {
          title: t("Profile.title"),
          links: [
            {
              to: SETTINGS_CONTACT_INFO_ROUTE,
              title: t("Profile.title"),
            },
            {
              to: SETTINGS_ROUTE,
              title: t("Settings.title"),
            },
          ],
        },
      ]);
    }
    if (role === "client") {
      setNavLinks([
        {
          title: t("MyJobs.jobs"),
          links: [
            {
              to: MY_JOBS_ROUTE,
              title: "Jobs",
            },
            {
              to: CLIENT_HOME,
              title: "Talent",
            },
          ],
        },
        {
          title: t("Profile.title"),
          links: [
            {
              to: CLIENT_PROFILE,
              title: t("Profile.title"),
            },
          ],
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
      <Menu
        defaultSelectedKeys={["jobs"]}
        mode="horizontal"
        style={{ width: "100%" }}
      >
        {navLinks.map(({ links, title }) => (
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
