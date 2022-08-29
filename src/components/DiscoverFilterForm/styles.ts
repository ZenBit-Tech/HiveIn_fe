import { LIGHT_GRAY } from "utils/colorConsts";
import styled from "styled-components";
import { Button } from "antd";

export const CustomButton = styled(Button)`
  margin-top: 5px;
`;

const Form = styled("form")`
  padding: 15px;
  border-radius: 5px;
  background-color: ${LIGHT_GRAY};
`;

export default Form;
