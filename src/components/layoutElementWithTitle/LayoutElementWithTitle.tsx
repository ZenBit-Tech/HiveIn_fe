import React from "react";
import { ILayoutElementWithTitleProps } from "components/layoutElementWithTitle/typesDef";
import { SH, SDiv, SWrapper } from "components/layoutElementWithTitle/style";
import TextField from "components/UI/textField/TextField";
import Select from "components/UI/select/Select";
import ToggleButton from "components/UI/buttons/toggleButton/ToggleButton";
import EducationLayout from "components/educationLayout/EducationLayout";
import SkillsLayout from "components/skillsLayout/SkillsLayout";
import PhoneInput from "components/UI/phoneInput/PhoneInput";
import { useTranslation } from "react-i18next";

function LayoutElementWithTitle(props: ILayoutElementWithTitleProps) {
  const {
    element,
    title,
    formFieldName,
    containerWidth,
    helperText,
    toggleButtonOptions,
    maxLength,
    control,
    errors,
    freelancerInfo,
    setValue,
  } = props;

  const renderTextInput = () => (
    <TextField
      errors={errors}
      control={control}
      formFieldName={formFieldName}
      maxLength={maxLength}
      multiline={false}
      width="full"
      type="text"
    />
  );

  const renderNumberInput = () => (
    <TextField
      errors={errors}
      control={control}
      formFieldName={formFieldName}
      multiline={false}
      width="half"
      type="number"
      helperText={helperText}
    />
  );

  const renderTextarea = () => (
    <TextField
      errors={errors}
      control={control}
      formFieldName={formFieldName}
      maxLength={maxLength}
      rows={2}
      multiline
      width="full"
      type="text"
      helperText={helperText}
    />
  );

  const renderPhoneInput = () => (
    <PhoneInput name={formFieldName} control={control} />
  );

  const renderText = () => (
    <TextField
      disabled
      control={control}
      formFieldName={formFieldName}
      multiline={false}
      width="full"
      type="text"
    />
  );

  const renderSelect = () => (
    <Select errors={errors} formFieldName={formFieldName} control={control} />
  );

  const renderToggleButton = () =>
    toggleButtonOptions ? (
      <ToggleButton
        formFieldName={formFieldName}
        control={control}
        options={toggleButtonOptions}
        errors={errors}
      />
    ) : null;

  const renderEducationColumn = () => (
    <EducationLayout control={control} maxCountOfColumns={4} type="education" />
  );

  const renderExperienceColumn = () => (
    <EducationLayout
      control={control}
      maxCountOfColumns={8}
      type="experience"
    />
  );

  const renderSkillsLayout = () =>
    freelancerInfo ? (
      <SkillsLayout
        options={freelancerInfo?.skills}
        errors={errors}
        setValue={setValue}
      />
    ) : null;

  const elementTypes: { [propName: string]: typeof element } = {
    textInput: "textInput",
    numberInput: "numberInput",
    textarea: "textarea",
    select: "select",
    toggleButton: "toggleButton",
    educationColumn: "educationColumn",
    experienceColumn: "experienceColumn",
    skillsLayout: "skillsLayout",
    phoneInput: "phoneInput",
    text: "text",
  };

  const renderElement = (type: typeof element): JSX.Element | null => {
    switch (type) {
      case elementTypes.textInput:
        return renderTextInput();
      case elementTypes.numberInput:
        return renderNumberInput();
      case elementTypes.textarea:
        return renderTextarea();
      case elementTypes.select:
        return renderSelect();
      case elementTypes.toggleButton:
        return renderToggleButton();
      case elementTypes.educationColumn:
        return renderEducationColumn();
      case elementTypes.experienceColumn:
        return renderExperienceColumn();
      case elementTypes.skillsLayout:
        return renderSkillsLayout();
      case "phoneInput":
        return renderPhoneInput();
      case "text":
        return renderText();
      default:
        return null;
    }
  };

  const { t } = useTranslation();

  return (
    <SWrapper>
      <SH>{t(title)}</SH>
      <SDiv width={containerWidth}>{renderElement(element)}</SDiv>
    </SWrapper>
  );
}

export default LayoutElementWithTitle;
