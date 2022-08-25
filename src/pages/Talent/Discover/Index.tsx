import { Col, Empty, Row } from "antd";
import CandidateCard, { IFreelancer } from "components/CandidateCard";
import DiscoverFilterForm from "components/DiscoverFilterForm";
import SeeMoreLessButton from "components/SeeMoreLessButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Discover() {
  const foundCandidates: IFreelancer[] = [
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer",
      rate: 10,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer",
      rate: 10,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer",
      rate: 10,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer",
      rate: 10,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer",
      rate: 10,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
  ];
  const recentlyViewedCandidates: IFreelancer[] = [
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer",
      rate: 10,
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Full-stack developer",
      rate: 40,
    },
  ];

  const [foundCandidatesShowAll, setFoundCandidatesShowAll] = useState(false);
  const [recentlyViewedCandidatesShowAll, setRecentlyViewedCandidatesShowAll] =
    useState(false);

  const { t } = useTranslation();

  return (
    <>
      <h1>{t("Talent.Discover.title")}</h1>
      <DiscoverFilterForm />
      <Row style={{ margin: 20 }}>
        <Col xl={21}>
          <h2>{t("Talent.Discover.foundCandidates")}</h2>
        </Col>
        <Col xl={3}>
          <SeeMoreLessButton
            isShowAll={foundCandidatesShowAll}
            changeShowAll={() =>
              setFoundCandidatesShowAll(!foundCandidatesShowAll)
            }
            cardCount={foundCandidates.length}
            cardInRow={4}
          />
        </Col>
      </Row>
      <Row gutter={[16, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
        {foundCandidates.length === 0 && (
          <Col span={24}>
            <Empty description="No result" />
          </Col>
        )}
        {foundCandidatesShowAll
          ? foundCandidates.map((freelancer) => (
              <Col xl={6} lg={8} sm={12}>
                <CandidateCard {...freelancer} />
              </Col>
            ))
          : foundCandidates.slice(0, 4).map((freelancer) => (
              <Col xl={6} lg={8} sm={12}>
                <CandidateCard {...freelancer} />
              </Col>
            ))}
      </Row>
      <Row style={{ margin: 20 }}>
        <Col span={21}>
          <h2>{t("Talent.Discover.recentlyViewed")}</h2>
        </Col>
        <Col span={3}>
          <SeeMoreLessButton
            isShowAll={recentlyViewedCandidatesShowAll}
            changeShowAll={() =>
              setRecentlyViewedCandidatesShowAll(
                !recentlyViewedCandidatesShowAll
              )
            }
            cardCount={recentlyViewedCandidates.length}
            cardInRow={4}
          />
        </Col>
      </Row>
      <Row gutter={[16, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
        {recentlyViewedCandidatesShowAll
          ? recentlyViewedCandidates.map((freelancer) => (
              <Col xl={6} lg={8} sm={12}>
                <CandidateCard {...freelancer} />
              </Col>
            ))
          : recentlyViewedCandidates.slice(0, 4).map((freelancer) => (
              <Col xl={6} lg={8} sm={12}>
                <CandidateCard {...freelancer} />
              </Col>
            ))}
      </Row>
    </>
  );
}
