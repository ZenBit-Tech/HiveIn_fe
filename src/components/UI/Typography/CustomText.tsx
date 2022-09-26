import { Typography } from "antd";
import Title from "antd/lib/skeleton/Title";
import styled from "styled-components";
import { BLACK } from "utils/consts/colorConsts";

const { Text } = Typography;

interface IText {
  color?: string;
  link?: string;
}

export const CustomText = styled(Text)<IText>`
  color: ${({ color }) => color || BLACK};
  & :hover {
    color: ${({ color, link }) => link || color};
  }
`;

export const CustomTitle = styled(Title)<IText>`
  color: ${(props) => props.color || BLACK}; ;
`;
