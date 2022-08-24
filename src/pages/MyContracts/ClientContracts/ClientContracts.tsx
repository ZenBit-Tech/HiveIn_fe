import PageContainer, {
  Filter,
  Section,
  JobList,
  TitleText,
  ContentBox,
} from "pages/MyContracts/ClientContracts/ClientContractsStyles";

function ClientContracts() {
  return (
    <PageContainer>
      <Section>
        <TitleText level={3}>My Contracts</TitleText>
        <ContentBox>
          <Filter>My filter</Filter>
          <JobList>Hello</JobList>
        </ContentBox>
      </Section>
    </PageContainer>
  );
}

export default ClientContracts;
