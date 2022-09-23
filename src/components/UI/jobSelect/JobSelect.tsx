import { InputProps, Typography, Select } from "antd";
import { Wrapper } from "components/DefaultField/DefaultFieldStyles";
import { Control, Controller } from "react-hook-form";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";

const { Text } = Typography;
interface FieldProps extends InputProps {
  control: Control<any>;
  name: string;
  label?: string;
  options: IJobPost[];
}

export default function JobSelect({
  control,
  name,
  label,
  options,
}: FieldProps) {
  const { Option } = Select;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Wrapper>
          <Typography>{label}</Typography>
          <Select
            defaultValue={value}
            style={{ width: "100%" }}
            onChange={onChange}
          >
            {options.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.title}
              </Option>
            ))}
          </Select>
          <Text type="danger">{error && error.message}</Text>
        </Wrapper>
      )}
    />
  );
}
