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
import { IFreelancer } from "../../../services/profileInfo/typesDef";
import FreelancerInfoDrawer from "../../../components/UI/drawers/FreelancerInfoDrawer/FreelancerInfoDrawer";
import { useGetFreelancerByIdQuery } from "../../../services/freelancer/freelancerAPI";

function Talent() {
  const [active, setActive] = useState("Talent.discover");

  const [userId, setUserId] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useGetFreelancerByIdQuery({ id: userId });

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
  const freelancer: IFreelancer = {
    id: 2,
    categoryId: 1,
    education: [
      {
        city: "Poltava",
        id: 1,
        startDate: new Date(),
        endDate: new Date(),
        description: "do something",
        degree: "bachelor",
        school: "PPC NTU HPI",
      },
      {
        city: "Poltava",
        id: 2,
        startDate: new Date(),
        endDate: new Date(),
        description: "do something",
        degree: "pupil",
        school: "Poltava school №38",
      },
    ],
    englishLevel: "intermediate",
    experience: [
      {
        city: "Remote",
        id: 1,
        startDate: new Date(),
        endDate: new Date(),
        description: "do something",
        jobTitle: "frontend developer",
        company: "Richland",
      },
    ],
    position: "Frontend developer",
    rate: "100",
    skills: [
      {
        id: 1,
        name: "IT",
      },
      {
        id: 2,
        name: "full stack",
      },
      {
        id: 3,
        name: "smm",
      },
      {
        id: 4,
        name: "copyrighting",
      },
      {
        id: 5,
        name: "consulting",
      },
    ],
    userId: 1,
    user: {
      id: "1",
      email: "milkav06062003@gmail.com",
      firstName: "Vladislav",
      lastName: "Milka",
      phone: "+380958182382",
      description:
        "wpofjwe wepfowejf wepfoje wfwepojf wefpojwe fwepfojw efpojwe.",
      avatarURL:
        "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png",
    },
  };
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
        <FreelancerInfoDrawer
          visible={false}
          onClose={() => {}}
          {...freelancer}
        />
        <Title level={1}>{t("Talent.title")}</Title>
        <DiscoverFilterForm />
        {talentPart.map(({ title, freelancers }) => (
          <>
            <TalentPart
              setUserId={setUserId}
              freelancers={freelancers}
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
