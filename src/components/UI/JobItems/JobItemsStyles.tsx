import { Link } from "react-router-dom";
import styled from "styled-components";
import { BLACK, BLUE, TEXT_GRAY } from "utils/colorConsts";

const JobTitle = styled.div`
  display: flex;
  font-size: 1.1em;
  justify-content: space-between;
`;

export const JobDescription = styled.div`
  color: ${TEXT_GRAY};
  padding-block: 3px;
  max-height: 5vh;
  overflow: hidden;
`;

export const DeatailedInfo = styled.div`
  color: ${TEXT_GRAY};
  font-weight: 700;
  font-size: 0.8em;
  overflow: hidden;
`;

export const RouterLink = styled(Link)`
  color: ${BLACK};
  font-weight: 800;
  overflow: hidden;
  margin-right: auto;
  &:hover {
    color: ${BLUE};
  }
`;

export default JobTitle;
