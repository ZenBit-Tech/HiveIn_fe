import styled from "styled-components";
import { ITextFieldProps } from "components/UI/textField/typesDef";
import { ERROR } from "utils/consts/colorConsts";

export const SWrapper = styled("div")`
  width: ${({ width }: { width: ITextFieldProps["width"] }) =>
    width === "half" ? "50%" : "100%"};
`;

export const sxProps = {
  "& legend": { display: "none" },
  "& fieldset": { top: 0 },
};

export const SErrorMessage = styled("p")`
  color: ${ERROR};
`;
