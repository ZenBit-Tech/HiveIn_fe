import styled from "styled-components";
import { BLUE, WHITE, DARK_BLUE } from "utils/colorConsts";
import { LINK_BUTTON_WRAP_SIZE } from "utils/mediaQueryConsts";

const Button = styled.div`
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
  @media (max-width: ${LINK_BUTTON_WRAP_SIZE}) {
    display: none;
  }
`;

export default Button;
