import React from "react";
import { FormControl, MenuItem, Select as SelectM } from "@mui/material";
import { ISelectProps } from "components/UI/select/typesDef";
import { Controller } from "react-hook-form";
import { SErrorMessage } from "components/UI/textField/style";
import { selectStyles } from "components/UI/select/style";
import { useGetInfoQuery } from "services/categoriesAndSkills/categoriesAndSkills";

function Select(props: ISelectProps) {
  const { control, formFieldName, errors } = props;
  const { data } = useGetInfoQuery("category");

  return (
    <FormControl fullWidth>
      {!!data && (
        <Controller
          name={formFieldName}
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <SelectM
              error={!!errors[`${formFieldName}`]?.message}
              {...field}
              sx={selectStyles}
              size="small"
            >
              {data.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </SelectM>
          )}
        />
      )}
      {!!errors[`${formFieldName}`]?.message && (
        <SErrorMessage>
          {errors[`${formFieldName}`]?.message?.toString()}
        </SErrorMessage>
      )}
    </FormControl>
  );
}

export default Select;
