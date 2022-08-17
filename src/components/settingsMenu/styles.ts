import styled from "styled-components";
import { PRIMARY } from "utils/colorConsts";

/* eslint-disable import/prefer-default-export */
export const SButton = styled("button")`
  display: block;
  background-color: inherit;
  border: 1px solid ${PRIMARY};
  width: 120px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: inherit;
`;
