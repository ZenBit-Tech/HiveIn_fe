import React, { ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import { InputAdornment, TextField as TextFieldM } from "@mui/material";
import { ITextFieldProps } from "components/UI/textField/typesDef";
import {
  sxProps,
  SWrapper,
  SErrorMessage,
} from "components/UI/textField/style";
import LengthCheck from "./LengthCheck";

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
    rate,
  } = props;
  const [characters, setCharacters] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const inputNumberType = "number";
  const inputTextareaType = "textarea";

  const endAdornment =
    type === inputNumberType ? (
      <InputAdornment position="end">{rate ? "$" : ""}</InputAdornment>
    ) : undefined;

  return (
    <SWrapper width={width}>
      {formFieldName && control ? (
        <>
          <Controller
            name={formFieldName}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextFieldM
                {...field}
                disabled={disabled}
                value={value}
                error={!!errors?.[`${formFieldName}`]?.message}
                fullWidth
                sx={helperText ? undefined : sxProps}
                multiline={multiline}
                rows={rows}
                type={type}
                label={helperText}
                size="small"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue(e.target.value);
                  setCharacters(e.target.value.length);
                }}
                InputProps={{
                  endAdornment,
                  rows,
                  inputProps: { maxLength },
                }}
              />
            )}
          />
          {type === inputTextareaType && (
            <LengthCheck characters={characters} maxLength={maxLength} />
          )}
        </>
      ) : (
        <TextFieldM
          error={!!errors?.[`${formFieldName}`]?.message}
          fullWidth
          multiline={multiline}
          rows={rows}
          type={type}
          size="small"
          sx={helperText ? undefined : sxProps}
          InputProps={{
            endAdornment,
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
