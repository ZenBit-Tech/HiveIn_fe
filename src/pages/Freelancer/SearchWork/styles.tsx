import { Empty, Pagination } from "antd";
import styled from "styled-components";
import { BLACK, TEXT_GRAY } from "utils/colorConsts";

interface ITitle {
  pd?: string;
  pd_bottom?: string;
  font_sz?: string;
}

interface BoxSizing {
  wd?: string;
}

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const Header = styled.div<BoxSizing>`
  width: ${(props) => props.wd || "80%"};
  grid-column-start: 1;
  grid-column-end: 3;
  align-items: center;
  justify-content: space-between;
`;

export const TitleText = styled.div<ITitle>`
  display: flex;
  font-size: ${(props) => props.font_sz || "2.0em"};
  flex-direction: column;
  color: ${BLACK};
  padding: ${(props) => props.pd || "10px"};
  padding-bottom: ${(props) => props.pd_bottom || "3%"};
  font-weight: 400;
`;

export const NameText = styled.div`
  color: ${TEXT_GRAY};
  font-size: 14px;
  padding: 5px;
  font-weight: 400;
`;

export const FilterSection = styled.div<BoxSizing>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const WorkSection = styled.div<BoxSizing>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyBox = styled(Empty)`
  grid-column-start: 1;
  grid-column-end: 4;
`;

export const StyledPagination = styled(Pagination)``;

export default PageContainer;
