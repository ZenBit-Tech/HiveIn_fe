import { Drawer, Modal, Space, Typography } from "antd";
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
import {
  IProposalsRes,
  useChangeOfferStatusMutation,
} from "services/jobPosts/proposalsAPI";
import logo from "assets/logo.svg";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { OfferStatus } from "utils/enums";
import SendButton from "components/UI/buttons/SendButton/SendButton";

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

  const [runChangeOfferStatus, { isError, isLoading, isSuccess }] =
    useChangeOfferStatusMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error(`${t("Offer.status")}`);

      return;
    }
    if (!isLoading && isSuccess) {
      toast.success(`${t("Offer.status")}`);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleAccept = async () => {
    Modal.confirm({
      title: `${t("Offer.confirmAccept")}`,
      onOk: async () => {
        await runChangeOfferStatus({ id, status: OfferStatus.ACTIVE });
      },
    });
  };

  const handleClose = async () => {
    Modal.confirm({
      title: `${t("Offer.confirmReject")}`,
      onOk: async () => {
        await runChangeOfferStatus({ id, status: OfferStatus.REJECTED });
      },
    });
  };

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
                    onClick={handleClose}
                  >
                    {t("Offer.rejectOffer")}
                  </SendButton>
                </Space>
              </Header>
            )}

            <ProfileBox showBorder={!(status === OfferStatus.PENDING)}>
              <CustomText strong>{t("SearchWork.clientInfo")}</CustomText>
              <Space direction="vertical" align="center">
                <img height="50px" alt="logo" src={logo} />

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
