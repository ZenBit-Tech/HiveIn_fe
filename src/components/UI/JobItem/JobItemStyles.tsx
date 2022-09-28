import styled from "styled-components";
import { TEXT_GRAY } from "utils/consts/colorConsts";

interface ITitle {
  font_sz?: string;
  pd_bottom?: string;
}

const JobTitle = styled.div<ITitle>`
  display: flex;
  font-size: ${(props) => props.font_sz || "1em"};
  justify-content: space-between;
  padding-bottom: ${(props) => props.font_sz || "25px"};
  margin-right: 10px;
  margin-top: 3px;
`;

export const PayoutTitle = styled.div`
  font-size: 1em;
`;

export const JobDescription = styled.div`
  color: ${TEXT_GRAY};
  padding-bottom: 10%;
`;

export const TitleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default JobTitle;
