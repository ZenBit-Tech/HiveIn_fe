import { Col, Empty, Pagination, Row, Typography } from "antd";
import CandidateCard, { IFreelancer } from "components/CandidateCard";
import DiscoverFilterForm from "components/DiscoverFilterForm";
import SeeMoreLessButton from "components/SeeMoreLessButton";
import { RefObject, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import S from "./styles";

function Talent() {
  const foundCandidates: IFreelancer[] = [
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
  ];
  const recentlyViewedCandidates: IFreelancer[] = [
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
    {
      photoUrl: "https://joeschmoe.io/api/v1/random",
      jobPosition: "Frontend developer 1",
      rate: 300,
      link: "wfefwef/wef",
    },
  ];

  const [foundCandidatesShowAll, setFoundCandidatesShowAll] = useState(false);
  const [recentlyViewedCandidatesShowAll, setRecentlyViewedCandidatesShowAll] =
    useState(false);

  const [savedCandidatesShowAll, setSavedCandidatesShowAll] = useState(false);
  const [hiresCandidatesShowAll, setHiresCandidatesShowAll] = useState(false);

  const [active, setActive] = useState("Talent.discover");

  const [discoverPage, setDiscoverPage] = useState(1);

  const discover = useRef<HTMLInputElement>(null);
  const savedTalent = useRef<HTMLInputElement>(null);
  const yourHires = useRef<HTMLInputElement>(null);
  const recentlyViewed = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();
  const { Title } = Typography;

  const talentBarButtons: {
    ref: RefObject<HTMLInputElement>;
    title: string;
  }[] = [
    {
      title: "Talent.discover",
      ref: discover,
    },
    {
      title: "Talent.savedTalent",
      ref: savedTalent,
    },
    {
      title: "Talent.yourHires",
      ref: yourHires,
    },
    {
      title: "Talent.recentlyViewed",
      ref: recentlyViewed,
    },
  ];

  return (
    <>
      <S.LeftDiv>
        {talentBarButtons.map(({ title, ref }) => (
          <S.SButton
            onClick={() => {
              ref?.current?.scrollIntoView();
              setActive(title);
            }}
            underline={active === title ? "underline" : "none"}
          >
            {t(title)}
          </S.SButton>
        ))}
      </S.LeftDiv>
      <S.RightDiv>
        <h1>{t("Talent.title")}</h1>
        <DiscoverFilterForm />
        <S.Area>
          <S.TitleContainer>
            <Title level={4} ref={discover}>
              {t("Talent.foundCandidates")}
            </Title>
            <SeeMoreLessButton
              isShowAll={!foundCandidatesShowAll}
              changeShowAll={() =>
                setFoundCandidatesShowAll(!foundCandidatesShowAll)
              }
            />
          </S.TitleContainer>
          <S.Box>
            {foundCandidates.length === 0 && (
              <Col span={24}>
                <Empty description="No result" />
              </Col>
            )}
            {foundCandidates
              .slice(
                foundCandidatesShowAll ? (discoverPage - 1) * 12 : 0,
                foundCandidatesShowAll ? discoverPage * 12 : 3
              )
              .map((freelancer: IFreelancer) => (
                <CandidateCard {...freelancer} />
              ))}
            {foundCandidatesShowAll && (
              <Pagination
                hideOnSinglePage
                pageSize={12}
                total={foundCandidates.length}
                onChange={(page) => {
                  setDiscoverPage(page);
                }}
              />
            )}
          </S.Box>
        </S.Area>

        <Row style={{ margin: 20 }}>
          <Col span={21}>
            <h2 ref={savedTalent}>{t("Talent.savedTalent")}</h2>
          </Col>
          <Col span={3}>
            <SeeMoreLessButton
              isShowAll={!savedCandidatesShowAll}
              changeShowAll={() =>
                setSavedCandidatesShowAll(!savedCandidatesShowAll)
              }
            />
          </Col>
        </Row>
        <Row gutter={[16, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
          {recentlyViewedCandidates
            .slice(0, savedCandidatesShowAll ? undefined : 4)
            .map((freelancer) => (
              <Col xl={6} lg={8} sm={12} key={freelancer.rate}>
                <CandidateCard {...freelancer} />
              </Col>
            ))}
        </Row>

        <Row style={{ margin: 20 }}>
          <Col span={21}>
            <h2 ref={yourHires}>{t("Talent.yourHires")}</h2>
          </Col>
          <Col span={3}>
            <SeeMoreLessButton
              isShowAll={!hiresCandidatesShowAll}
              changeShowAll={() =>
                setHiresCandidatesShowAll(!hiresCandidatesShowAll)
              }
            />
          </Col>
        </Row>
        <Row gutter={[16, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
          {recentlyViewedCandidates
            .slice(0, hiresCandidatesShowAll ? undefined : 4)
            .map((freelancer) => (
              <Col xl={6} lg={8} sm={12} key={freelancer.rate}>
                <CandidateCard {...freelancer} />
              </Col>
            ))}
        </Row>

        <Row style={{ margin: 20 }}>
          <Col span={21}>
            <h2 ref={recentlyViewed}>{t("Talent.recentlyViewed")}</h2>
          </Col>
          <Col span={3}>
            <SeeMoreLessButton
              isShowAll={!recentlyViewedCandidatesShowAll}
              changeShowAll={() =>
                setRecentlyViewedCandidatesShowAll(
                  !recentlyViewedCandidatesShowAll
                )
              }
            />
          </Col>
        </Row>
        <Row gutter={[16, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
          {recentlyViewedCandidates
            .slice(0, recentlyViewedCandidatesShowAll ? undefined : 4)
            .map((freelancer) => (
              <Col xl={6} lg={8} sm={12} key={freelancer.rate}>
                <CandidateCard {...freelancer} />
              </Col>
            ))}
        </Row>
      </S.RightDiv>
    </>
  );
}

export default Talent;
