import { Col, Empty, Pagination, Typography } from "antd";
import CandidateCard, {
  IFreelancer,
} from "components/CandidateCard/CandidateCard";
import SeeMoreLessButton from "components/SeeMoreLessButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import S from "./styles";

interface ITalentPart {
  freelancers: IFreelancer[];
  title: string;
  id: string;
}

const freelancersPerPage = 12;
const freelancersPerRow = 3;

function TalentPart({ freelancers, title, id }: ITalentPart) {
  const [showAllFreelancers, setShowAllFreelancers] = useState(false);

  const [page, setPage] = useState(1);

  const { t } = useTranslation();

  const { Title } = Typography;
  return (
    <S.Area>
      <S.TitleContainer>
        <Title level={2} id={id}>
          {t(title)}
        </Title>
        <SeeMoreLessButton
          isShowAll={!showAllFreelancers}
          changeShowAll={() => setShowAllFreelancers(!showAllFreelancers)}
        />
      </S.TitleContainer>
      <S.Box>
        {freelancers.length === 0 && (
          <Col span={24}>
            <Empty description="No result" />
          </Col>
        )}
        {freelancers
          .slice(
            showAllFreelancers ? (page - 1) * freelancersPerPage : 0,
            showAllFreelancers ? page * freelancersPerPage : freelancersPerRow
          )
          .map((freelancer: IFreelancer) => (
            <CandidateCard {...freelancer} />
          ))}
        {showAllFreelancers && (
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
