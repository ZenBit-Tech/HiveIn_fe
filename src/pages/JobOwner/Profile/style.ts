import styled from "styled-components";
import {
  BOX_BACKGROUND,
  BOX_SHADOW_DARK,
  BOX_SHADOW_LIGHT,
  WHITE,
} from "utils/consts/colorConsts";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: ${BOX_BACKGROUND};
  border-radius: 8px;
  box-shadow: ${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px;
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
