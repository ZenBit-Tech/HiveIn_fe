import { Divider, Typography } from "antd";
import { IFreelancer } from "components/CandidateCard/CandidateCard";
import DiscoverFilterForm from "components/DiscoverFilterForm/Index";
import TalentPart from "components/TalentPart/TalentPart";
import useJwtDecoder from "hooks/useJwtDecoder";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetHiredFreelancersQuery,
  useGetRecentlyViewedFreelancersQuery,
  useGetSavedFreelancersQuery,
} from "services/jobOwner/talentAPI";
import S from "./styles";

function Talent() {
  const foundCandidates: IFreelancer[] = [
    {
      saved: true,
      userId: 1,
      user: {
        avatarURL: "https://joeschmoe.io/api/v1/random",
      },
      position: "Frontend developer 1",
      rate: 300,
    },
  ];

  const [active, setActive] = useState("Talent.discover");

  const { t } = useTranslation();
  const { Title } = Typography;

  const { sub } = useJwtDecoder();
  const savedFreelancers = useGetSavedFreelancersQuery(Number(sub!));
  const hiredFreelancers = useGetHiredFreelancersQuery(Number(sub!));
  const recentlyViewedFreelancers = useGetRecentlyViewedFreelancersQuery(
    Number(sub!)
  );

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
      freelancers: savedFreelancers.data ?? [],
    },
    {
      title: "Talent.yourHires",
      freelancers: hiredFreelancers.data ?? [],
    },
    {
      title: "Talent.recentlyViewed",
      freelancers: recentlyViewedFreelancers.data ?? [],
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
