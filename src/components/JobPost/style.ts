import styled from "styled-components";
import { BOX_BACKGROUND } from "utils/consts/colorConsts";

const Box = styled.div`
  width: 100%;
  height: 125px;
  background: ${BOX_BACKGROUND};
  border-radius: 12px;
  padding: 15px;
`;

const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
`;

export default { Box, Footer, TextContainer, TextBox };
