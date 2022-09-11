import styled from "styled-components";
import { BOX_BORDER } from "utils/colorConsts";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  background-color: ${BOX_BORDER};
  border: 1px solid ${BOX_BORDER};
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
