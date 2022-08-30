import styled from "styled-components";
import { BOX_BACKGROUND } from "utils/colorConsts";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: ${BOX_BACKGROUND};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const Box = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 70%;
`;

const InputBox = styled.div`
  margin: 20px 0;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export default { Container, InputBox, TitleContainer, Box };
