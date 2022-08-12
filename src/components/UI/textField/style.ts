import styled from "styled-components";
import { IProps } from "./typesDef";

export const SWrapper = styled("div")`
  width: ${({ width }: { width: IProps["width"] }) =>
    width === "half" ? "50%" : "100%"};
`;

export const sxProps = {
  "& legend": { display: "none" },
  "& fieldset": { top: 0 },
};
