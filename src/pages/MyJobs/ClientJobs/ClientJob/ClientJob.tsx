// import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageContainer, {
  Section,
  Card,
  Header,
  TitleText,
} from "pages/MyJobs/ClientJobs/ClientJobsStyles";
import JobItem from "components/UI/JobItem/JobItem";

const jobPost = {
  title: "Freelancing website",
  description: "Description",
  publicationDate: "December 16",
  payout: "$1500",
  skills: ["JavaScript", "Python", "MySQL"],
};

function ClientJob(): JSX.Element {
  const { jobId } = useParams();
  // const { t } = useTranslation();

  const { title, description, publicationDate, payout, skills } = jobPost;

  return (
    <PageContainer>
      <Header wd="70%">
        <TitleText font_sz="2.5em" pd="20px" pd_bottom="5%">
          {title} {jobId}
          <TitleText font_sz="0.4em" pd="5px" pd_bottom="1%">
            {publicationDate}
          </TitleText>
        </TitleText>
      </Header>
      <Section wd="70%">
        <Card>
          <JobItem description={description} payout={payout} skills={skills} />
        </Card>
      </Section>
    </PageContainer>
  );
}

export default ClientJob;
