import { Tag } from "antd";
import styled from "styled-components";
import { TEXT_GRAY, WHITE } from "utils/consts/colorConsts";

interface ITagProps {
  tag?: string;
}

// eslint-disable-next-line import/prefer-default-export
export const StatusTag = styled(Tag)<ITagProps>`
  border-radius: 50px;
  background-color: ${WHITE};
  border-style: dashed;
  border-color: ${({ tag }) => tag || TEXT_GRAY};
  color: ${({ tag }) => tag || TEXT_GRAY};
`;
