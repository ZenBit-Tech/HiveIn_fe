import React from "react";
import { Col, Row } from "antd";
import ContactInfoForm from "components/contactInfoForm/ContactInfoForm";
import { useLocation } from "react-router-dom";
import {
  DISCOVER_ROUTE,
  RECENTLY_VIEWED_ROUTE,
  SAVED_TALENT_ROUTE,
  YOUR_HIRES_ROUTE,
} from "utils/routeConsts";
import Discover from "./Discover/Index";
import TalentBar from "./TalentBar";
import SavedTalent from "./SavedTalents/Index";

function Talent() {
  const { pathname } = useLocation();

  const renderForm = (): JSX.Element | null => {
    switch (pathname) {
      case DISCOVER_ROUTE:
        return <Discover />;
      case YOUR_HIRES_ROUTE:
        return <ContactInfoForm />;
      case SAVED_TALENT_ROUTE:
        return <SavedTalent />;
      case RECENTLY_VIEWED_ROUTE:
        return <ContactInfoForm />;
      default:
        return null;
    }
  };

  return (
    <Row>
      <Col span={4}>
        <TalentBar />
      </Col>
      <Col span={20}>{renderForm()}</Col>
    </Row>
  );
}

export default Talent;
