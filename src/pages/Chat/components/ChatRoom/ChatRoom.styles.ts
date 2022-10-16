import styled from "styled-components";
import { LIGHT_BLUE, LIGHT_GRAY, PRIMARY } from "utils/consts/colorConsts";

export const Message = styled.div<{
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

export const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  min-width: 50vw;
  padding: 10px;
  height: 70vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InputBlock = styled.div`
  display: flex;
  padding: 5px;
`;

export const Element = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-style: italic;
`;
export const Header = styled.div`
  background-color: ${LIGHT_BLUE};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 2px;
  font-size: 18px;
  text-align: center;
`;
export const Warning = styled.div`
  text-align: center;
`;
export const Notification = styled.div`
  font-size: 24px;
`;
export const Title = styled.div<{
  fontSize?: string;
  bold?: boolean;
  italic?: boolean;
}>`
  font-weight: ${({ bold }) => (bold ? "600" : "")};
  font-style: ${({ italic }) => (italic ? "italic" : "")};
  font-size: ${({ fontSize }) => fontSize};
`;
