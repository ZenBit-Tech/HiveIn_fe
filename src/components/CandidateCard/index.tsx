import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./styles";

export interface IFreelancer {
  photoUrl: string;
  jobPosition: string;
  link: string;
  rate: number;
}

function CandidateCard({ photoUrl, jobPosition, rate, link }: IFreelancer) {
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();
  return (
    <S.Card size="default">
      <Row>
        <S.StyledCol span={6} onClick={() => navigate(link)}>
          <Avatar size={50} src={photoUrl} />
        </S.StyledCol>
        <S.StyledCol span={15} onClick={() => navigate(link)}>
          <Row>
            <h3>{jobPosition}</h3>
          </Row>
          <Row>
            <Col span={8}>Rate: </Col>
            <Col span={16}>{rate}$</Col>
          </Row>
        </S.StyledCol>
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
    </S.Card>
  );
}

export default CandidateCard;
