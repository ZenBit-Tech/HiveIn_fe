import React, { useState } from "react";
import { IProps } from "components/UI/toggleButton/typesDef";
import {
  ToggleButtonGroup,
  ToggleButton as ToggleButtonM,
} from "@mui/material";

function ToggleButton(props: IProps) {
  const { options } = props;
  const [alignment, setAlignment] = useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup value={alignment} onChange={handleChange} exclusive>
      {options.map((option) => (
        <ToggleButtonM key={option} value={option}>
          {option}
        </ToggleButtonM>
      ))}
    </ToggleButtonGroup>
  );
}

export default ToggleButton;
