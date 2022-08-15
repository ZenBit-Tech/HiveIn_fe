import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextFieldM from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

function DatePicker(props: {
  label: string;
  formFieldName: string;
  control: Control;
  type: string;
  index: number;
}) {
  const { label, control, formFieldName, type, index } = props;

  return (
    <Controller
      name={`${type}[${index}].${formFieldName}`}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          value={field.value}
          onChange={(date) => field.onChange(date)}
          renderInput={(params) => (
            <TextFieldM sx={{ width: "340px" }} size="small" {...params} />
          )}
        />
      )}
    />
  );
}

export default DatePicker;
