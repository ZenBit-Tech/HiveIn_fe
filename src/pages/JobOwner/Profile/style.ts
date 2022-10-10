import styled from "styled-components";
import {
  BOX_BACKGROUND,
  BOX_SHADOW_DARK,
  BOX_SHADOW_LIGHT,
  WHITE,
} from "utils/consts/colorConsts";
import { WRAP_SCREEN_SIZE } from "utils/consts/mediaQueryConsts";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${BOX_BACKGROUND};
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  background: ${WHITE};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 30%;
  margin: 10px 0;
  box-shadow: ${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px;

  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

const InputBox = styled.div`
  margin: 20px 0;
`;

export default { Container, Form, InputBox };
