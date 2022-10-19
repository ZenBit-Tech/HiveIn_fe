import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LongMenu from "components/UI/DropdownMenus/LongMenu/LongMenu";
import JobTitle, {
  JobDescription,
  DeatailedInfo,
  RouterLink,
  TagStatus,
  Wrapper,
} from "components/UI/JobItems/JobItemsStyles";
import { useTranslation } from "react-i18next";
import { CustomText } from "components/UI/Typography/CustomText";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import { BLUE, TAG_CLOSED, TAG_SUCCESS } from "utils/consts/colorConsts";
import { SkillTag } from "components/UI/Tags/SkillTag";
import { StatusTag } from "components/UI/Tags/StatusTag";
import defineContractStatus from "utils/functions/defineContractStatus";

dayjs.extend(relativeTime);

interface IJobItemsProps extends IJobPost {
  link: string;
}

function JobItems({
  id,
  title,
  category,
  jobDescription,
  rate,
  skills,
  duration,
  durationType,
  englishLevel,
  createdAt,
  contract,
  isDraft,
  link,
}: IJobItemsProps) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <JobTitle>
        <RouterLink to={link}>
          <CustomText link={BLUE} strong>
            {title}
          </CustomText>
        </RouterLink>
        <DeatailedInfo>
          <TagStatus>
            {contract && (
              <StatusTag tag={!contract?.endDate ? TAG_SUCCESS : TAG_CLOSED}>
                {defineContractStatus(contract?.endDate)}
              </StatusTag>
            )}
            {isDraft && <StatusTag>{t("MyJobs.draft")}</StatusTag>}
          </TagStatus>
        </DeatailedInfo>
        <LongMenu id={id} link={link} />
      </JobTitle>
      <DeatailedInfo>
        <CustomText strong color={BLUE}>
          {category.name}
        </CustomText>
        {" - "}
        {t("MyJobs.currency")}
        {rate}
        {t("MyJobs.perHour")}
        {" - "}
        English: {englishLevel}
        {" - "}
        {duration} {durationType} duration
        {" - "}
        {dayjs(createdAt).fromNow()}
      </DeatailedInfo>
      <JobDescription>{jobDescription}</JobDescription>
      {skills.map((skill) => (
        <SkillTag key={skill?.id}>{skill?.name}</SkillTag>
      ))}
    </Wrapper>
  );
}

export default JobItems;
