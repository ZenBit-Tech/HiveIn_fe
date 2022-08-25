import { Col } from "antd";
import styled from "styled-components";

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
  height: 150px;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

export const Avatar = styled.img`
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

export const StyledCol = styled(Col)`
  cursor: pointer;
`;

export default { Card, Ser, Avatar };
