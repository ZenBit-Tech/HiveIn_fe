import { Divider } from "antd";
import LongMenu from "components/UI/JobItem/DropdownMenu";
import JobTitle, {
  JobDescription,
  RouterLink,
} from "components/UI/JobItem/JobItemStyles";

interface Props {
  title: string;
  description: string;
  link: string;
}

function JobItem({ title, description, link }: Props) {
  return (
    <>
      <JobTitle>
        <RouterLink to={link}>{title}</RouterLink>
        <LongMenu />
      </JobTitle>
      <JobDescription>{description}</JobDescription>
      <Divider />
    </>
  );
}

export default JobItem;
