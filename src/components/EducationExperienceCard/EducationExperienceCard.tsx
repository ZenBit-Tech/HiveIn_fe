import { Space, Typography } from "antd";
import { IEducation, IExperience } from "services/profileInfo/typesDef";

const { Text } = Typography;

function EducationExperienceCard(props: IEducation | IExperience) {
  const { startDate, endDate, city, description } = props;

  const education = props as IEducation;
  const experience = props as IExperience;
  return (
    <Space direction="vertical" size={1}>
      <Text strong>{`${education.school || experience.employer} - ${(
        education.degree || experience.jobTitle
      ).toLocaleUpperCase()}`}</Text>
      <Text italic>{`${city} (${new Date(
        startDate
      ).toLocaleDateString()} - ${new Date(
        endDate
      ).toLocaleDateString()})`}</Text>
      <Text>{description}</Text>
    </Space>
  );
}

export default EducationExperienceCard;
