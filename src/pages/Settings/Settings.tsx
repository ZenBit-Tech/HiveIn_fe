import React from "react";
import { Col, Row } from "antd";
import SettingsMenu from "components/settingsMenu/SettingsMenu";
import ProfileEditForm from "components/profileEditForm/ProfileEditForm";
import PhotoUpload from "components/photoUpload/PhotoUpload";

function Settings() {
  return (
    <Row>
      <Col span={4}>
        <SettingsMenu />
      </Col>
      <Col span={16}>
        <ProfileEditForm />
      </Col>
      <Col span={4}>
        <PhotoUpload />
      </Col>
    </Row>
  );
}

export default Settings;
