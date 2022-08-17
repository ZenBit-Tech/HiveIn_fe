import React from "react";
import { Button } from "@mui/material";

function FormSubmitButton({ text }: { text: string }) {
  return (
    <Button sx={{ width: "350px" }} type="submit" variant="contained">
      {text}
    </Button>
  );
}

export default FormSubmitButton;
