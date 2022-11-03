import { Divider, Typography } from "antd";
import DiscoverFilterForm from "components/DiscoverFilterForm";
import TalentPart, { ITalentPartData } from "components/TalentPart/TalentPart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetHiredFreelancersQuery,
  useGetRecentlyViewedFreelancersQuery,
  useGetSavedFreelancersQuery,
} from "services/jobOwner/talentAPI";
import S from "pages/JobOwner/Talent/styles";
import FreelancerInfoDrawer from "components/UI/drawers/FreelancerInfoDrawer/FreelancerInfoDrawer";
import { useGetFreelancerByIdQuery } from "services/freelancer/freelancerAPI";

const talentPartTitles: string[] = [
  "Talent.savedTalent",
  "Talent.yourHires",
  "Talent.recentlyViewed",
];

const { Title } = Typography;

function Talent() {
  const [active, setActive] = useState("Talent.discover");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(1);

  const { data, isFetching } = useGetFreelancerByIdQuery({
    id: userId,
  });

  const { t } = useTranslation();

  const saved = useGetSavedFreelancersQuery();
  const hired = useGetHiredFreelancersQuery();
  const viewed = useGetRecentlyViewedFreelancersQuery();

  const talentPartsData = [saved, hired, viewed];

  return (
    <>
      <S.LeftDiv>
        {talentPartTitles.map((title) => (
          <S.SButton
            key={title}
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
        {data && !isFetching && (
          <FreelancerInfoDrawer
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            {...data!}
          />
        )}

        <Title level={1}>{t("Talent.title")}</Title>
        <DiscoverFilterForm
          setIsModalOpen={setIsModalOpen}
          setUserId={setUserId!}
        />
        {talentPartTitles.map((title, index) => (
          <>
            <TalentPart
              key={title}
              setUserId={setUserId}
              data={talentPartsData[index] as unknown as ITalentPartData}
              setIsModalOpen={setIsModalOpen}
              title={title}
            />
            <Divider />
          </>
        ))}
      </S.RightDiv>
    </>
  );
}

export default Talent;
