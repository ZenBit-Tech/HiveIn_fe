import React from "react";
import { Col, Row } from "antd";
import SettingsMenu from "components/settingsMenu/SettingsMenu";
import ProfileEditForm from "components/profileEditForm/ProfileEditForm";

function Settings() {
  return (
    <Row>
      <Col span={4}>
        <SettingsMenu />
      </Col>
      <Col span={20}>
        <ProfileEditForm />
      </Col>
    </Row>
  );
}

export default Settings;
