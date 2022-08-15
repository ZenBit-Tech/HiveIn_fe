import React from "react";
import { Controller } from "react-hook-form";
import {
  FormHelperText,
  InputAdornment,
  TextField as TextFieldM,
} from "@mui/material";
import { ITextFieldProps } from "components/UI/textField/typesDef";
import {
  sxProps,
  SWrapper,
  SErrorMessage,
} from "components/UI/textField/style";

function TextField(props: ITextFieldProps) {
  const {
    type,
    width,
    helperText,
    multiline,
    rows,
    maxLength,
    formFieldName,
    control,
    errors,
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
            <TextFieldM
              {...field}
              error={!!errors?.[`${formFieldName}`]?.message}
              fullWidth
              multiline={multiline}
              rows={rows}
              type={type}
              size="small"
              sx={sxProps}
              InputProps={{
                endAdornment,
                rows,
                inputProps: { maxLength },
              }}
            />
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
          sx={sxProps}
          InputProps={{
            endAdornment,
            rows,
            inputProps: { maxLength },
          }}
        />
      )}
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      {!!errors?.[`${formFieldName}`]?.message && (
        <SErrorMessage>
          {errors?.[`${formFieldName}`]?.message?.toString()}
        </SErrorMessage>
      )}
    </SWrapper>
  );
}

export default TextField;
