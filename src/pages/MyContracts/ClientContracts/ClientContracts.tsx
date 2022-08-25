import LinkButton from "components/UI/buttons/LinkButton/LinkButton";
import JobItem from "components/UI/JobItem/JobItem";
import useAuth from "hooks/useAuth";
import PageContainer, {
  Header,
  JobPosting,
  NameText,
  Section,
  TitleText,
} from "pages/MyContracts/ClientContracts/ClientContractsStyles";
import { useTranslation } from "react-i18next";
import { SEARCH_WORK_ROUTE } from "utils/routeConsts";

const jobPosts: any[] | undefined = [
  { id: "1", title: "Test1", description: "test" },
  { id: "2", title: "Test2", description: "test2" },
];

function ClientContracts() {
  const { email } = useAuth();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Header>
        <TitleText font_sz="2.5em" pd="20px" pd_bottom="5%">
          {t("MyJobs.subTitle")}
          <NameText>{email}</NameText>
        </TitleText>
        <LinkButton link={SEARCH_WORK_ROUTE}>{t("MyJobs.postJob")}</LinkButton>
      </Header>
      <Section>
        <JobPosting>
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
        </JobPosting>
      </Section>
    </PageContainer>
  );
}

export default ClientContracts;
