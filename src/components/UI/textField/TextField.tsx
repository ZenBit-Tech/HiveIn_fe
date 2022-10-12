import React from "react";
import { Controller } from "react-hook-form";
import { InputAdornment, TextField as TextFieldM } from "@mui/material";
import { ITextFieldProps } from "components/UI/textField/typesDef";
import {
  sxProps,
  SWrapper,
  SErrorMessage,
  SCountDown,
} from "components/UI/textField/style";

function TextField(props: ITextFieldProps) {
  const {
    type,
    width,
    helperText,
    multiline = false,
    rows,
    maxLength,
    formFieldName,
    control,
    errors,
    disabled,
    withoutAdornment,
  } = props;

  const inputNumberType = "number";

  const endAdornment =
    type === inputNumberType ? (
      <InputAdornment position="end">$</InputAdornment>
    ) : undefined;

  return (
    <SWrapper width={width}>
      {formFieldName && control ? (
        <Controller
          name={formFieldName}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <TextFieldM
                {...field}
                disabled={disabled}
                error={!!errors?.[`${formFieldName}`]?.message}
                fullWidth
                sx={helperText ? undefined : sxProps}
                multiline={multiline}
                rows={rows}
                type={type}
                label={helperText}
                size="small"
                InputProps={{
                  rows,
                  endAdornment: !withoutAdornment && endAdornment,
                  inputProps: { maxLength },
                }}
              />
              {multiline && (
                <SCountDown>
                  {maxLength! - (field.value as string).length}
                </SCountDown>
              )}
            </>
          )}
        />
      ) : (
        <TextFieldM
          error={!!errors?.[`${formFieldName}`]?.message}
          fullWidth
          multiline={multiline}
          rows={rows}
          type={type}
          size="small"
          sx={helperText ? undefined : sxProps}
          label={helperText}
          InputProps={{
            endAdornment: !withoutAdornment && endAdornment,
            rows,
            inputProps: { maxLength },
          }}
        />
      )}
      {!!errors?.[`${formFieldName}`]?.message && (
        <SErrorMessage>
          {errors?.[`${formFieldName}`]?.message?.toString()}
        </SErrorMessage>
      )}
    </SWrapper>
  );
}

export default TextField;
