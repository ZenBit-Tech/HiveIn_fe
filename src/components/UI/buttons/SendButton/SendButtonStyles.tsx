import styled from "styled-components";
import { BLUE, WHITE, DARK_BLUE } from "utils/consts/colorConsts";

export interface IColors {
  backColor?: string;
  textColor?: string;
  borderColor?: string;
  hooverColor?: string;
  hooverBackColor?: string;
}

const SendButtonStyle = styled.button<IColors>`
  border: none;
  width: 100%;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  font-size: 1.1em;
  align-items: center;
  justify-content: center;
  background-color: ${({ backColor }) => backColor || BLUE};
  padding-inline: 30px;
  padding-block: 8px;
  color: ${({ textColor }) => textColor || WHITE};
  border: ${({ borderColor }) => `1px solid ${borderColor}` || null};
  &:hover {
    background-color: ${({ hooverBackColor }) => hooverBackColor || DARK_BLUE};
    color: ${({ hooverColor }) => hooverColor || WHITE};
  }
`;

export default SendButtonStyle;
