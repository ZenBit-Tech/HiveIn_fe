import { Pagination } from "antd";
import styled from "styled-components";
import { BLACK, TEXT_GRAY } from "utils/colorConsts";
import { WRAP_SCREEN_SIZE } from "utils/mediaQueryConsts";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const Header = styled.div<BoxSizing>`
  width: ${(props) => props.wd || "60%"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
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

export const Section = styled.div<BoxSizing>`
  width: ${(props) => props.wd || "60%"};
  display: flex;
  align-items: center;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const Card = styled.div<BoxSizing>`
  border: 1px solid ${TEXT_GRAY};
  padding: 25px;
  border-radius: 10px;
  width: ${(props) => props.wd || "70%"};
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const StyledPagination = styled(Pagination)``;

export default PageContainer;
