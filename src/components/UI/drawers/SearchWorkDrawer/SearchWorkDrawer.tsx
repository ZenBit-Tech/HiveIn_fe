import {
  DollarCircleFilled,
  PaperClipOutlined,
  ThunderboltFilled,
} from "@ant-design/icons";
import { Drawer, Space, Typography } from "antd";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import {
  AttachmentLink,
  ContentBox,
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
import { CustomText } from "components/UI/Typography/CustomText";
import { SkillTag } from "components/UI/Tags/SkillTag";

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
            <CustomText>{dayjs(createdAt).fromNow()}</CustomText>
          </Header>

          <ContentBox>
            <Title level={5}>{t("SearchWork.category")}</Title>
            <Space direction="vertical">
              <CustomText strong color={BLUE}>
                {category.name}
              </CustomText>
            </Space>
          </ContentBox>

          <ContentBox>
            <CustomText>{jobDescription}</CustomText>
          </ContentBox>

          <ContentBox>
            <Title level={5}>{t("SearchWork.price")}</Title>
            <Space direction="vertical">
              <CustomText>
                <DollarCircleFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {t("MyJobs.currency")}
                {rate}
                {t("MyJobs.perHour")}
              </CustomText>
              <CustomText>
                <ThunderboltFilled
                  style={{ color: `${BLUE}`, padding: "5px" }}
                />
                {duration} {durationType}
              </CustomText>
            </Space>
          </ContentBox>

          <ContentBox>
            <Title level={5}>{t("SearchWork.habilities")}</Title>
            <Space size={30} style={{ padding: "10px" }}>
              <Space direction="vertical">
                <CustomText strong>{t("SearchWork.english")}</CustomText>
                <CustomText>{englishLevel}</CustomText>
              </Space>
              <Space direction="vertical" style={{ marginLeft: "30px" }}>
                <CustomText strong>{t("SearchWork.skills")}</CustomText>
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
                <CustomText strong>{t("SearchWork.clientInfo")}</CustomText>
                <CustomText color={TEXT_GRAY}>{user.email}</CustomText>
                <CustomText color={TEXT_GRAY}>{user.description}</CustomText>
              </Space>
            </ContentBox>
          </SideContent>
        </Grid>
      </Wrapper>
    </Drawer>
  );
}

export default SearchWorkDrawer;
