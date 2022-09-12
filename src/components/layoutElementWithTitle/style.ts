import styled from "styled-components";
import { ILayoutElementWithTitleProps } from "./typesDef";

export const SWrapper = styled("div")`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const SH = styled("h3")`
  width: 180px;
`;

export const SDiv = styled("div")`
  width: ${({
    width,
  }: {
    width: ILayoutElementWithTitleProps["containerWidth"];
  }) => (width === "half" ? "350px" : "700px")};
`;
