import { Button } from "antd";
import styled from "styled-components";
import { PRIMARY_BLUE, STRONGER_BLUE } from "utils/consts/navBarConsts";

const ButtonStyle = styled(Button)`
  color: ${PRIMARY_BLUE};
  border-color: ${PRIMARY_BLUE};
  &:hover {
    color: ${STRONGER_BLUE};
    border-color: ${STRONGER_BLUE};
  }
  &:focus {
    color: ${STRONGER_BLUE};
    border-color: ${STRONGER_BLUE};
  }
`;

export default ButtonStyle;
