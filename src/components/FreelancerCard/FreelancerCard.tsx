import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import { useSaveFreelancersMutation } from "services/jobOwner/talentAPI";
import S from "components/FreelancerCard/styles";
import { useTranslation } from "react-i18next";
import { BLUE } from "utils/consts/colorConsts";
import { IFreelancer } from "../../services/profileInfo/typesDef";

export interface IFreelancerSaved extends IFreelancer {
  saved: boolean;
}

export interface IFreelancerCardProps extends IFreelancerSaved {
  setUserId: (id: number) => void;
}

function FreelancerCard({
  user,
  position,
  rate,
  userId,
  saved,
  setUserId,
}: IFreelancerCardProps) {
  const { t } = useTranslation();

  const [saveFreelancer] = useSaveFreelancersMutation();

  const setSaved = () => {
    saveFreelancer(userId);
  };

  return (
    <S.Card size="default">
      <Row>
        <S.StyledCol
          span={6}
          onClick={() => {
            console.log(userId);
            setUserId(userId);
          }}
        >
          <Avatar size={50} src={user.avatarURL} />
        </S.StyledCol>
        <S.StyledCol span={15} onClick={() => console.log(userId)}>
          <Row>
            <h3>{position}</h3>
          </Row>
          <Row>
            <Col span={8}>Rate: </Col>
            <Col span={16}>{rate}$</Col>
          </Row>
        </S.StyledCol>
        <Col span={3}>
          <Tooltip title={t("Talent.save")}>
            <Button
              style={{ position: "absolute" }}
              onClick={setSaved}
              type="text"
              icon={saved ? <HeartTwoTone color={BLUE} /> : <HeartOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
    </S.Card>
  );
}

export default FreelancerCard;
