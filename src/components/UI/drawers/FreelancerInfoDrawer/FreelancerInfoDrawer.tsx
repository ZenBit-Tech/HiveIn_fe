import { DollarCircleFilled } from "@ant-design/icons";
import { Avatar, Drawer, Space, Typography } from "antd";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import {
  ContentBox,
  DrawerText,
  Grid,
  Header,
  SideContent,
  Wrapper,
} from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawerStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { BLUE, BOX_BACKGROUND, TEXT_GRAY } from "utils/consts/colorConsts";
import { useTranslation } from "react-i18next";
import { IFreelancer } from "services/profileInfo/typesDef";
import EducationExperienceCard from "components/EducationExperienceCard/EducationExperienceCard";
import SubmitInviteModal from "components/UI/ModalWindows/SubmitInviteModal/SubmitInviteModal";
import { SkillTag } from "components/UI/Tags/SkillTag";

dayjs.extend(relativeTime);
const { Title } = Typography;

interface IFreelancerInfoDrawerProps extends IFreelancer {
  visible: boolean;
  onClose: () => void;
}

function FreelancerInfoDrawer({
  visible,
  onClose,
  id,
  englishLevel,
  position,
  rate,
  skills,
  education,
  experience,
  user,
  category,
}: IFreelancerInfoDrawerProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Drawer
      title=""
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
      width="1000px"
      bodyStyle={{ backgroundColor: `${BOX_BACKGROUND}` }}
    >
      <Wrapper>
        <Grid grow={3}>
          <Header>
            <Space size="large">
              <Avatar size={150} src={user.avatarURL} />
              <Space direction="vertical">
                <Title level={3}>
                  {user.firstName} {user.lastName}
                </Title>
                <Title level={5}>{position}</Title>
                <DrawerText>{user.phone}</DrawerText>
                <DrawerText>{user.email}</DrawerText>
              </Space>
            </Space>
          </Header>
          <ContentBox>
            <Title level={5}>{t("SearchWork.habilities")}</Title>
            <Space size={30} style={{ padding: "10px" }}>
              <Space direction="vertical">
                <DrawerText strong>{t("SearchWork.english")}</DrawerText>
                <DrawerText>{englishLevel}</DrawerText>
              </Space>
              <Space direction="vertical" style={{ marginLeft: "30px" }}>
                <DrawerText strong>{t("SearchWork.skills")}</DrawerText>
                <Space>
                  {skills.map((skill) => (
                    <SkillTag key={skill.id}>{skill.name}</SkillTag>
                  ))}
                </Space>
              </Space>
            </Space>
          </ContentBox>
          {education.length !== 0 && (
            <ContentBox>
              <Title level={5}>{t("Talent.education")}</Title>
              <Space size={30} style={{ padding: "10px" }} direction="vertical">
                {education.map((educ) => (
                  <EducationExperienceCard key={educ.id} {...educ} />
                ))}
              </Space>
            </ContentBox>
          )}
          {experience.length !== 0 && (
            <ContentBox>
              <Title level={5}>{t("Talent.experience")}</Title>
              <Space size={30} style={{ padding: "10px" }} direction="vertical">
                {experience.map((exp) => (
                  <EducationExperienceCard key={exp.id} {...exp} />
                ))}
              </Space>
            </ContentBox>
          )}
        </Grid>

        <Grid>
          <SideContent>
            <Header>
              <SendButton onClick={() => setIsModalOpen(true)}>
                {t("Talent.send")}
              </SendButton>
              <SubmitInviteModal
                bid={+rate}
                freelancerId={id}
                freelancerUser={user}
                visible={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
              />
            </Header>

            <ContentBox>
              <Space direction="vertical">
                <DrawerText strong>{t("Talent.description")}</DrawerText>
                <DrawerText color={TEXT_GRAY}>{user.description}</DrawerText>
              </Space>
            </ContentBox>
            <ContentBox>
              <Title level={5}>{t("Talent.categoryTitle")}</Title>
              <Space direction="vertical">
                <DrawerText strong color={BLUE}>
                  {category.name}
                </DrawerText>
              </Space>
            </ContentBox>

            <ContentBox>
              <Title level={5}>{t("Talent.rate")}</Title>
              <DrawerText>
                <DollarCircleFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {t("MyJobs.currency")}
                {rate}
                {t("MyJobs.perHour")}
              </DrawerText>
            </ContentBox>
          </SideContent>
        </Grid>
      </Wrapper>
    </Drawer>
  );
}

export default FreelancerInfoDrawer;
