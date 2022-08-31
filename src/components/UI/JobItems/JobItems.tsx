import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "antd";
import LongMenu from "components/UI/DropdownMenus/LongMenu";
import JobTitle, {
  JobDescription,
  DeatailedInfo,
  RouterLink,
} from "components/UI/JobItems/JobItemsStyles";
import { useTranslation } from "react-i18next";

dayjs.extend(relativeTime);
interface Props {
  title: string;
  description: string;
  link: string;
  hourlyRate: number;
  publishDate: string;
}

function JobItems({
  title,
  description,
  link,
  hourlyRate,
  publishDate,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <JobTitle>
        <RouterLink to={link}>{title}</RouterLink>
        <DeatailedInfo>
          {t("MyJobs.currency")}
          {hourlyRate}
          {t("MyJobs.perHour")}
        </DeatailedInfo>
        <LongMenu />
      </JobTitle>
      <DeatailedInfo>{dayjs(publishDate).fromNow()}</DeatailedInfo>
      <JobDescription>{description}</JobDescription>
      <Divider />
    </>
  );
}

export default JobItems;
