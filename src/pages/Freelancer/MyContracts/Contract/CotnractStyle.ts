import styled from "styled-components";
import { DARK_BLUE } from "utils/consts/colorConsts";

export const Container = styled.div`
  max-width: 800px;
  border: 1px solid ${DARK_BLUE};
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  margin-right: 5px;
  font-weight: 700;
  text-decoration: underline;
  &:after {
    content: ":";
  }
`;

export const Block = styled.div`
  margin: 5px 0;
  word-break: break-word;
`;

export const ModalMessage = styled.p`
  font-size: 20px;
`;
