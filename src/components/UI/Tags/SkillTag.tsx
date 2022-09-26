import { Tag } from "antd";
import styled from "styled-components";
import { LIGHT_BLUE, DARK_BLUE } from "utils/consts/colorConsts";

// eslint-disable-next-line import/prefer-default-export
export const SkillTag = styled(Tag)`
  border-radius: 50px;
  background-color: ${LIGHT_BLUE};
  border-color: ${DARK_BLUE};
  color: ${DARK_BLUE};
`;
