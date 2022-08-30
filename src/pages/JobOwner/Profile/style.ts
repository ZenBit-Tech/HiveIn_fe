import styled from "styled-components";
import { BOX_BACKGROUND, WHITE } from "utils/colorConsts";

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

const Form = styled.form`
  display: flex;
  background: ${WHITE};
  border-radius: 8px;
  align-items: center;
  justify-content: space-evenly;
  width: 70%;
  height: 45vh;
  margin: 10px 0;
`;

const InputBox = styled.div`
  margin: 20px 0;
`;

export default { Container, Form, InputBox };
