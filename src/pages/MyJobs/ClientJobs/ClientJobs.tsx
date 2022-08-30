import { Skeleton } from "antd";
import LinkButton from "components/UI/buttons/LinkButton/LinkButton";
import JobItem from "components/UI/JobItems/JobItems";
import useAuth from "hooks/useAuth";
import PageContainer, {
  Header,
  Card,
  NameText,
  Section,
  TitleText,
} from "pages/MyJobs/ClientJobs/ClientJobsStyles";
import { useTranslation } from "react-i18next";
import { useGetJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import { SEARCH_WORK_ROUTE } from "utils/routeConsts";

function ClientJobs() {
  const { email } = useAuth();
  const { t } = useTranslation();

  const { data: jobPosts, isLoading, isSuccess } = useGetJobPostQuery();

  return (
    <PageContainer>
      <Header>
        <TitleText>
          {t("MyJobs.subTitle")}
          <NameText>{email}</NameText>
        </TitleText>
        <LinkButton link={SEARCH_WORK_ROUTE}>{t("MyJobs.postJob")}</LinkButton>
      </Header>
      <Section>
        <Card>
          <TitleText font_sz="1.5em" pd="5px" pd_bottom="10%">
            {t("MyJobs.allPostings")}
          </TitleText>

          {isLoading ? <Skeleton avatar paragraph={{ rows: 4 }} /> : ""}

          {isSuccess &&
            jobPosts.map(({ id, title, jobDescription }) => (
              <JobItem
                key={id}
                title={title!}
                description={jobDescription!}
                link={id!.toString()}
              />
            ))}

          {!isLoading && !jobPosts ? t("MyJobs.nothingToShow") : ""}
        </Card>
      </Section>
    </PageContainer>
  );
}

export default ClientJobs;
