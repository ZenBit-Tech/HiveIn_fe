import React from "react";
import { MenuItem, Select } from "@mui/material";
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import TextField from "components/UI/textField/TextField";
import { selectStyles } from "components/UI/select/style";
import { SErrorMessage } from "components/UI/textField/style";
import { SDiv } from "components/UI/InputAndSelectCombined/styles";

function InputAndSelectCombined({
  control,
  errors,
}: {
  control: Control;
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <SDiv>
        <TextField
          control={control}
          formFieldName="duration"
          helperText={t("PostJob.formFieldsInfo.duration.title")}
          withoutAdornment
          type="number"
          width="full"
        />
        <Controller
          control={control}
          name="durationType"
          defaultValue="week"
          render={({ field }) => (
            <Select {...field} fullWidth sx={selectStyles} size="small">
              <MenuItem value="week">
                {t("PostJob.formFieldsInfo.duration.week")}
              </MenuItem>
              <MenuItem value="month">
                {t("PostJob.formFieldsInfo.duration.month")}
              </MenuItem>
            </Select>
          )}
        />
      </SDiv>
      {!!errors?.duration?.message && (
        <SErrorMessage>{errors?.duration?.message?.toString()}</SErrorMessage>
      )}
    </div>
  );
}

export default InputAndSelectCombined;
