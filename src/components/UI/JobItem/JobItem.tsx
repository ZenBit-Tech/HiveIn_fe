import {
  DollarCircleFilled,
  ThunderboltFilled,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Modal, notification, PageHeader, Space, Typography } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  AttachmentLink,
  ContentBox,
  Grid,
  Header,
  SideContent,
  Wrapper,
} from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawerStyles";
import { SkillTag } from "components/UI/Tags/SkillTag";
import { CustomText } from "components/UI/Typography/CustomText";
import { useTranslation } from "react-i18next";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import { JOB_POST_FILE } from "utils/consts/breakepointConsts";
import {
  BLUE,
  TAG_CLOSED,
  TAG_SUCCESS,
  TEXT_GRAY,
} from "utils/consts/colorConsts";
import LongMenu from "components/UI/DropdownMenus/LongMenu/LongMenu";
import { TagStatus } from "components/UI/JobItems/JobItemsStyles";
import { StatusTag } from "components/UI/Tags/StatusTag";
import defineContractStatus from "utils/functions/defineContractStatus";
import { TitleInfo } from "components/UI/JobItem/JobItemStyles";
import { useNavigate } from "react-router-dom";
import { MY_JOBS_ROUTE } from "utils/consts/routeConsts";
import { useEffect, useState } from "react";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import { useCloseContractMutation } from "services/contract/contractApi";

dayjs.extend(relativeTime);
const { Title } = Typography;

interface IJobItemProps extends IJobPost {
  refetch: () => void;
}

function JobItem({
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
  contract,
  isDraft,
  refetch,
}: IJobItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [closeContract, { isError, isSuccess, isLoading }] =
    useCloseContractMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      notification.error({
        description: `${t("MyContracts.server.tryAgain")}`,
        message: `${t("MyContracts.server.error")}`,
      });
      return;
    }
    if (!isLoading && isSuccess) {
      notification.success({
        description: `${t("MyContracts.server.statusChanged")}`,
        message: `${t("MyContracts.server.success")}`,
      });
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onModalOk = async () => {
    if (contract) {
      await closeContract({
        contractId: contract.id,
      });
      setIsModalOpen(false);
    }
  };

  return (
    <Wrapper>
      <Grid grow={3}>
        <Header>
          <TitleInfo>
            <PageHeader onBack={() => navigate(MY_JOBS_ROUTE)} title={title} />

            <TitleInfo>
              <TagStatus>
                {contract && (
                  <StatusTag
                    tag={!contract?.endDate ? TAG_SUCCESS : TAG_CLOSED}
                  >
                    {defineContractStatus(contract?.endDate)}
                  </StatusTag>
                )}
                {isDraft && <StatusTag>{t("MyJobs.draft")}</StatusTag>}
              </TagStatus>
              <LongMenu id={id} />
            </TitleInfo>
          </TitleInfo>
          <div>
            <CustomText>{dayjs(createdAt).fromNow()}</CustomText>
          </div>
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
              <ThunderboltFilled style={{ color: `${BLUE}`, padding: "5px" }} />
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
            <Space direction="vertical">
              <CustomText strong>{t("SearchWork.clientInfo")}</CustomText>
              <CustomText color={TEXT_GRAY}>{user.email}</CustomText>
              <CustomText color={TEXT_GRAY}>{user.description}</CustomText>
            </Space>
          </Header>
          <ContentBox>
            {contract && !contract?.endDate && (
              <SendButton onClick={() => setIsModalOpen(true)}>
                {t("MyJobs.endContractTitle")}
              </SendButton>
            )}
            <Modal
              visible={isModalOpen}
              title={t("MyJobs.endContractTitle")}
              onOk={onModalOk}
              onCancel={() => setIsModalOpen(false)}
              okText={t("MyJobs.continueText")}
            >
              <p> {t("MyJobs.endContractMessage")}</p>
            </Modal>
          </ContentBox>
        </SideContent>
      </Grid>
    </Wrapper>
  );
}

export default JobItem;
