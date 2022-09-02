import JobTitle, {
  JobDescription,
  SkillTag,
} from "components/UI/JobItem/JobItemStyles";
import { useTranslation } from "react-i18next";

interface Props {
  description: string;
  hourlyRate: string;
  skills: string[];
}

function JobItem({ description, hourlyRate, skills }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <JobTitle font_sz="1.3em">
        {t("MyJobs.info")}{" "}
        <JobTitle>
          {t("MyJobs.currency")}
          {hourlyRate}
          {t("MyJobs.perHour")}
        </JobTitle>
      </JobTitle>
      <JobDescription>{description}</JobDescription>
      <JobTitle font_sz="1.0em" pd_bottom="10px">
        {t("MyJobs.skills")}
      </JobTitle>
      {skills.map((skill) => (
        <SkillTag key={skill}>{skill}</SkillTag>
      ))}
    </>
  );
}

export default JobItem;
