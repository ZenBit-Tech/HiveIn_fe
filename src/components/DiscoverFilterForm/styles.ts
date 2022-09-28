import { LIGHT_GRAY } from "utils/consts/colorConsts";
import styled from "styled-components";
import { Button } from "antd";

const CustomButton = styled(Button)`
  margin: 10px 0;
`;

const Div = styled.div`
  background-color: ${LIGHT_GRAY};
  border-radius: 5px;
  padding: 15px;
`;

export default { CustomButton, Div };
