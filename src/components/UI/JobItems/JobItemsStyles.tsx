import { Link } from "react-router-dom";
import styled from "styled-components";
import { BLACK, BLUE, TEXT_GRAY } from "utils/colorConsts";

const JobTitle = styled.div`
  display: flex;
  font-size: 1.2em;
  justify-content: space-between;
`;

export const JobDescription = styled.div`
  color: ${TEXT_GRAY};
  padding-block: 10px;
  overflow-wrap: break-word;
`;

export const RouterLink = styled(Link)`
  color: ${BLACK};
  font-weight: 800;
  overflow: hidden;
  &:hover {
    color: ${BLUE};
  }
`;

export default JobTitle;
