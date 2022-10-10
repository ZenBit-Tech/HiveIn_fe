import { Radio, Typography } from "antd";
import styled from "styled-components";
import {
  BLUE,
  BOX_SHADOW_DARK,
  BOX_SHADOW_LIGHT,
  DARK_BLUE,
  LIGHT_BLUE,
  TEXT_GRAY,
  WHITE,
} from "utils/consts/colorConsts";
import { WRAP_SCREEN_SIZE } from "utils/consts/mediaQueryConsts";

const { Title, Text } = Typography;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  font-weight: 700;
  font-size: 15px;
`;

export const TitleText = styled(Title)`
  display: flex;
  justify-content: center;
  color: ${TEXT_GRAY};
  padding: 20px;
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const RoleRadio = styled(Radio)`
  border: 1px solid ${TEXT_GRAY};
  padding: 30px;
  display: flex;
  justify-content: center;
  margin: 20px;
  max-width: 300px;
  width: 50%;
  border-radius: 10px;
  &:hover {
    background-color: ${LIGHT_BLUE};
  }
  &:focus-within {
    border: 2px solid ${BLUE};
  }
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    max-width: 100%;
    width: 80%;
  }
`;

export const FormBox = styled.div`
  max-width: 500px;
  width: 45%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  background: ${WHITE};
  border-radius: 8px;
  box-shadow: ${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px;
  & ${TitleText}:first-child {
    width: 100%;
  }
  & ${RadioGroup}:not(:first-child) {
    flex: 1;
  }
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 5%;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const ApplyButton = styled.div`
  cursor: pointer;
  position: relative;
  display: ${(props) => (props.role ? "flex" : "none")};
  font-size: 1.1em;
  align-items: center;
  justify-content: center;
  background-color: ${BLUE};
  width: 70%;
  padding-block: 10px;
  border-radius: 50px;
  color: ${WHITE};
  margin: 20px;
  &:hover {
    background-color: ${DARK_BLUE};
  }
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export default Wrapper;
