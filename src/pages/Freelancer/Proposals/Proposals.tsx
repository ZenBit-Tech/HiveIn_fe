import React from "react";
import { Skeleton, Typography } from "antd";
import JobOffers from "components/JobOffers/JobOffers";
import { useGetOwnOffersQuery } from "services/jobPosts/proposalsAPI";
import { useTranslation } from "react-i18next";
import {
  PageContainer,
  Card,
  DivContainer,
  Header,
  Section,
  TitleText,
} from "pages/Freelancer/Proposals/ProposalsStyles";

const { Title } = Typography;

function Proposals() {
  const { t } = useTranslation();

  const {
    data: offers,
    isLoading,
    isSuccess,
    refetch,
  } = useGetOwnOffersQuery();

  return (
    <PageContainer>
      <Header>
        <div>
          <Title level={3}>{t("Offer.offers")}</Title>
        </div>
      </Header>
      <Section>
        <Card>
          <TitleText font_sz="1.5em" pd="5px" pd_bottom="5%">
            {t("Offer.yourOffers")}
          </TitleText>
          {isLoading && (
            <DivContainer>
              <Skeleton active paragraph={{ rows: 4 }} />
            </DivContainer>
          )}

          {isSuccess && !offers?.length ? (
            <DivContainer>{t("MyJobs.nothingToShow")}</DivContainer>
          ) : (
            offers?.map((offer) => (
              <JobOffers refetch={refetch} key={offer?.id} {...offer} />
            ))
          )}
        </Card>
      </Section>
    </PageContainer>
  );
}

export default Proposals;
