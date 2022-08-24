import styled from "styled-components";
import Title from "antd/lib/typography/Title";

import { TEXT_GRAY } from "utils/colorConsts";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  column-gap: 10px;
`;

export const Section = styled.section`
  width: 60%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const ContentBox = styled.section`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleText = styled(Title)`
  color: ${TEXT_GRAY};
  padding: 20px;
  border: 1px solid black;
`;

export const Filter = styled.div`
  border: 1px solid green;
  width: 40%;
  padding: 10px;
`;

export const JobList = styled.div`
  border: 1px solid red;
  width: 60%;
  padding: 10px;
`;

export default PageContainer;
