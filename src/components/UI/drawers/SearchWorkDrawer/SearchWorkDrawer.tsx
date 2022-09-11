import { DollarCircleFilled, ThunderboltFilled } from "@ant-design/icons";
import { Drawer, Space, Typography } from "antd";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { SkillTag } from "components/UI/JobItem/JobItemStyles";
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
import { BLUE, BOX_BACKGROUND } from "utils/colorConsts";
import SubmitProposalModal from "components/UI/modals/SubmitProposalModal";
import { useTranslation } from "react-i18next";

dayjs.extend(relativeTime);
const { Title } = Typography;

interface SearchWorkDrawerProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  category: string;
  description: string;
  hourlyRate: number;
  skills: string[];
  projectLenght: string;
  englishLevel: string;
  publishDate: string;
}

function SearchWorkDrawer({
  visible,
  onClose,
  title,
  category,
  description,
  hourlyRate,
  skills,
  projectLenght,
  englishLevel,
  publishDate,
}: SearchWorkDrawerProps) {
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
            <Title level={3}>{title}</Title>
            <DrawerText>{dayjs(publishDate).fromNow()}</DrawerText>
          </Header>

          <ContentBox>
            <Title level={5}>{t("SearchWork.category")}</Title>
            <Space direction="vertical">
              <DrawerText strong color={BLUE}>
                {category}
              </DrawerText>
            </Space>
          </ContentBox>

          <ContentBox>
            <DrawerText>{description}</DrawerText>
          </ContentBox>

          <ContentBox>
            <Title level={5}>{t("SearchWork.price")}</Title>
            <Space direction="vertical">
              <DrawerText>
                <DollarCircleFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {t("MyJobs.currency")}
                {hourlyRate}
                {t("MyJobs.perHour")}
              </DrawerText>
              <DrawerText>
                <ThunderboltFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {projectLenght}
              </DrawerText>
            </Space>
          </ContentBox>

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
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </Space>
              </Space>
            </Space>
          </ContentBox>
        </Grid>

        <Grid>
          <SideContent>
            <SendButton onClick={() => setIsModalOpen(true)}>
              {t("SearchWork.send")}
            </SendButton>
            <SubmitProposalModal
              visible={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
              clientBudget={hourlyRate}
            />
          </SideContent>
        </Grid>
      </Wrapper>
    </Drawer>
  );
}

export default SearchWorkDrawer;
