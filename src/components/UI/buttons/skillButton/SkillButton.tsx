import React, { MouseEventHandler, useState } from "react";
import { Button } from "@mui/material";
import { ISkillButtonProps } from "./typesDef";

function SkillButton({ text, append, remove }: ISkillButtonProps) {
  const [active, setActive] = useState<boolean>(false);

  const clickHandler: MouseEventHandler = () => {
    if (active) remove(text);
    else append(text);
    setActive((state) => !state);
  };

  return (
    <Button
      onClick={clickHandler}
      color={active ? "success" : "primary"}
      variant={active ? "contained" : "outlined"}
      size="small"
    >
      {text}
    </Button>
  );
}

export default SkillButton;
