import styled from "styled-components";
import { LIGHT_BLUE, LIGHT_GRAY, PRIMARY } from "utils/consts/colorConsts";

export const Container = styled.div<{
  isMine: boolean;
  isSystemMessage: boolean;
}>`
  display: ${({ isMine, isSystemMessage }) =>
    !isMine && isSystemMessage ? "none" : "flex"};
  flex-direction: column;
  padding: 10px;
  margin: 3px;
  align-self: ${(props) => {
    if (props.isSystemMessage) {
      return "center";
    }
    if (props.isMine) {
      return "flex-end";
    }
    return "flex-start";
  }};
  border-radius: 5px;
  background-color: ${(props) => {
    if (props.isSystemMessage) {
      return PRIMARY;
    }
    if (props.isMine) {
      return LIGHT_BLUE;
    }
    return LIGHT_GRAY;
  }};
`;

export const Text = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-style: italic;
  word-break: break-word;
`;

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;
