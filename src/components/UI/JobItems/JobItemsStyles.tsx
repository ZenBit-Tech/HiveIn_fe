import { Link } from "react-router-dom";
import styled from "styled-components";
import { BLACK, BLUE, BOX_BORDER, TEXT_GRAY } from "utils/consts/colorConsts";

export const Wrapper = styled.div`
  border-top: 1px solid ${BOX_BORDER};
  padding: 30px;
`;

const JobTitle = styled.div`
  display: flex;
  font-size: 1.1em;
  justify-content: space-between;
  margin-top: 15px;
`;

export const JobDescription = styled.div`
  color: ${TEXT_GRAY};
  padding-block: 3px;
  margin-block: 15px;
  max-height: 5vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DeatailedInfo = styled.div`
  color: ${TEXT_GRAY};
  font-weight: 700;
  font-size: 0.8em;
  overflow: hidden;
`;

export const RouterLink = styled(Link)`
  overflow: hidden;
  margin-right: auto;
  &:hover {
    color: ${BLUE};
  }
`;

export const TagStatus = styled("span")`
  color: ${BLACK};
  overflow: hidden;
  margin-right: 10px;
`;

export default JobTitle;
