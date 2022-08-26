import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ISkillButtonProps } from "components/UI/buttons/skillButton/typesDef";

function SkillButton({ text, toggleActive, id, isActive }: ISkillButtonProps) {
  const [active, setActive] = useState<boolean>(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <Button
      onClick={() => toggleActive(id)}
      color={active ? "success" : "primary"}
      variant={active ? "contained" : "outlined"}
      size="small"
      type="button"
    >
      {text}
    </Button>
  );
}

export default SkillButton;
