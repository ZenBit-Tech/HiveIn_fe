import React from "react";
import {
  FormHelperText,
  InputAdornment,
  TextField as TextFieldM,
} from "@mui/material";
import { IProps } from "components/UI/textField/typesDef";
import { sxProps, SWrapper } from "components/UI/textField/style";

function TextField(props: IProps) {
  const { type, width, helperText } = props;
  const inputProps =
    type === "number" ? (
      <InputAdornment position="end">$</InputAdornment>
    ) : undefined;

  return (
    <SWrapper width={width}>
      <TextFieldM
        fullWidth
        type={type}
        size="small"
        sx={sxProps}
        InputProps={{
          endAdornment: inputProps,
        }}
      />
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </SWrapper>
  );
}

export default TextField;
