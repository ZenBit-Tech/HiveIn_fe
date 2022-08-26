import { Divider } from "antd";
import LongMenu from "components/UI/DropdownMenus/LongMenu";
import JobTitle, {
  JobDescription,
  RouterLink,
} from "components/UI/JobItems/JobItemsStyles";

interface Props {
  title: string;
  description: string;
  link: string;
}

function JobItems({ title, description, link }: Props) {
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

export default JobItems;
