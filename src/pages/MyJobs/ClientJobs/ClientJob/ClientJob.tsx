// import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageContainer, {
  Section,
  Card,
  Header,
  TitleText,
} from "pages/MyJobs/ClientJobs/ClientJobsStyles";
import JobItem from "components/UI/JobItem/JobItem";
import { useFetchDetailsQuery } from "services/jobs/jobs.api";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

function ClientJob(): JSX.Element {
  const { jobId } = useParams();
  const { t } = useTranslation();
  const { data } = useFetchDetailsQuery({
    id: Number(jobId),
  });

  return (
    <PageContainer>
      <Header wd="70%">
        <TitleText font_sz="2.5em" pd="20px" pd_bottom="5%">
          {data?.title || t("NotFound.notFound")} {jobId}
          <TitleText font_sz="0.4em" pd="5px" pd_bottom="1%">
            {data?.createdAt
              ? format(new Date(data?.createdAt), "dd/MM/yyyy")
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
