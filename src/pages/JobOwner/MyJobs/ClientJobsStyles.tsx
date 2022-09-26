import { Pagination } from "antd";
import styled from "styled-components";
import {
  BLACK,
  BOX_BACKGROUND,
  BOX_BORDER,
  TEXT_GRAY,
  WHITE,
} from "utils/consts/colorConsts";
import { WRAP_SCREEN_SIZE } from "utils/consts/mediaQueryConsts";

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
  background-color: ${BOX_BACKGROUND};
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
  justify-content: space-between;
  align-items: center;
  color: ${BLACK};
  padding: ${(props) => props.pd || "10px"};
  padding-bottom: ${(props) => props.pd_bottom || "3%"};
  font-weight: 400;
  padding: 25px;
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
  position: relative;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const DivContainer = styled.div`
  padding: 30px;
`;

export const Card = styled.div<BoxSizing>`
  background-color: ${WHITE};
  border: 1px solid ${BOX_BORDER};
  border-radius: 10px;
  width: ${(props) => props.wd || "100%"};
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const ContractStatus = styled("div")`
  color: ${BLACK};
  overflow: hidden;
  font-size: 16px;
`;

export const StyledPagination = styled(Pagination)`
  margin-top: 15px;
  padding: 25px;
`;

export const Filter = styled.div`
  display: flex;
  font-size: 0.7em;
  font-weight: 500;
  column-gap: 10px;
  color: ${TEXT_GRAY};
`;

export default PageContainer;
