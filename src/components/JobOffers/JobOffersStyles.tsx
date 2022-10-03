import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  BLACK,
  BLUE,
  BOX_BORDER,
  DARK_BLUE,
  TEXT_GRAY,
  WHITE,
  TAG_CLOSED,
} from "utils/consts/colorConsts";

export const Wrapper = styled.div`
  display: flex;
  border-top: 1px solid ${BOX_BORDER};
  justify-content: left;
  padding-inline: 30px;
  padding-block: 10px;
  column-gap: 30px;
`;

export const DivContainer = styled.div`
  margin-top: 15px;
`;

export const DetailDiv = styled.div`
  width: 100%;
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
  font-weight: 800;
  font-size: 0.9em;
`;

export const DeatailedInfo = styled.div`
  color: ${TEXT_GRAY};
  font-weight: 700;
  font-size: 0.8em;
  overflow: hidden;
`;

export const HeaderInfo = styled.div`
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

export const AcceptButton = styled.button`
  cursor: pointer;
  margin-right: 8px;
  border-radius: 50px;
  border: none;
  border: 1px solid ${BLUE};
  background-color: ${BLUE};
  padding-inline: 15px;
  padding-block: 5px;
  color: ${WHITE};
  &:hover {
    background-color: ${DARK_BLUE};
    border: 1px solid ${DARK_BLUE};
  }
`;

export const RejectButton = styled.button`
  cursor: pointer;
  margin-right: 8px;
  border-radius: 50px;
  border: 1px solid ${TAG_CLOSED};
  background-color: ${WHITE};
  padding-inline: 15px;
  padding-block: 5px;
  color: ${TAG_CLOSED};
  &:hover {
    background-color: ${TAG_CLOSED};
    color: ${WHITE};
  }
`;

export const TagStatus = styled("span")`
  color: ${BLACK};
  overflow: hidden;
  margin-right: 10px;
`;

export default JobTitle;
