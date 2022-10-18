import React from "react";
import { FormControlLabel, Switch as SwitchM } from "@mui/material";
import { Controller } from "react-hook-form";
import { TArgs } from "components/UI/Switch/typesDef";
import { sxProps } from "components/UI/Switch/styles";

function Switch({ text, control, formFieldName }: TArgs) {
  return (
    <Controller
      name={formFieldName}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          control={
            <SwitchM
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value}
            />
          }
          label={text}
          sx={sxProps}
          labelPlacement="start"
        />
      )}
    />
  );
}

export default Switch;
