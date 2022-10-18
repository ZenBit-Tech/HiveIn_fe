import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
import { CustomText } from "components/UI/Typography/CustomText";
import { BLACK, BLUE, DARK_BLUE } from "utils/consts/colorConsts";
import { StatusTag } from "components/UI/Tags/StatusTag";
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
import { IOffersRes } from "services/jobPosts/proposalsAPI";
import SearchWorkDrawer from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawer";
import { useEffect, useState } from "react";
import { OfferStatus } from "utils/enums";
import { OfferTags } from "components/JobOffers/OfferTags";
import { PROPOSALS_ROUTE } from "utils/consts/routeConsts";
import JobOfferDrawer from "components/UI/drawers/JobOfferDrawer/JobOfferDrawer";
import useJobOfferStatus from "hooks/useJobOfferStatus";
import { Avatar } from "antd";
import { AVATAR_SIZE_MEDIUM } from "utils/consts/numberConsts";

dayjs.extend(relativeTime);

interface IJobOffersProps extends IOffersRes {
  link?: string;
  refetch: () => void;
}

function JobOffers({
  id,
  status,
  jobPost,
  createdAt,
  refetch,
}: IJobOffersProps) {
  const { t } = useTranslation();

  const [openDetailDrawer, setOpenDetailDrawer] = useState<boolean>(false);
  const [openOfferDrawer, setOpenOfferDrawer] = useState<boolean>(false);

  const { handleAccept, handleDecline, handleExpired } = useJobOfferStatus({
    id,
    refetch,
  });

  useEffect(() => {
    if (
      status !== OfferStatus.EXPIRED &&
      dayjs(createdAt).add(2, "day").isBefore(new Date())
    )
      handleExpired();
  }, [createdAt, handleExpired, status]);

  return (
    <Wrapper>
      <DivContainer>
        <Avatar
          size={AVATAR_SIZE_MEDIUM}
          alt="logo"
          src={jobPost?.user?.avatar?.url}
        />
      </DivContainer>
      <DetailDiv>
        <JobTitle>
          <RouterLink to={`${PROPOSALS_ROUTE}`}>
            <div>
              <CustomText
                onClick={() => setOpenOfferDrawer(true)}
                color={BLACK}
                link={BLACK}
                strong
              >
                {jobPost.user?.firstName}
              </CustomText>
            </div>
            <CustomText
              onClick={() => setOpenDetailDrawer(true)}
              color={BLUE}
              link={DARK_BLUE}
              strong
            >
              {jobPost.title}
            </CustomText>
          </RouterLink>
          <HeaderInfo>
            <TagStatus>
              <StatusTag tag={OfferTags[status]}>{status}</StatusTag>
            </TagStatus>
          </HeaderInfo>
        </JobTitle>
        <DeatailedInfo>
          <CustomText strong color={BLUE}>
            {jobPost.category?.name}
          </CustomText>
          {" - "}
          {jobPost.duration} {jobPost.durationType} {t("Offer.duration")}
          {" - "}
          {dayjs(jobPost.createdAt).fromNow()}
        </DeatailedInfo>
        <JobDescription>
          {t("Offer.offer")}
          {jobPost.rate}
          {t("MyJobs.perHour")}
        </JobDescription>
        {status === OfferStatus.PENDING && (
          <>
            <AcceptButton onClick={handleAccept}>
              {t("Offer.acceptOffer")}
            </AcceptButton>
            <RejectButton onClick={handleDecline}>
              {t("Offer.rejectOffer")}
            </RejectButton>
          </>
        )}
      </DetailDiv>
      <JobOfferDrawer
        id={id}
        status={status}
        jobPost={jobPost}
        visible={openOfferDrawer}
        onClose={() => setOpenOfferDrawer(false)}
        refetch={refetch}
        createdAt={createdAt}
      />
      <SearchWorkDrawer
        visible={openDetailDrawer}
        onClose={() => setOpenDetailDrawer(false)}
        {...jobPost}
        sendProposalButtonIsVisible={false}
      />
    </Wrapper>
  );
}

export default JobOffers;
