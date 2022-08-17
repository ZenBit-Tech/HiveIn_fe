import React, { MouseEventHandler, useState } from "react";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useFieldArray, Controller } from "react-hook-form";
import i18next from "localization/en/en.json";
import EducationColumn from "components/educationColumn/EducationColumn";
import { IEducationLayoutProps } from "components/educationLayout/typesDef";

function EducationLayout({
  type,
  maxCountOfColumns,
  control,
}: IEducationLayoutProps) {
  const [columns, setColumns] = useState<{ id: string }[]>([{ id: "initial" }]);

  const { append, remove } = useFieldArray({ control, name: type });

  const handleAddColumn: MouseEventHandler = () => {
    setColumns((state) => [...state, { id: uuidv4() }]);
  };

  const handleRemoveColumn = (id: string, index: number): void => {
    const columnsArr = [...columns];
    columnsArr.splice(
      columnsArr.findIndex((element) => element.id === id),
      1
    );
    setColumns(() => columnsArr);
    remove(index);
  };

  return (
    <div>
      {columns.map(({ id }, index) => (
        <Controller
          key={id}
          control={control}
          name={`${type}[${index}]`}
          render={() => (
            <EducationColumn
              control={control}
              deletable={columns.length > 1}
              index={index}
              append={append}
              type={type}
              id={id}
              removeHandler={handleRemoveColumn}
            />
          )}
        />
      ))}
      {maxCountOfColumns > columns.length && (
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
