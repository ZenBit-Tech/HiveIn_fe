import styled from "styled-components";
import { BOX_BACKGROUND, TEXT_GRAY } from "utils/consts/colorConsts";

interface ITitle {
  font_sz?: string;
  pd_bottom?: string;
}

export const Card = styled.div`
  border: 1px solid ${TEXT_GRAY};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${BOX_BACKGROUND};
  }
`;

const JobTitle = styled.div<ITitle>`
  display: flex;
  font-size: ${(props) => props.font_sz || "1em"};
  justify-content: space-between;
  padding-bottom: 15px;
`;

export const JobDescription = styled.div`
  color: ${TEXT_GRAY};
  padding-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default JobTitle;
