import styled from "styled-components";
import { LIGHT_BLUE } from "utils/consts/colorConsts";
import React from "react";
import { ButtonProps, Button } from "antd";

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
  display: flex;
  justify-content: center;
  position: relative;
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

export const StyledButton: React.FunctionComponent<ButtonProps> = styled(
  Button
)`
  background-color: ${LIGHT_BLUE};
  box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px, rgba(0, 0, 0, 0.05) 0 5px 10px;
  font-weight: 600;
  position: absolute;
  text-align: center;
  top: 50%;
  right: 0;
  transform: translate(-10px, -50%);
`;
