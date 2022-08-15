import React from "react";
import { IToggleButtonProps } from "components/UI/buttons/toggleButton/typesDef";
import {
  ToggleButtonGroup,
  ToggleButton as ToggleButtonM,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { SErrorMessage } from "components/UI/textField/style";

function ToggleButton(props: IToggleButtonProps) {
  const { options, control, formFieldName, errors } = props;

  return (
    <div>
      <Controller
        control={control}
        name={formFieldName}
        render={({ field }) => (
          <ToggleButtonGroup
            {...field}
            size="small"
            color="success"
            exclusive
            fullWidth
          >
            {options.map((option) => (
              <ToggleButtonM key={option} value={option}>
                {option}
              </ToggleButtonM>
            ))}
          </ToggleButtonGroup>
        )}
      />
      {!!errors?.[`${formFieldName}`]?.message && (
        <SErrorMessage>
          {errors?.[`${formFieldName}`]?.message?.toString()}
        </SErrorMessage>
      )}
    </div>
  );
}

export default ToggleButton;
