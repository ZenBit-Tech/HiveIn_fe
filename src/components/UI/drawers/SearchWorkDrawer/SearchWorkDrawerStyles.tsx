import styled from "styled-components";
import { Typography } from "antd";
import {
  BLACK,
  BOX_BORDER,
  LIGHT_GRAY,
  TEXT_GRAY,
  WHITE,
} from "utils/consts/colorConsts";

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
  overflow: auto;
`;

export const DrawerText = styled(Text)<IText>`
  color: ${(props) => props.color || BLACK}; ;
`;

export const SideContent = styled.section`
  max-width: 300px;
  display: flex;
  border-left: 1px solid ${BOX_BORDER};
  height: 100%;
  flex-direction: column;
  row-gap: 26px;
`;

export const AttachmentLink = styled.a`
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  display: flex;
  column-gap: 5px;
  font-size: 1em;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  background-color: ${LIGHT_GRAY};
  padding: 5px;
  color: ${TEXT_GRAY};
  &:hover {
    color: ${WHITE};
    background-color: ${TEXT_GRAY};
  }
`;
