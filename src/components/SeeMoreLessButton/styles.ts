import { Button } from "antd";
import styled from "styled-components";

export const SButton = styled(Button)<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
`;

export default SButton;
