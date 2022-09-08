import styled from "styled-components";
import { BLUE_MUI_PRIMARY } from "utils/colorConsts";

export const SDiv = styled("div")`
  width: 350px;
  height: 50px;
  margin-left: 180px;
  margin-bottom: 10px;
  border: 3px solid ${BLUE_MUI_PRIMARY};
  border-radius: 10px;
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SP = styled("p")`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
