import { Col, Row } from "antd";
import SettingsMenu from "components/settingsMenu/SettingsMenu";
import ProfileEditForm from "components/profileEditForm/ProfileEditForm";
import ContactInfoForm from "components/contactInfoForm/ContactInfoForm";
import PhotoUpload from "components/photoUpload/PhotoUpload";
import { useLocation } from "react-router-dom";
import {
  SETTINGS_CONTACT_INFO_ROUTE,
  SETTINGS_ROUTE,
} from "utils/consts/routeConsts";

function Settings() {
  const { pathname } = useLocation();

  const renderForm = (): JSX.Element | null => {
    switch (pathname) {
      case SETTINGS_ROUTE:
        return <ProfileEditForm />;
      case SETTINGS_CONTACT_INFO_ROUTE:
        return <ContactInfoForm />;
      default:
        return null;
    }
  };

  return (
    <Row>
      <Col span={4}>
        <SettingsMenu />
      </Col>
      <Col span={20}>{renderForm()}</Col>
      <Col span={4}>
        <PhotoUpload />
      </Col>
    </Row>
  );
}

export default Settings;
