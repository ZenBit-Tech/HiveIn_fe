import { Col, Card as C } from "antd";
import styled from "styled-components";
import { LIGHT_BLUE } from "utils/consts/colorConsts";

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
`;

const Ser = styled("div")`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
  height: 150px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const StyledCol = styled(Col)`
  cursor: pointer;
`;

const Card = styled(C)`
  background: ${LIGHT_BLUE};
  border-radius: 12px;
`;

export default { Card, Ser, Avatar, StyledCol };
