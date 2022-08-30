import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "antd";
import LongMenu from "components/UI/DropdownMenus/LongMenu";
import JobTitle, {
  JobDescription,
  DeatailedInfo,
  RouterLink,
} from "components/UI/JobItems/JobItemsStyles";

dayjs.extend(relativeTime);
interface Props {
  title: string;
  description: string;
  link: string;
  hourlyRate: string;
  publishDate: string;
}

function JobItems({
  title,
  description,
  link,
  hourlyRate,
  publishDate,
}: Props) {
  return (
    <>
      <JobTitle>
        <RouterLink to={link}>{title}</RouterLink>
        <DeatailedInfo>${hourlyRate}/hour</DeatailedInfo>
        <LongMenu />
      </JobTitle>
      <DeatailedInfo>{dayjs(publishDate).fromNow()}</DeatailedInfo>
      <JobDescription>{description}</JobDescription>
      <Divider />
    </>
  );
}

export default JobItems;
