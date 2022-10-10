import { Avatar, Drawer, Space, Typography } from "antd";
import {
  ContentBox,
  Grid,
  Header,
  ProfileBox,
  SideContent,
  Wrapper,
} from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawerStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  BLUE,
  BOX_BACKGROUND,
  TAG_CLOSED,
  TEXT_GRAY,
  WHITE,
} from "utils/consts/colorConsts";
import { useTranslation } from "react-i18next";
import { CustomText } from "components/UI/Typography/CustomText";
import { IProposalsRes } from "services/jobPosts/proposalsAPI";
import { OfferStatus } from "utils/enums";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import useJobOfferStatus from "hooks/useJobOfferStatus";
import { AVATAR_SIZE_MEDIUM } from "utils/consts/numberConsts";

dayjs.extend(relativeTime);
const { Title } = Typography;

interface IJobOfferDrawerProps extends IProposalsRes {
  visible: boolean;
  onClose: () => void;
  refetch: () => void;
}

function JobOfferDrawer({
  visible,
  onClose,
  id,
  status,
  jobPost,
  createdAt,
  refetch,
}: IJobOfferDrawerProps) {
  const { t } = useTranslation();

  const { handleAccept, handleDecline } = useJobOfferStatus({ id, refetch });

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
            <Title level={3}>{t("Offer.jobOffer")}</Title>
            <CustomText>{dayjs(createdAt).fromNow()}</CustomText>
          </Header>

          <ContentBox>
            <Title level={5}>{t("Offer.drawerTitle")}</Title>
            <Space direction="vertical">
              <CustomText
                style={{ textTransform: "capitalize" }}
                strong
                color={BLUE}
              >
                {status}
              </CustomText>
              <CustomText color={TEXT_GRAY} strong>
                {t("Offer.expireDate")}{" "}
                {dayjs(createdAt).add(2, "day").fromNow()}
              </CustomText>
              <CustomText color={TEXT_GRAY} strong>
                {t("Offer.createDate")} {dayjs(createdAt).format("DD/MM/YYYY")}
              </CustomText>
            </Space>
          </ContentBox>

          <ContentBox>
            <Title level={5}>{t("Offer.drawerRelatedJob")}</Title>
            <Space direction="vertical">
              <CustomText strong color={BLUE}>
                {jobPost.title}
              </CustomText>
              <CustomText color={TEXT_GRAY}>{jobPost.category.name}</CustomText>
            </Space>
          </ContentBox>
        </Grid>

        <Grid>
          <SideContent>
            {status === OfferStatus.PENDING && (
              <Header>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <SendButton onClick={handleAccept}>
                    {t("Offer.acceptOffer")}
                  </SendButton>

                  <SendButton
                    backColor={WHITE}
                    textColor={TAG_CLOSED}
                    borderColor={TAG_CLOSED}
                    hooverColor={WHITE}
                    hooverBackColor={TAG_CLOSED}
                    onClick={handleDecline}
                  >
                    {t("Offer.rejectOffer")}
                  </SendButton>
                </Space>
              </Header>
            )}

            <ProfileBox showBorder={!(status === OfferStatus.PENDING)}>
              <CustomText strong>{t("SearchWork.clientInfo")}</CustomText>
              <Space direction="vertical" align="center">
                <Avatar
                  size={AVATAR_SIZE_MEDIUM}
                  alt="logo"
                  src={jobPost?.user?.avatar?.url}
                />

                <CustomText color={TEXT_GRAY}>
                  {jobPost.user.firstName} {jobPost.user.lastName}
                </CustomText>

                <CustomText color={TEXT_GRAY}>
                  {jobPost.user.description}
                </CustomText>
              </Space>
            </ProfileBox>
          </SideContent>
        </Grid>
      </Wrapper>
    </Drawer>
  );
}

export default JobOfferDrawer;
