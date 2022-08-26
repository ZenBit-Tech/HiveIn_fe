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
import { SEARCH_WORK_ROUTE } from "utils/routeConsts";

// Testing without backend connected
const jobPosts: any[] | undefined = [
  { id: "1", title: "Freelancing website", description: "Description" },
  { id: "2", title: "Landing page design", description: "Description" },
];

function ClientJobs() {
  const { email } = useAuth();
  const { t } = useTranslation();

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
          {jobPosts?.map(({ id, title, description }) => (
            <JobItem
              key={id}
              title={title}
              description={description}
              link={id}
            />
          ))}

          {jobPosts ? "" : t("MyJobs.nothingToShow")}
        </Card>
      </Section>
    </PageContainer>
  );
}

export default ClientJobs;
