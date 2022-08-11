import React from "react";
import { Input, InputProps, Typography } from "antd";
import { Control, Controller } from "react-hook-form";

interface FieldProps extends InputProps {
  control: Control<any>;
  name: string;
  label?: string;
}

export default function Field({ control, name, label, ...props }: FieldProps) {
  const { Text } = Typography;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div style={{ width: "100%" }}>
          <Typography>{label}</Typography>
          <Input
            onChange={onChange}
            value={value}
            status={error ? "error" : undefined}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
          <Text type="danger">{error ? error.message : ""}</Text>
        </div>
      )}
    />
  );
}

Field.defaultProps = {
  label: "",
};
