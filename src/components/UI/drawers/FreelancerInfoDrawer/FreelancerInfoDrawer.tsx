/* eslint-disable @typescript-eslint/no-unused-vars */
import { DollarCircleFilled } from "@ant-design/icons";
import { Avatar, Drawer, Row, Space, Typography } from "antd";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { SkillTag } from "components/UI/JobItem/JobItemStyles";
import {
  AttachmentLink,
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
import { JOB_POST_FILE } from "utils/consts/breakepointConsts";
import { IFreelancer } from "../../../../services/profileInfo/typesDef";
import EducationExperienceCard from "../../../EducationExperienceCard/EducationExperienceCard";

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
  categoryId, // add category name
  user,
}: IFreelancerInfoDrawerProps) {
  const { t } = useTranslation();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const category = { name: "Legal" };

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
            <Row gutter={5}>
              <Avatar size={150} src={user.avatarURL} />
              <Space direction="vertical">
                <Title level={3}>
                  {user.firstName} {user.lastName}
                </Title>
                <Title level={5}>{position}</Title>
                <DrawerText>{user.phone}</DrawerText>
                <DrawerText>{user.email}</DrawerText>
              </Space>
            </Row>
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
          <ContentBox>
            <Title level={5}>{t("Talent.education")}</Title>
            <Space size={30} style={{ padding: "10px" }} direction="vertical">
              {education.map((educ) => (
                <EducationExperienceCard key={educ.id} {...educ} />
              ))}
            </Space>
          </ContentBox>
          <ContentBox>
            <Title level={5}>{t("Talent.experience")}</Title>
            <Space size={30} style={{ padding: "10px" }} direction="vertical">
              {experience.map((exp) => (
                <EducationExperienceCard key={exp.id} {...exp} />
              ))}
            </Space>
          </ContentBox>
        </Grid>

        <Grid>
          <SideContent>
            <Header>
              <SendButton
                onClick={
                  () => console.log("erogiherg") /* setIsModalOpen(true) */
                }
              >
                {t("Talent.send")}
              </SendButton>
              {/* <SubmitProposalModal
                idJobPost={id}
                visible={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                clientBudget={rate}
              /> */}
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
