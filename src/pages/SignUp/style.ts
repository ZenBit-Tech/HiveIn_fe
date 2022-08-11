import styled from "styled-components";
import { LIGHT_GRAY } from "utils/consts";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
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

export default { Container, FormBox, Form };
