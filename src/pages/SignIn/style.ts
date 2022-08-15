import styled from "styled-components";
import { LIGHT_GRAY } from "utils/colorConsts";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 45%;
  height: 70%;
  background: ${LIGHT_GRAY};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Form = styled.form`
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const TextsBox = styled.div`
  text-align: center;
  width: 100%;
`;

const InputContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 90%;
`;

const Footer = styled.div`
  width: 45%;
  display: flex;
  justify-content: space-between;
`;

export default { Container, FormBox, Form, TextsBox, InputContainer, Footer };
