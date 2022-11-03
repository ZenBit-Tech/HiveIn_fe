import React, { MouseEventHandler } from "react";
import { Button } from "@mui/material";
import { useFieldArray, Controller } from "react-hook-form";
import i18next from "localization/en/en.json";
import EducationColumn from "components/educationColumn/EducationColumn";
import { IEducationLayoutProps } from "components/educationLayout/typesDef";

function EducationLayout({
  type,
  maxCountOfColumns,
  control,
}: IEducationLayoutProps) {
  const { append, remove, fields } = useFieldArray({ control, name: type });

  const handleAddColumn: MouseEventHandler = () => {
    append({ active: true });
  };

  const handleRemoveColumn = (id: string, index: number): void => {
    remove(index);
  };

  return (
    <div>
      {fields.length > 0 && (
        <p>{i18next.profileFormErrorMessages.requiredEducation}</p>
      )}
      {fields.map(({ id }, index) => {
        return (
          <Controller
            key={id}
            control={control}
            name={`${type}[${index}]`}
            render={() => (
              <EducationColumn
                control={control}
                index={index}
                append={append}
                type={type}
                id={id}
                removeHandler={handleRemoveColumn}
              />
            )}
          />
        );
      })}
      {maxCountOfColumns > fields.length && (
        <Button
          sx={{ width: "350px" }}
          onClick={handleAddColumn}
          variant="outlined"
        >
          {type === "education"
            ? i18next.profileEditFormButtonsNames.addEducation
            : i18next.profileEditFormButtonsNames.addEmployment}
        </Button>
      )}
    </div>
  );
}

export default EducationLayout;
