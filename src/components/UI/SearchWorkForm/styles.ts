import { LIGHT_GRAY } from "utils/colorConsts";
import styled from "styled-components";
import { Button } from "antd";

const CustomButton = styled(Button)`
  margin: 10px 0;
`;

const Form = styled("form")`
  padding: 15px;
  border-radius: 5px;
  background-color: ${LIGHT_GRAY};
`;

export default { Form, CustomButton };
