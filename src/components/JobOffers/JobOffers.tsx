import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
import { CustomText } from "components/UI/Typography/CustomText";
import { BLACK, BLUE, DARK_BLUE } from "utils/consts/colorConsts";
import { StatusTag } from "components/UI/Tags/StatusTag";
import logo from "assets/logo.svg";
import JobTitle, {
  AcceptButton,
  DeatailedInfo,
  DetailDiv,
  DivContainer,
  HeaderInfo,
  JobDescription,
  RejectButton,
  RouterLink,
  TagStatus,
  Wrapper,
} from "components/JobOffers/JobOffersStyles";
import {
  IProposalsRes,
  useChangeOfferStatusMutation,
} from "services/jobPosts/proposalsAPI";
import SearchWorkDrawer from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OfferStatus } from "utils/enums";
import { Modal } from "antd";
import { OfferTags } from "components/JobOffers/OfferTags";

dayjs.extend(relativeTime);

interface IJobOffersProps extends IProposalsRes {
  link?: string;
  refetch: () => void;
}

function JobOffers({ id, status, jobPost, refetch }: IJobOffersProps) {
  const { t } = useTranslation();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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
    <Wrapper>
      <DivContainer>
        <img height="50px" alt="logo" src={logo} />
      </DivContainer>
      <DetailDiv>
        <JobTitle>
          <RouterLink to="/proposals" onClick={() => setOpenDrawer(true)}>
            <div>
              <CustomText color={BLACK} link={BLACK} strong>
                {jobPost.user?.firstName}
              </CustomText>
            </div>
            <CustomText color={BLUE} link={DARK_BLUE} strong>
              {jobPost.title}
            </CustomText>
          </RouterLink>
          <HeaderInfo>
            {status === OfferStatus.PENDING && (
              <>
                <AcceptButton onClick={handleAccept}>
                  {t("Offer.acceptOffer")}
                </AcceptButton>
                <RejectButton onClick={handleClose}>
                  {t("Offer.rejectOffer")}
                </RejectButton>
              </>
            )}
            <TagStatus>
              <StatusTag tag={OfferTags[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </StatusTag>
            </TagStatus>
          </HeaderInfo>
        </JobTitle>
        <DeatailedInfo>
          <CustomText strong color={BLUE}>
            {jobPost.category?.name}
          </CustomText>
          {" - "}
          {jobPost.duration} {jobPost.durationType} duration
          {" - "}
          {dayjs(jobPost.createdAt).fromNow()}
        </DeatailedInfo>
        <JobDescription>
          {"Offer: "}
          {jobPost.rate}
          {t("MyJobs.perHour")}
        </JobDescription>
      </DetailDiv>
      <SearchWorkDrawer
        visible={openDrawer}
        onClose={() => setOpenDrawer(false)}
        {...jobPost}
      />
    </Wrapper>
  );
}

export default JobOffers;
