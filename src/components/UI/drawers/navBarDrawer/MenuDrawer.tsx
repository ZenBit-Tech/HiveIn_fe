import React, { useState } from "react";

import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Col, Divider, Drawer, Row } from "antd";
import NavLink from "components/UI/navlink/NavLink";
import NavBarButton from "components/UI/buttons/navBarButton/NavBarButton";
import useAuth from "hooks/useAuth";
import { SIGN_IN_ROUTE } from "utils/consts/routeConsts";
import { LinkType } from "components/navbar/NavLinksPerRole";

interface IMenuDrawerProps {
  drawerLinks: LinkType[];
}

function MenuDrawer({ drawerLinks }: IMenuDrawerProps) {
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <NavBarButton
        icon={<MenuOutlined />}
        title={t("Menu.title")}
        onClick={showDrawer}
      />

      <Drawer
        title=""
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        key="bottom"
      >
        <>
          {drawerLinks?.map(({ title, to }) => (
            <Row key={to}>
              <Col span={12}>
                <NavLink path={to}>{title}</NavLink>
              </Col>
              <Divider />
            </Row>
          ))}
          <Row>
            <Col span={12}>
              <NavLink path={SIGN_IN_ROUTE} onClick={signOut}>
                {t("SignIn.signOut")}
              </NavLink>
            </Col>
            <Divider />
          </Row>
        </>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
