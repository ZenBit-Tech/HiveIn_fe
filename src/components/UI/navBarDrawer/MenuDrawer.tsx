import React, { useState } from "react";

import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Col, Divider, Drawer, Row } from "antd";
import NavLink from "components/UI/navlink/NavLink";
import NavBarButton from "components/UI/navBarButton/NavBarButton";
import useAuth from "hooks/useAuth";
import { NavRoleOptions } from "components/navbar/NavLinksPerRole";
import { SIGN_IN_ROUTE } from "utils/routeConsts";

interface MenuDrawerProps {
  drawerLinks: NavRoleOptions[];
}

function MenuDrawer({ drawerLinks }: MenuDrawerProps) {
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
