import React from "react";
import {
  FormControl,
  MenuItem,
  Select as SelectM,
  SelectChangeEvent,
} from "@mui/material";
import { IProps } from "components/UI/select/typesDef";

function Select(props: IProps) {
  const { options } = props;
  const [activeOption, setActiveOption] = React.useState("");
  const sxProps = {
    "& legend": { display: "none" },
    "& fieldset": { top: 0 },
  };

  const handleChange = (event: SelectChangeEvent) => {
    setActiveOption(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <SelectM
        sx={sxProps}
        value={activeOption}
        onChange={handleChange}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </SelectM>
    </FormControl>
  );
}

export default Select;
