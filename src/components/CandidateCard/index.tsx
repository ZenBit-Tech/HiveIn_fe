import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledCol } from "./styles";

export interface IFreelancer {
  photoUrl: string;
  jobPosition: string;
  rate: number;
}

function CandidateCard({ photoUrl, jobPosition, rate }: IFreelancer) {
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();
  return (
    <Card size="default">
      <Row>
        <StyledCol
          span={6}
          onClick={() => navigate("https://joeschmoe.io/api/v1/random")}
        >
          <Avatar size={50} src={photoUrl} />
        </StyledCol>
        <StyledCol
          span={15}
          onClick={() => navigate("https://joeschmoe.io/api/v1/random")}
        >
          <Row>
            <h3>{jobPosition}</h3>
          </Row>
          <Row>
            <Col span={8}>Rate: </Col>
            <Col span={16}>{rate}$</Col>
          </Row>
        </StyledCol>
        <Col span={3}>
          <Tooltip title="Save">
            <Button
              style={{ position: "absolute" }}
              onClick={() => setSaved(!saved)}
              type="text"
              icon={saved ? <HeartTwoTone color="blue" /> : <HeartOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
}

export default CandidateCard;
