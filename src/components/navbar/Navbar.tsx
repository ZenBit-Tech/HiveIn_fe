import { useTranslation } from "react-i18next";
import {
  SettingFilled,
  UserOutlined,
  MessageFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import NavLink from "../UI/navlink/NavLink";
import NavbarStyles, { ButtonStyle, NavBarButtons } from "./NavbarStyles";
import logo from "./imgs/logo.svg";
import useViewport from "../../hooks/useViewport";

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
          <NavLink path="/my-contracts">{t("MyContracts.title")}</NavLink>{" "}
        </>
      )}

      <NavBarButtons>
        <Tooltip title="Chat">
          <ButtonStyle
            type="dashed"
            shape="circle"
            size="large"
            icon={<MessageFilled />}
          />
        </Tooltip>
        <Tooltip title="Settings">
          <ButtonStyle
            type="dashed"
            shape="circle"
            size="large"
            icon={<SettingFilled />}
          />
        </Tooltip>
        <Tooltip title="Profile">
          <ButtonStyle
            type="dashed"
            shape="circle"
            size="large"
            icon={<UserOutlined />}
          />
        </Tooltip>

        {screenWidth < mobileScreenSize ? (
          <Tooltip title="Profile">
            <ButtonStyle
              type="dashed"
              shape="circle"
              size="large"
              icon={<MenuOutlined />}
            />
          </Tooltip>
        ) : (
          ""
        )}
      </NavBarButtons>
    </NavbarStyles>
  );
}

export default Navbar;
