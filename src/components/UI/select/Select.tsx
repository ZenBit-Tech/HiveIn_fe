import React from "react";
import { FormControl, MenuItem, Select as SelectM } from "@mui/material";
import { ISelectProps } from "components/UI/select/typesDef";
import { Controller } from "react-hook-form";
import { SErrorMessage } from "components/UI/textField/style";

function Select(props: ISelectProps) {
  const { options, control, formFieldName, errors } = props;
  const sxProps = {
    "& legend": { display: "none" },
    "& fieldset": { top: 0 },
  };

  return (
    <FormControl fullWidth>
      <Controller
        name={formFieldName}
        control={control}
        defaultValue="Sales"
        render={({ field }) => (
          <SelectM
            error={!!errors[`${formFieldName}`]?.message}
            {...field}
            sx={sxProps}
            size="small"
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectM>
        )}
      />
      {!!errors[`${formFieldName}`]?.message && (
        <SErrorMessage>
          {errors[`${formFieldName}`]?.message?.toString()}
        </SErrorMessage>
      )}
    </FormControl>
  );
}

export default Select;
