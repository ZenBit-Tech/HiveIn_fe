import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider } from "antd";
import LongMenu from "components/UI/DropdownMenus/LongMenu/LongMenu";
import JobTitle, {
  JobDescription,
  DeatailedInfo,
  RouterLink,
  ContractStatus,
} from "components/UI/JobItems/JobItemsStyles";
import { useTranslation } from "react-i18next";
import { ContractStatusEnum } from "utils/enums";

dayjs.extend(relativeTime);

interface IJobItemsProps {
  title: string;
  description: string;
  link: string;
  hourlyRate: number;
  publishDate: string;
  contractStatus: ContractStatusEnum;
  id: number;
}

function JobItems({
  title,
  description,
  link,
  hourlyRate,
  publishDate,
  contractStatus,
  id,
}: IJobItemsProps) {
  const { t } = useTranslation();

  return (
    <>
      <JobTitle>
        <RouterLink to={link}>{title}</RouterLink>
        <DeatailedInfo>
          <ContractStatus>
            {contractStatus || ContractStatusEnum.PENDING}
          </ContractStatus>
          {t("MyJobs.currency")}
          {hourlyRate}
          {t("MyJobs.perHour")}
        </DeatailedInfo>
        <LongMenu id={id} link={link} />
      </JobTitle>
      <DeatailedInfo>{dayjs(publishDate).fromNow()}</DeatailedInfo>
      <JobDescription>{description}</JobDescription>
      <Divider />
    </>
  );
}

export default JobItems;
