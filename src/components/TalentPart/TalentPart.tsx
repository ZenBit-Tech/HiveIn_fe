import { Pagination, Skeleton, Typography } from "antd";
import SeeMoreLessButton from "components/SeeMoreLessButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import S from "components/TalentPart/styles";
import FreelancerCard, {
  IFreelancerSaved,
} from "../FreelancerCard/FreelancerCard";

export interface ITalentPart {
  freelancers: IFreelancerSaved[];
  setUserId?: (id: number) => void;
  title: string;
  isSuccess: boolean;
  isLoading: boolean;
}

const freelancersPerPage = 12;
const freelancersPerRow = 3;

function TalentPart({
  freelancers,
  title,
  isSuccess,
  isLoading,
  setUserId,
}: ITalentPart) {
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
            .map((freelancer) => (
              <FreelancerCard setUserId={setUserId!} {...freelancer} />
            ))}
        {isSuccess && showAllFreelancers && (
          <Pagination
            hideOnSinglePage
            pageSize={12}
            total={freelancers.length}
            onChange={(pageNumber) => {
              setPage(pageNumber);
            }}
          />
        )}
      </S.Box>
    </S.Area>
  );
}

export default TalentPart;
