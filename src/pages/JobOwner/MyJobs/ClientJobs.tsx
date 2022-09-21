import { useState } from "react";
import { Skeleton, Switch, Typography } from "antd";
import LinkButton from "components/UI/buttons/LinkButton/LinkButton";
import JobItem from "components/UI/JobItems/JobItems";
import useAuth from "hooks/useAuth";
import PageContainer, {
  Card,
  DivContainer,
  Filter,
  Header,
  NameText,
  Section,
  StyledPagination,
  TitleText,
} from "pages/JobOwner/MyJobs/ClientJobsStyles";
import { useTranslation } from "react-i18next";
import { useGetOwnJobPostsQuery } from "services/jobPosts/setJobPostsAPI";
import { CREATE_JOB_POST } from "utils/consts/routeConsts";
import { POSTS_PER_PAGE as PPG } from "utils/consts/jobListConsts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { toggleIsDraft } from "store/slices/isDraftSlice";

const { Title } = Typography;

function ClientJobs() {
  const isDraft = useSelector((state: RootState) => state.isDraft);
  const dispatch = useDispatch();

  const { email } = useAuth();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(PPG);

  const {
    data: jobPosts,
    isLoading,
    isSuccess,
  } = useGetOwnJobPostsQuery(isDraft);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <PageContainer>
      <Header>
        <div>
          <Title level={3}>{t("MyJobs.subTitle")}</Title>
          <NameText>{email}</NameText>
        </div>
        <LinkButton link={CREATE_JOB_POST}>{t("MyJobs.postJob")}</LinkButton>
      </Header>
      <Section>
        <Card>
          <TitleText font_sz="1.5em" pd="5px" pd_bottom="5%">
            {t("MyJobs.allPostings")}
            <Filter>
              {t("MyJobs.draft?")}
              <Switch
                checked={isDraft}
                onChange={() => dispatch(toggleIsDraft())}
              />
            </Filter>
          </TitleText>
          {isLoading && (
            <DivContainer>
              <Skeleton active paragraph={{ rows: 4 }} />
            </DivContainer>
          )}

          {isSuccess && !jobPosts?.length ? (
            t("MyJobs.nothingToShow")
          ) : (
            <>
              {jobPosts?.slice(firstPostIndex, lastPostIndex).map((jobPost) => (
                <JobItem
                  key={jobPost?.id}
                  link={jobPost?.id.toString()}
                  {...jobPost}
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
                total={jobPosts?.length}
                pageSizeOptions={[PPG, PPG * 2, PPG * 3]}
              />
            </>
          )}
        </Card>
      </Section>
    </PageContainer>
  );
}

export default ClientJobs;
