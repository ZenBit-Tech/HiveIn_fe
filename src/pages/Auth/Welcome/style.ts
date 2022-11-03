import styled from "styled-components";
import { PRIMARY } from "utils/consts/colorConsts";

const Title = styled.h1`
  margin: 0;
  font-size: inherit;
  display: inline-block;
`;

const Container = styled.div`
  font-size: 28px;
  font-weight: 500;
`;

const Link = styled.a`
  color: ${PRIMARY};
  font-size: 20px;
`;

export default { Title, Container, Link };
