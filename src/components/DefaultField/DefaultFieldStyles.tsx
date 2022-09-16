import { Input } from "antd";
import styled from "styled-components";
import { BLUE } from "utils/consts/colorConsts";

const { TextArea } = Input;

export const Wrapper = styled.div`
  width: 100%;
`;

export const FieldInput = styled(Input)`
  width: 100%;
  border-radius: 10px;

  &:focus {
    border: 1.5px solid ${BLUE};
  }
  &:hover {
    border-color: ${BLUE};
  }
`;

export const FieldTextArea = styled(TextArea)`
  width: 100%;
  border-radius: 10px;
  height: 200px;
  &:focus {
    border: 1.5px solid ${BLUE};
  }
  &:hover {
    border-color: ${BLUE};
  }
`;
