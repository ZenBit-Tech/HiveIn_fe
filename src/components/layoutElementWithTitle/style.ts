import styled from "styled-components";
import { ILayoutElementWithTitleProps } from "./typesDef";

export const SWrapper = styled("div")`
  display: flex;
  margin: 15px auto;
`;

export const SH = styled("h3")`
  min-width: 180px;
  max-width: 700px;
`;

export const SDiv = styled("div")`
  width: ${({
    width,
  }: {
    width: ILayoutElementWithTitleProps["containerWidth"];
  }) => (width === "half" ? "350px" : "700px")};
`;
