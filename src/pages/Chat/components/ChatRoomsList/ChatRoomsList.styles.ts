import styled from "styled-components";
import { BOX_SHADOW_LIGHT } from "utils/consts/colorConsts";

export const ChatElement = styled.div<{ isSelected: boolean }>`
  width: 250px;
  display: flex;
  gap: 10px;
  box-shadow: ${({ isSelected }) =>
    isSelected && `inset 0 0 36px 0 ${BOX_SHADOW_LIGHT}`};
  &:hover {
    box-shadow: inset 0 0 36px 0 ${BOX_SHADOW_LIGHT};
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
export const Text = styled.span<{
  fontSize?: string;
  bold?: boolean;
  italic?: boolean;
}>`
  font-size: ${({ fontSize }) => fontSize};
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
  font-style: ${({ italic }) => (italic ? "italic" : "")};
  font-weight: ${({ bold }) => (bold ? "600" : "")};
`;
