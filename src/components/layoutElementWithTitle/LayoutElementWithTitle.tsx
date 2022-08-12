import React from "react";
import { IProps } from "components/layoutElementWithTitle/typesDef";
import { SH, SDiv, SWrapper } from "components/layoutElementWithTitle/style";
import TextField from "components/UI/textField/TextField";
import Select from "components/UI/select/Select";
import ToggleButton from "components/UI/toggleButton/ToggleButton";

function LayoutElementWithTitle(props: IProps) {
  const { element, title, selectOptions, helperText, toggleButtonOptions } =
    props;

  const renderElement = (type: typeof element) => {
    switch (type) {
      case "textInput":
        return <TextField width="full" type="text" />;
      case "select":
        return !!selectOptions && <Select options={selectOptions} />;
      case "numberInput":
        return <TextField width="half" type="number" helperText={helperText} />;
      case "toggleButton":
        return (
          !!toggleButtonOptions && (
            <ToggleButton options={toggleButtonOptions} />
          )
        );
      default:
        return null;
    }
  };

  return (
    <SWrapper>
      <SH>{title}</SH>
      <SDiv>{renderElement(element)}</SDiv>
    </SWrapper>
  );
}

export default LayoutElementWithTitle;
