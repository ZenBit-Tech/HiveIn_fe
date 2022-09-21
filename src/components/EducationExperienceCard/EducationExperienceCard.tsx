/* eslint-disable react/destructuring-assignment */
import { Space, Typography } from "antd";
import { IEducation, IExperience } from "../../services/profileInfo/typesDef";

function EducationExperienceCard(props: IEducation | IExperience) {
  const { Text } = Typography;

  const education = props as IEducation;
  const experience = props as IExperience;
  return (
    <Space direction="vertical" size={1}>
      <Text strong>{`${education.school || experience.company} - ${(
        education.degree || experience.jobTitle
      ).toLocaleUpperCase()}`}</Text>
      <Text italic>{`${
        props.city
      } (${props.startDate.toLocaleDateString()} - ${props.endDate.toLocaleDateString()})`}</Text>
      <Text>{props.description}</Text>
    </Space>
  );
}

export default EducationExperienceCard;
