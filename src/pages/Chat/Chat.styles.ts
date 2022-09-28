import styled from "styled-components";
import { LIGHT_BLUE } from "utils/consts/colorConsts";

export const Container = styled.div`
  display: flex;
`;

export const Block = styled.div`
  border-radius: 10px;
  background-color: ${LIGHT_BLUE};
  margin-right: 10px;
  height: 320px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Notification = styled.div`
  font-size: 24px;
`;
