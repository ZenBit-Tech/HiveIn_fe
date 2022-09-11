import { useTranslation } from "react-i18next";
import NavLink from "components/UI/navlink/NavLink";
import NavbarStyles, { NavBarButtons } from "components/navbar/NavbarStyles";
import logo from "components/navbar/imgs/logo.svg";
import useViewport from "hooks/useViewport";
import NavBarButton from "components/UI/buttons/navBarButton/NavBarButton";
import MenuDrawer from "components/UI/drawers/navBarDrawer/MenuDrawer";
import { MessageFilled, LogoutOutlined } from "@ant-design/icons";
import { CHAT_ROUTE, SIGN_UP_ROUTE, SIGN_IN_ROUTE } from "utils/routeConsts";
import useAuth from "hooks/useAuth";
import { MOBILE_SCREEN_SIZE } from "utils/navBarConsts";
import { useEffect, useState } from "react";
import navLinksPerRole, {
  NavLinkOptions,
} from "components/navbar/NavLinksPerRole";

function Navbar() {
  const { authToken, signOut, role } = useAuth();
  const [navItens, setNavItens] = useState<NavLinkOptions | null>();
  const { t } = useTranslation();
  const { screenWidth } = useViewport();

  useEffect(() => {
    if (role) setNavItens(navLinksPerRole[role]);
    else setNavItens(null);
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
      <NavLink path={navItens?.home ?? ""}>
        <img height="50px" alt="logo" src={logo} />
      </NavLink>

      {screenWidth < MOBILE_SCREEN_SIZE ? (
        ""
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {navItens?.links.map(({ title, to }) => (
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

        {navItens?.buttons.map(({ path, title, icon }) => (
          <NavLink key={title} path={path}>
            <NavBarButton icon={icon} title={title} />
          </NavLink>
        ))}

        {screenWidth < MOBILE_SCREEN_SIZE ? (
          <MenuDrawer drawerLinks={navItens?.links ?? []} />
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
