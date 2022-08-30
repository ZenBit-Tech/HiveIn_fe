import { Tag } from "antd";
import styled from "styled-components";
import { DARK_BLUE, LIGHT_BLUE, TEXT_GRAY } from "utils/colorConsts";

interface ITitle {
  font_sz?: string;
  pd_bottom?: string;
}

const JobTitle = styled.div<ITitle>`
  display: flex;
  font-size: ${(props) => props.font_sz || "1em"};
  justify-content: space-between;
  padding-bottom: ${(props) => props.font_sz || "25px"};
`;

export const SkillTag = styled(Tag)`
  border-radius: 50px;
  background-color: ${LIGHT_BLUE};
  border-color: ${DARK_BLUE};
  color: ${DARK_BLUE};
`;

export const PayoutTitle = styled.div`
  font-size: 1em;
`;

export const JobDescription = styled.div`
  color: ${TEXT_GRAY};
  padding-bottom: 10%;
`;

export default JobTitle;
