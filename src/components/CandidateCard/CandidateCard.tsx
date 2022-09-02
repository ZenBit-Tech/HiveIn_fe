import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import useJwtDecoder from "hooks/useJwtDecoder";
import { useNavigate } from "react-router-dom";
import { useSaveFreelancersMutation } from "services/jobOwner/talentAPI";
import S from "./styles";

export interface IFreelancer {
  userId: number;
  user: {
    avatarURL: string;
  };
  position: string;
  rate: number;
  saved: boolean;
}

function CandidateCard({ user, position, rate, userId, saved }: IFreelancer) {
  const { sub } = useJwtDecoder();

  const [saveFreelancer] = useSaveFreelancersMutation();

  const setSaved = () => {
    saveFreelancer({ userId: Number(sub!), freelancerId: userId });
  };

  const navigate = useNavigate();
  return (
    <S.Card size="default">
      <Row>
        <S.StyledCol span={6} onClick={() => navigate(userId)}>
          <Avatar size={50} src={user.avatarURL} />
        </S.StyledCol>
        <S.StyledCol span={15} onClick={() => navigate(userId)}>
          <Row>
            <h3>{position}</h3>
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
              onClick={() => setSaved()}
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
