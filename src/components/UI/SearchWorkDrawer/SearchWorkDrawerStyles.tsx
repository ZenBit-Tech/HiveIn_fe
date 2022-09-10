import { Typography } from "antd";
import styled from "styled-components";
import { BLACK, BOX_BORDER, WHITE } from "utils/colorConsts";

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
  border-left: 1px solid ${BOX_BORDER};
  padding: 30px;
  height: 100%;
`;

export const DrawerText = styled(Text)<IText>`
  color: ${(props) => props.color || BLACK}; ;
`;
