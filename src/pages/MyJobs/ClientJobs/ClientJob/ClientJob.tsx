// import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageContainer, {
  Section,
  Card,
  Header,
  TitleText,
} from "pages/MyJobs/ClientJobs/ClientJobsStyles";
import JobItem from "components/UI/JobItem/JobItem";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import { useTranslation } from "react-i18next";
import { formatToStandardDate } from "utils/formatDateFunctions";

function ClientJob(): JSX.Element {
  const { jobId } = useParams();
  const { t } = useTranslation();
  const { data } = useGetOneJobPostQuery({
    id: Number(jobId),
  });

  return (
    <PageContainer>
      <Header wd="70%">
        <TitleText font_sz="2.5em" pd="20px" pd_bottom="5%">
          {data?.title || t("NotFound.notFound")}
          <TitleText font_sz="0.4em" pd="5px" pd_bottom="1%">
            {data?.createdAt
              ? formatToStandardDate(new Date(data?.createdAt))
              : t("NotFound.notFound")}
          </TitleText>
        </TitleText>
      </Header>
      <Section wd="70%">
        <Card>
          <JobItem
            description={data?.jobDescription || t("NotFound.notFound")}
            payout={String(data?.rate || t("NotFound.notFound"))}
            skills={data?.skills.map((item) => item.name) || [""]}
          />
        </Card>
      </Section>
    </PageContainer>
  );
}

export default ClientJob;
