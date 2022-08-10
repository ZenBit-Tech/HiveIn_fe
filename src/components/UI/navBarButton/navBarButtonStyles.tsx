import { Button } from "antd";
import styled from "styled-components";

const primaryBlue = "#065b90";
const strongerBlue = "#254059";

const ButtonStyle = styled(Button)`
  color: ${primaryBlue};
  border-color: ${primaryBlue};
  &:hover {
    color: ${strongerBlue};
    border-color: ${strongerBlue};
  }
  &:focus {
    color: ${strongerBlue};
    border-color: ${strongerBlue};
  }
`;

export default ButtonStyle;
