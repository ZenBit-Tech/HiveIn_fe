import { useState, useEffect } from "react";
import { Skeleton } from "antd";
import PageContainer, {
  Header,
  WorkSection,
  TitleText,
  StyledPagination,
  FilterSection,
  EmptyBox,
} from "pages/Freelancer/SearchWork/styles";
import { useTranslation } from "react-i18next";
import { useFilterJobPostsQuery } from "services/jobPosts/setJobPostsAPI";
import WorkCard, { IWorkCardProps } from "components/UI/WorkCard/WorkCard";
import SearchWorkForm from "components/UI/SearchWorkForm";
import { useGetOwnProfileQuery } from "services/profileInfo/profileInfoAPI";
import { ISearchWorkFilters } from "components/UI/SearchWorkForm/typesDef";

const workPerPage = 10;
const defaultPage = 1;

function SearchWork() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [postsPerPage, setPostsPerPage] = useState(workPerPage);

  const { data: freelancerInfo, isSuccess: isUserInformationSuccess } =
    useGetOwnProfileQuery();

  const [filters, setFilters] = useState<ISearchWorkFilters>({});

  const { data, isSuccess, isLoading } = useFilterJobPostsQuery({
    ...filters,
  });

  const [jobs, setJobs] = useState<IWorkCardProps[]>();
  const [totalCountJobs, setTotalCountJobs] = useState(data?.totalCount);

  useEffect(() => {
    setJobs(data?.data);
    setTotalCountJobs(data?.totalCount);
  }, [isSuccess, isLoading, data]);

  useEffect(() => {
    setFilters({
      category: freelancerInfo?.categoryId,
      skills: freelancerInfo?.skills ? freelancerInfo?.skills : [],
    });
  }, [
    freelancerInfo?.categoryId,
    freelancerInfo?.skills,
    isUserInformationSuccess,
  ]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <PageContainer>
      <Header>
        <TitleText>{t("SearchWork.subTitle")}</TitleText>
      </Header>
      <WorkSection>
        {isLoading && <Skeleton active paragraph={{ rows: 4 }} />}
        {isSuccess && totalCountJobs === 0 ? (
          <EmptyBox description={t("SearchWork.noResult")} />
        ) : (
          <>
            {jobs
              ?.slice(firstPostIndex, lastPostIndex)
              .map(({ id, title, jobDescription, createdAt }) => (
                <WorkCard
                  key={id}
                  title={title!}
                  jobDescription={jobDescription!}
                  id={id}
                  createdAt={createdAt!}
                />
              ))}

            <StyledPagination
              showSizeChanger
              hideOnSinglePage
              onShowSizeChange={(_page, pageSize) => setPostsPerPage(pageSize)}
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              pageSize={postsPerPage}
              total={totalCountJobs}
            />
          </>
        )}
      </WorkSection>
      <FilterSection>
        {isUserInformationSuccess && filters.category && filters.skills && (
          <SearchWorkForm filters={filters} setFilters={setFilters} />
        )}
      </FilterSection>
    </PageContainer>
  );
}

export default SearchWork;
