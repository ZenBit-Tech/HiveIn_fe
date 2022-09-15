/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import JobTitle, {
  Card,
  JobDescription,
} from "components/UI/WorkCard/WorkCardStyles";
import dayjs from "dayjs";

export interface IWorkCardProps {
  id: number;
  title: string;
  createdAt: string;
  jobDescription: string;
}

function WorkCard({ jobDescription, title, createdAt, id }: IWorkCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <JobTitle font_sz="1.5em">
        {title}
        <JobTitle font_sz="0.7em">
          {createdAt ? dayjs(createdAt).fromNow() : t("NotFound.notFound")}
        </JobTitle>
      </JobTitle>
      <JobDescription>
        {jobDescription.split(" ").slice(0, 50).join(" ")}...
      </JobDescription>
    </Card>
  );
}

export default WorkCard;
