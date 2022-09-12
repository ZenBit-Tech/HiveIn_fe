/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import JobTitle, {
  Card,
  JobDescription,
} from "components/UI/WorkCard/WorkCardStyles";

interface IWorkCardProps {
  id: number;
  title: string;
  createdAt: string;
  description: string;
}

function WorkCard({ description, title, createdAt, id }: IWorkCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <JobTitle font_sz="1.5em">
        {title}
        <JobTitle font_sz="0.7em">{createdAt}</JobTitle>
      </JobTitle>
      <JobDescription>{description.slice(0, 100)}...</JobDescription>
    </Card>
  );
}

export default WorkCard;
