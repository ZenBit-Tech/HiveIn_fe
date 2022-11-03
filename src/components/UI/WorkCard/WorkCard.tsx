import { useTranslation } from "react-i18next";
import JobTitle, {
  Card,
  JobDescription,
} from "components/UI/WorkCard/WorkCardStyles";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";
import SearchWorkDrawer from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawer";

export interface IWorkCardProps {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  jobDescription: string;
}

function WorkCard({
  jobDescription,
  title,
  createdAt,
  id,
  updatedAt,
}: IWorkCardProps) {
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
            <div>
              <div>
                {t("SearchWork.postedAt")}
                {createdAt
                  ? dayjs(createdAt).fromNow()
                  : t("NotFound.notFound")}
              </div>
              <div>
                {t("SearchWork.updatedAt")}
                {updatedAt
                  ? dayjs(updatedAt).fromNow()
                  : t("NotFound.notFound")}
              </div>
            </div>
          </JobTitle>
        </JobTitle>
        <JobDescription>{jobDescription}</JobDescription>
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
