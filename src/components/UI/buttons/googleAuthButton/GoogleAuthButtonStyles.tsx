import styled from "styled-components";
import { GOOGLE_BTN_BACKGROUND, WHITE } from "utils/colorConsts";
import { GOOGLE_WRAPPER_SIZE } from "utils/mediaQueryConsts";

const GoogleButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  font-size: 1.1em;
  align-items: center;
  justify-content: center;
  background-color: ${GOOGLE_BTN_BACKGROUND};
  width: 70%;
  padding-block: 10px;
  border-radius: 50px;
  @media (max-width: ${GOOGLE_WRAPPER_SIZE}) {
    padding: 0;
    width: 20%;
    background-color: transparent;
  }
`;

export const Text = styled.div`
  color: ${WHITE};
  font-weight: 400;

  @media (max-width: ${GOOGLE_WRAPPER_SIZE}) {
    display: none;
  }
`;

export const Image = styled.img`
  height: 40px;
  width: 40px;
  background-color: ${WHITE};
  border-radius: 50px;
  padding: 2px;
  position: absolute;
  left: 0px;

  @media (max-width: ${GOOGLE_WRAPPER_SIZE}) {
    position: relative;
  }
`;

export default GoogleButton;
