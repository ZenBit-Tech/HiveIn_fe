/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import JobTitle, {
  Card,
  JobDescription,
} from "components/UI/WorkCard/WorkCardStyles";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import SearchWorkDrawer from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawer";
import { cutTextByWords } from "utils/functions/cutTextByWords";

export interface IWorkCardProps {
  id: number;
  title: string;
  createdAt: string;
  jobDescription: string;
}

const wordPerCard = 30;

function WorkCard({ jobDescription, title, createdAt, id }: IWorkCardProps) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { data, isSuccess } = useGetOneJobPostQuery({
    id,
  });

  return (
    <>
      <Card
        onClick={() => {
          setOpen(true);
        }}
      >
        <JobTitle font_sz="1.5em">
          {title}
          <JobTitle font_sz="0.7em">
            {createdAt ? dayjs(createdAt).fromNow() : t("NotFound.notFound")}
          </JobTitle>
        </JobTitle>
        <JobDescription>
          {cutTextByWords(jobDescription, wordPerCard)}
        </JobDescription>
      </Card>
      {isSuccess && (
        <SearchWorkDrawer
          visible={open}
          onClose={() => setOpen(false)}
          {...data}
        />
      )}
    </>
  );
}

export default WorkCard;
