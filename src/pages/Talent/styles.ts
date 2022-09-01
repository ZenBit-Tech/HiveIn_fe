import styled from "styled-components";
import { BOX_BACKGROUND, WHITE } from "utils/colorConsts";

export const LeftDiv = styled.div`
  position: fixed;
`;

const RightDiv = styled.div`
  margin-left: 150px;
  padding: 20px;
  background: ${BOX_BACKGROUND};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SButton = styled.p<{ underline: string }>`
  display: block;
  cursor: pointer;
  text-decoration: ${(props) => props.underline};
  width: 120px;
  padding: 5px;
  margin-bottom: 5px;
  color: black;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-column-gap: 2%;
  grid-row-gap: 20px;
  width: 100%;
  background: ${WHITE};
  border-radius: 12px;
  padding: 15px;
`;

const Area = styled.div`
  margin: 10px 2%;
  width: 96%;
`;

export default { RightDiv, SButton, LeftDiv, TitleContainer, Box, Area };
