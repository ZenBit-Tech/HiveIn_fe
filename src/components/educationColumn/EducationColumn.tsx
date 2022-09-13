import React from "react";
import IconButton from "@mui/joy/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import i18next from "localization/en/en.json";
import TextField from "components/UI/textField/TextField";
import {
  SDiv,
  SWrapper,
  deleteButtonSx,
} from "components/educationColumn/style";
import { IEducationColumnProps } from "components/educationColumn/typesDef";
import DatePicker from "components/UI/datePicker/DatePicker";

function EducationColumn(props: IEducationColumnProps) {
  const { type, id, removeHandler, index, control } = props;
  const educationColumnType = "education";
  const inputsProps =
    type === educationColumnType
      ? {
          helperTextPlace: i18next.ProfileEditForm.education.helperTextPlace,
          helperTextPosition:
            i18next.ProfileEditForm.education.helperTextPosition,
          helperTextDateStart:
            i18next.ProfileEditForm.education.helperTextDateStart,
          helperTextDateEnd:
            i18next.ProfileEditForm.education.helperTextDateEnd,
          helperTextCity: i18next.ProfileEditForm.education.helperTextCity,
          helperTextDescription:
            i18next.ProfileEditForm.education.helperTextDescription,
          formPlaceFieldName: "school",
          formPositionFieldName: "degree",
        }
      : {
          helperTextPlace: i18next.ProfileEditForm.experience.helperTextPlace,
          helperTextPosition:
            i18next.ProfileEditForm.experience.helperTextPosition,
          helperTextDateStart:
            i18next.ProfileEditForm.experience.helperTextDateStart,
          helperTextDateEnd:
            i18next.ProfileEditForm.experience.helperTextDateEnd,
          helperTextCity: i18next.ProfileEditForm.experience.helperTextCity,
          helperTextDescription:
            i18next.ProfileEditForm.experience.helperTextDescription,
          formPlaceFieldName: "employer",
          formPositionFieldName: "jobTitle",
        };

  const handleRemoveButton = (currentId: string): void => {
    removeHandler(currentId, index);
  };

  return (
    <SWrapper>
      <IconButton
        sx={deleteButtonSx}
        onClick={() => handleRemoveButton(id)}
        variant="outlined"
      >
        <DeleteOutlineIcon />
      </IconButton>

      <SDiv>
        <TextField
          maxLength={25}
          control={control}
          formFieldName={`${type}[${index}].${inputsProps.formPlaceFieldName}`}
          type="text"
          width="full"
          multiline={false}
          helperText={inputsProps.helperTextPlace}
        />
        <TextField
          maxLength={25}
          control={control}
          formFieldName={`${type}[${index}].${inputsProps.formPositionFieldName}`}
          type="text"
          width="full"
          multiline={false}
          helperText={inputsProps.helperTextPosition}
        />
      </SDiv>
      <SDiv>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={inputsProps.helperTextDateStart}
            control={control}
            formFieldName="startDate"
            type={type}
            index={index}
          />
          <DatePicker
            label={inputsProps.helperTextDateEnd}
            control={control}
            formFieldName="endDate"
            type={type}
            index={index}
          />
        </LocalizationProvider>
        <TextField
          maxLength={25}
          control={control}
          formFieldName={`${type}[${index}].city`}
          type="text"
          width="full"
          multiline={false}
          helperText={inputsProps.helperTextCity}
        />
      </SDiv>
      <TextField
        maxLength={200}
        control={control}
        formFieldName={`${type}[${index}].description`}
        type="text"
        width="full"
        multiline
        rows={3}
        helperText={inputsProps.helperTextDescription}
      />
    </SWrapper>
  );
}

export default EducationColumn;
