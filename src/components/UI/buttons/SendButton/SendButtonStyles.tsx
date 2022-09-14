import styled from "styled-components";
import { BLUE, WHITE, DARK_BLUE } from "utils/consts/colorConsts";

const SendButtonStyle = styled.button`
  border: none;
  width: 100%;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  font-size: 1.1em;
  align-items: center;
  justify-content: center;
  background-color: ${BLUE};
  padding-inline: 30px;
  padding-block: 8px;
  color: ${WHITE};
  &:hover {
    background-color: ${DARK_BLUE};
  }
`;

export default SendButtonStyle;
