import styled from "styled-components";
import { LIGHT_BLUE, LIGHT_GRAY } from "utils/consts/colorConsts";

export const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 3px;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  border-radius: 5px;
  background-color: ${(props) => (props.isMine ? LIGHT_BLUE : LIGHT_GRAY)};
`;

export const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px;
  max-height: 500px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InputBlock = styled.div`
  display: flex;
  padding: 5px;
  margin: 3px;
`;

export const Element = styled.div`
  margin-top: 10px;
`;
export const Header = styled.div`
  background-color: ${LIGHT_BLUE};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 2px;
  font-size: 18px;
  text-align: center;
`;
