import styled from "styled-components";
import { DISABLED, PRIMARY } from "utils/colorConsts";

/* eslint-disable import/prefer-default-export */
export const SButton = styled("button")`
  display: block;
  color: ${DISABLED};
  background-color: inherit;
  border: 1px solid ${PRIMARY};
  width: 120px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;

  &:focus {
    color: ${PRIMARY};
  }
`;
