import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextFieldM from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";
import { INPUT_DATE_FORMAT_PRIMARY } from "utils/inputPropsConsts";

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
          inputFormat={INPUT_DATE_FORMAT_PRIMARY}
          value={field.value}
          onChange={field.onChange}
          renderInput={(params) => (
            <TextFieldM sx={{ width: "340px" }} size="small" {...params} />
          )}
        />
      )}
    />
  );
}

export default DatePicker;
