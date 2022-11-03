import styled from "styled-components";
import { WHITE } from "utils/consts/colorConsts";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 35%;
  padding-block: 15px;
  row-gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  background-color: ${WHITE};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

const Form = styled.form`
  width: 80%;
  row-gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default { Container, FormBox, Form };
