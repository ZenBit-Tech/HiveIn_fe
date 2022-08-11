import React, { useState } from "react";

import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Col, Divider, Drawer, Row } from "antd";
import NavLink from "components/UI/navlink/NavLink";
import NavBarButton from "components/UI/navBarButton/NavBarButton";

function MenuDrawer() {
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
        <Row>
          <Col span={12}>
            <NavLink path="/search-work">{t("SearchWork.title")}</NavLink>
          </Col>
          <Divider />
        </Row>
        <Row>
          <Col span={12}>
            <NavLink path="/proposals">{t("Proposals.title")}</NavLink>
          </Col>
          <Divider />
        </Row>
        <Row>
          <Col span={12}>
            <NavLink path="/my-contracts">{t("MyContracts.title")}</NavLink>
          </Col>
          <Divider />
        </Row>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
