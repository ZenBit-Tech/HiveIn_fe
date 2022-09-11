import { InputProps, Typography } from "antd";
import {
  FieldInput,
  FieldTextArea,
  Wrapper,
} from "components/DefaultField/DefaultFieldStyles";
import { Control, Controller } from "react-hook-form";

const { Text } = Typography;
interface FieldProps extends InputProps {
  control: Control<any>;
  name: string;
  label?: string;
  textArea?: boolean;
  maxLength?: number;
}

export default function Field({
  textArea,
  maxLength,
  control,
  name,
  label,
  ...props
}: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Wrapper>
          <Typography>{label}</Typography>
          {textArea ? (
            <FieldTextArea
              onChange={onChange}
              value={value}
              status={error ? "error" : undefined}
              showCount
              maxLength={maxLength}
            />
          ) : (
            <FieldInput
              onChange={onChange}
              value={value}
              status={error ? "error" : undefined}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            />
          )}
          <Text type="danger">{error ? error.message : ""}</Text>
        </Wrapper>
      )}
    />
  );
}

Field.defaultProps = {
  label: "",
  textArea: false,
  maxLength: 0,
};
