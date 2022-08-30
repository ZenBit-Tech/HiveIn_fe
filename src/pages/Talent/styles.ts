import styled from "styled-components";

export const LeftDiv = styled.div`
  position: fixed;
`;

const RightDiv = styled.div`
  margin-left: 150px;
`;

export const SButton = styled.p<{ underline: string }>`
  display: block;
  cursor: pointer;
  text-decoration: ${(props) => props.underline};
  width: 120px;
  padding: 5px;
  margin-bottom: 5px;
  color: black;
`;

export default RightDiv;
