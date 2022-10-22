import styled from "styled-components";
import {
  BOX_SHADOW_DARK,
  BOX_SHADOW_LIGHT,
  WHITE,
} from "utils/consts/colorConsts";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  padding: 35px;
  background: ${WHITE};
  border-radius: 8px;
  box-shadow: ${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px;
`;

const Box = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
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

export default { Container, Wrapper, InputBox, TitleContainer, Box };
