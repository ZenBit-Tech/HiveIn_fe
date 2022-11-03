import { Pagination, Skeleton, Typography } from "antd";
import SeeMoreLessButton from "components/SeeMoreLessButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import S from "components/TalentPart/styles";
import FreelancerCard, {
  IFreelancerSaved,
} from "components/FreelancerCard/FreelancerCard";
import {
  FREELANCERS_PER_PAGE,
  FREELANCERS_PER_ROW,
} from "utils/consts/numberConsts";

export interface ITalentPartData {
  data: IFreelancerSaved[];
  isSuccess: boolean;
  isLoading: boolean;
}

export interface ITalentPart {
  title: string;
  data: ITalentPartData;
}

export interface ITalentPartProps extends ITalentPart {
  setUserId: (id: number) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

function TalentPart({
  data: { data: freelancers, isSuccess, isLoading },
  title,
  setUserId,
  setIsModalOpen,
}: ITalentPartProps) {
  const [showAllFreelancers, setShowAllFreelancers] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);

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
          Array(...Array(FREELANCERS_PER_ROW)).map((id) => (
            <Skeleton key={id} active />
          ))}
        {isSuccess &&
          freelancers
            .slice(
              showAllFreelancers ? (page - 1) * FREELANCERS_PER_PAGE : 0,
              showAllFreelancers
                ? page * FREELANCERS_PER_PAGE
                : FREELANCERS_PER_ROW
            )
            .map((freelancer) => (
              <FreelancerCard
                setIsModalOpen={setIsModalOpen}
                key={freelancer.id}
                setUserId={setUserId!}
                {...freelancer}
              />
            ))}
      </S.Box>
      {isSuccess && showAllFreelancers && (
        <Pagination
          hideOnSinglePage
          pageSize={FREELANCERS_PER_PAGE}
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
