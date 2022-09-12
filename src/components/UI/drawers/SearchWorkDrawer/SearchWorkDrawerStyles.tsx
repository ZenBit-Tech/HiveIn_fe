import { Typography } from "antd";
import styled from "styled-components";
import { BLACK, BOX_BORDER, WHITE } from "utils/consts/colorConsts";

const { Text } = Typography;

interface IGrid {
  grow?: number;
}

interface IText {
  color?: string;
}

export const Wrapper = styled.div`
  border: 1px solid ${BOX_BORDER};
  background-color: ${WHITE};
  display: flex;
  border-radius: 10px;
`;

export const Grid = styled.div<IGrid>`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  flex-grow: ${(props) => props.grow || 1};
`;

export const Header = styled.header`
  padding: 20px;
`;

export const ContentBox = styled.section`
  border-top: 1px solid ${BOX_BORDER};
  padding: 30px;
`;

export const SideContent = styled.section`
  display: flex;
  border-left: 1px solid ${BOX_BORDER};
  height: 100%;
  flex-direction: column;
  row-gap: 26px;
`;

export const DrawerText = styled(Text)<IText>`
  color: ${(props) => props.color || BLACK}; ;
`;
