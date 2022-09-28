import { Pagination, Skeleton, Typography } from "antd";
import CandidateCard, {
  IFreelancer,
} from "components/CandidateCard/CandidateCard";
import SeeMoreLessButton from "components/SeeMoreLessButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import S from "components/TalentPart/styles";

export interface ITalentPart {
  freelancers: IFreelancer[];
  title: string;
  isSuccess: boolean;
  isLoading: boolean;
}

const freelancersPerPage = 6;
const freelancersPerRow = 3;

function TalentPart({ freelancers, title, isSuccess, isLoading }: ITalentPart) {
  const [showAllFreelancers, setShowAllFreelancers] = useState(false);

  const [page, setPage] = useState(1);

  const { t } = useTranslation();

  const { Title } = Typography;
  return (
    <S.Area>
      <S.TitleContainer>
        <Title level={2} id={title}>
          {t(title)}
        </Title>
        <SeeMoreLessButton
          isShowAll={!showAllFreelancers}
          changeShowAll={() => setShowAllFreelancers(!showAllFreelancers)}
        />
      </S.TitleContainer>
      <S.Box>
        {isSuccess && freelancers.length === 0 && (
          <S.EmptyBox description={t("Talent.noResult")} />
        )}
        {isLoading &&
          Array(...Array(freelancersPerRow)).map(() => <Skeleton active />)}
        {isSuccess &&
          freelancers
            .slice(
              showAllFreelancers ? (page - 1) * freelancersPerPage : 0,
              showAllFreelancers ? page * freelancersPerPage : freelancersPerRow
            )
            .map((freelancer: IFreelancer) => (
              <CandidateCard {...freelancer} />
            ))}
      </S.Box>
      {isSuccess && showAllFreelancers && (
        <Pagination
          hideOnSinglePage
          pageSize={freelancersPerPage}
          total={freelancers.length}
          onChange={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      )}
    </S.Area>
  );
}

export default TalentPart;
