import styled from "styled-components";
import { ILayoutElementWithTitleProps } from "components/layoutElementWithTitle/typesDef";

export const SWrapper = styled("div")`
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
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
