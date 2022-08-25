import styled from "styled-components";
import { BLACK, TEXT_GRAY } from "utils/colorConsts";
import { WRAP_SCREEN_SIZE } from "utils/mediaQueryConsts";

interface ITitle {
  pd: string;
  pd_bottom: string;
  font_sz: string;
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

export const Header = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const TitleText = styled.div<ITitle>`
  display: flex;
  font-size: ${(props) => props.font_sz};
  flex-direction: column;
  color: ${BLACK};
  padding: ${(props) => props.pd};
  padding-bottom: ${(props) => props.pd_bottom};
  font-weight: 400;
`;

export const NameText = styled.div`
  color: ${TEXT_GRAY};
  font-size: 14px;
  padding: 5px;
  font-weight: 400;
`;

export const Section = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export const JobPosting = styled.div`
  border: 1px solid ${TEXT_GRAY};
  padding: 25px;
  border-radius: 10px;
  width: 70%;
  @media (max-width: ${WRAP_SCREEN_SIZE}) {
    width: 100%;
  }
`;

export default PageContainer;
