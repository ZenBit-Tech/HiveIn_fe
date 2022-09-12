import { useState } from "react";
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
import { useGetOwnJobPostsQuery } from "services/jobPosts/setJobPostsAPI";
import { POSTS_PER_PAGE as PPG } from "utils/jobListConsts";
import WorkCard from "components/UI/WorkCard/WorkCard";
import SearchWorkForm from "../../../components/UI/SearchWorkForm";

function SearchWork() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(PPG);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: jobs, isLoading, isSuccess } = useGetOwnJobPostsQuery();

  interface IWorkCard {
    id: number;
    title: string;
    createdAt: string;
    description: string;
  }

  const jobPosts: IWorkCard[] = [
    {
      id: 214,
      title: "Frontend developer",
      createdAt: "24.24.2424",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2123,
      title: "Backend developer",
      createdAt: "24.24.2022",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
  ];

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <PageContainer>
      <Header>
        <TitleText>{t("SearchWork.subTitle")}</TitleText>
      </Header>
      <WorkSection>
        {isLoading && <Skeleton active paragraph={{ rows: 4 }} />}
        {/* {isSuccess && */}
        {!jobPosts?.length ? (
          <EmptyBox description={t("SearchWork.noResult")} />
        ) : (
          <>
            {jobPosts
              ?.slice(firstPostIndex, lastPostIndex)
              .map(({ id, title, description, createdAt }) => (
                <WorkCard
                  key={id}
                  title={title!}
                  description={description!}
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
              total={jobPosts?.length}
              pageSizeOptions={[PPG, PPG * 2, PPG * 3]}
            />
          </>
        )}
      </WorkSection>
      <FilterSection>
        <SearchWorkForm />
      </FilterSection>
    </PageContainer>
  );
}

export default SearchWork;
