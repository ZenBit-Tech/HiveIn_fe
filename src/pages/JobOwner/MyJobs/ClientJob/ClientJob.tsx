import { useParams } from "react-router-dom";
import PageContainer from "pages/JobOwner/MyJobs/ClientJobsStyles";
import JobItem from "components/UI/JobItem/JobItem";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";

dayjs.extend(relativeTime);

function ClientJob(): JSX.Element {
  const { jobId } = useParams();
  const { data: jobPost, refetch } = useGetOneJobPostQuery({
    id: Number(jobId),
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <PageContainer>
      {jobPost && <JobItem refetch={refetch} {...jobPost} />}
    </PageContainer>
  );
}

export default ClientJob;
