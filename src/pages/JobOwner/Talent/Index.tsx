import { Divider, Typography } from "antd";
import DiscoverFilterForm from "components/DiscoverFilterForm";
import TalentPart, { ITalentPart } from "components/TalentPart/TalentPart";
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

function Talent() {
  const [active, setActive] = useState("Talent.discover");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userId, setUserId] = useState<number>(1);

  const { data, isFetching } = useGetFreelancerByIdQuery({
    id: userId,
  });

  const { t } = useTranslation();
  const { Title } = Typography;

  const {
    data: savedFreelancers,
    isSuccess: isSaveSuccess,
    isLoading: isSaveLoading,
  } = useGetSavedFreelancersQuery();
  const {
    data: hiredFreelancers,
    isSuccess: isHireSuccess,
    isLoading: isHireLoading,
  } = useGetHiredFreelancersQuery();
  const {
    data: viewedFreelancers,
    isSuccess: isViewSuccess,
    isLoading: isViewLoading,
  } = useGetRecentlyViewedFreelancersQuery();

  const talentPart: ITalentPart[] = [
    {
      title: "Talent.savedTalent",
      freelancers: savedFreelancers ?? [],
      isSuccess: isSaveSuccess,
      isLoading: isSaveLoading,
    },
    {
      title: "Talent.yourHires",
      freelancers: hiredFreelancers ?? [],
      isSuccess: isHireSuccess,
      isLoading: isHireLoading,
    },
    {
      title: "Talent.recentlyViewed",
      freelancers: viewedFreelancers ?? [],
      isSuccess: isViewSuccess,
      isLoading: isViewLoading,
    },
  ];

  return (
    <>
      <S.LeftDiv>
        {talentPart.map(({ title }) => (
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
        {talentPart.map(({ title, freelancers }) => (
          <>
            <TalentPart
              key={title}
              setUserId={setUserId}
              freelancers={freelancers}
              setIsModalOpen={setIsModalOpen}
              title={title}
              isSuccess={isSaveSuccess}
              isLoading={isSaveLoading}
            />
            <Divider />
          </>
        ))}
      </S.RightDiv>
    </>
  );
}

export default Talent;
