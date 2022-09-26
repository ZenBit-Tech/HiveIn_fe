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
import { Element, scroller } from "react-scroll";

const workPerPage = 10;
const defaultPage = 1;

function SearchWork() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [postsPerPage, setPostsPerPage] = useState<number>(workPerPage);

  const { data: freelancerInfo, isSuccess: isUserInformationSuccess } =
    useGetOwnProfileQuery();

  const [filters, setFilters] = useState<ISearchWorkFilters>({});

  const { data, isSuccess, isLoading, isFetching } = useFilterJobPostsQuery({
    ...filters,
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });

  const [jobs, setJobs] = useState<IWorkCardProps[]>();
  const [totalCountJobs, setTotalCountJobs] = useState(data?.totalCount);

  const titleElementName = "title-element";

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setJobs(data?.data);
      setTotalCountJobs(data?.totalCount);
    }
  }, [isSuccess, data, isFetching]);

  useEffect(() => {
    setFilters({
      category: freelancerInfo?.categoryId,
      skills: freelancerInfo?.skills ? freelancerInfo?.skills : [],
    });
  }, [isUserInformationSuccess]);

  useEffect(() => {
    scroller.scrollTo(titleElementName, {
      duration: 800,
      smooth: true,
    });
  }, [isSuccess]);

  const setDefaultPage = () => {
    setCurrentPage(defaultPage);
  };
  return (
    <PageContainer>
      <Header>
        <Element name={titleElementName}>
          <TitleText>{t("SearchWork.subTitle")}</TitleText>
        </Element>
      </Header>
      <WorkSection>
        {(isLoading || isFetching) && (
          <Skeleton active paragraph={{ rows: 4 }} />
        )}
        {isSuccess &&
          !isFetching &&
          (totalCountJobs === 0 ? (
            <EmptyBox description={t("SearchWork.noResult")} />
          ) : (
            <>
              {jobs?.map(({ id, title, jobDescription, createdAt }) => (
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
                onShowSizeChange={(_page, pageSize) =>
                  setPostsPerPage(pageSize)
                }
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                pageSize={postsPerPage}
                total={totalCountJobs}
              />
            </>
          ))}
      </WorkSection>
      <FilterSection>
        {isUserInformationSuccess && filters.category && filters.skills && (
          <SearchWorkForm
            filters={filters}
            setFilters={setFilters}
            setDefaultPage={setDefaultPage}
          />
        )}
      </FilterSection>
    </PageContainer>
  );
}

export default SearchWork;
