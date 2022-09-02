import { Divider, Typography } from "antd";
import { IFreelancer } from "components/CandidateCard/CandidateCard";
import DiscoverFilterForm from "components/DiscoverFilterForm/Index";
import TalentPart from "components/TalentPart/TalentPart";
import { useState } from "react";
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
  const recentlyViewedCandidates = [
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

  const [active, setActive] = useState("Talent.discover");

  const { t } = useTranslation();
  const { Title } = Typography;

  const talentPart: {
    title: string;
    freelancers: IFreelancer[];
  }[] = [
    {
      title: "Talent.discover",
      freelancers: foundCandidates,
    },
    {
      title: "Talent.savedTalent",
      freelancers: foundCandidates,
    },
    {
      title: "Talent.yourHires",
      freelancers: recentlyViewedCandidates,
    },
    {
      title: "Talent.recentlyViewed",
      freelancers: recentlyViewedCandidates,
    },
  ];

  return (
    <>
      <S.LeftDiv>
        {talentPart.map(({ title }) => (
          <S.SButton
            activeClass="active"
            to={title}
            spy
            smooth
            offset={-20}
            duration={500}
            onClick={() => {
              setActive(title);
            }}
            underline={active === title ? "underline" : "none"}
          >
            {t(title)}
          </S.SButton>
        ))}
      </S.LeftDiv>
      <S.RightDiv>
        <Title level={1}>{t("Talent.title")}</Title>
        <DiscoverFilterForm />
        {talentPart.map(({ title, freelancers }) => (
          <>
            <TalentPart id={title} freelancers={freelancers} title={title} />
            <Divider />
          </>
        ))}
      </S.RightDiv>
    </>
  );
}

export default Talent;
