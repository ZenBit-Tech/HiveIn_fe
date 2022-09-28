import styled from "styled-components";
import { BOX_SHADOW_DARK } from "utils/consts/colorConsts";

export const ChatElement = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;

  &:hover {
    border-radius: 10px;
    box-shadow: inset 0 0 36px 0 ${BOX_SHADOW_DARK};
  }

  padding: 10px;
  cursor: pointer;
  max-height: 120px;
`;
export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px;
`;
export const LastMessage = styled.p`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
`;
