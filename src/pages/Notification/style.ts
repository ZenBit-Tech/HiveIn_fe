import styled from "styled-components";
import {
  BOX_SHADOW_DARK,
  BOX_SHADOW_LIGHT,
  LIGHT_BLUE,
  LIGHT_GRAY,
} from "utils/consts/colorConsts";

const NotificationBox = styled.div<{ isRead: boolean }>`
  width: 230px;
  border-radius: 12px;
  background-color: ${({ isRead }) => (isRead ? LIGHT_GRAY : LIGHT_BLUE)};
  margin: 15px 0;
  padding: 5px;
  cursor: pointer;
  box-shadow: ${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export default NotificationBox;
