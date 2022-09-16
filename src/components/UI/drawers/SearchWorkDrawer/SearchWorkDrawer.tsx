import {
  DollarCircleFilled,
  PaperClipOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { Drawer, Space, Typography } from "antd";
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
import SubmitProposalModal from "components/UI/ModalWindows/SubmitProposalModal/SubmitProposalModal";
import { useTranslation } from "react-i18next";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import { JOB_POST_FILE } from "utils/consts/breakepointConsts";

dayjs.extend(relativeTime);
const { Title } = Typography;

interface ISearchWorkDrawerProps extends IJobPost {
  visible: boolean;
  onClose: () => void;
}

function SearchWorkDrawer({
  visible,
  onClose,
  id,
  title,
  category,
  jobDescription,
  rate,
  skills,
  duration,
  durationType,
  englishLevel,
  createdAt,
  user,
  file,
}: ISearchWorkDrawerProps) {
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
            <DrawerText>{dayjs(createdAt).fromNow()}</DrawerText>
          </Header>

          <ContentBox>
            <Title level={5}>{t("SearchWork.category")}</Title>
            <Space direction="vertical">
              <DrawerText strong color={BLUE}>
                {category.name}
              </DrawerText>
            </Space>
          </ContentBox>

          <ContentBox>
            <DrawerText>{jobDescription}</DrawerText>
          </ContentBox>

          <ContentBox>
            <Title level={5}>{t("SearchWork.price")}</Title>
            <Space direction="vertical">
              <DrawerText>
                <DollarCircleFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {t("MyJobs.currency")}
                {rate}
                {t("MyJobs.perHour")}
              </DrawerText>
              <DrawerText>
                <ThunderboltFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {duration} {durationType}
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
                    <SkillTag key={skill.id}>{skill.name}</SkillTag>
                  ))}
                </Space>
              </Space>
            </Space>
          </ContentBox>

          {file && (
            <ContentBox>
              <Title level={5}>{t("SearchWork.img")}</Title>
              <Space direction="vertical">
                <AttachmentLink
                  href={`${process.env.REACT_APP_API_URL}/${JOB_POST_FILE}/${file.id}`}
                >
                  <PaperClipOutlined />
                  {file.filename}
                </AttachmentLink>
              </Space>
            </ContentBox>
          )}
        </Grid>

        <Grid>
          <SideContent>
            <Header>
              <SendButton onClick={() => setIsModalOpen(true)}>
                {t("SearchWork.send")}
              </SendButton>
              <SubmitProposalModal
                idJobPost={id}
                visible={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                clientBudget={rate}
              />
            </Header>

            <ContentBox>
              <Space direction="vertical">
                <DrawerText strong>{t("SearchWork.clientInfo")}</DrawerText>
                <DrawerText color={TEXT_GRAY}>{user.email}</DrawerText>
                <DrawerText color={TEXT_GRAY}>{user.description}</DrawerText>
              </Space>
            </ContentBox>
          </SideContent>
        </Grid>
      </Wrapper>
    </Drawer>
  );
}

export default SearchWorkDrawer;
