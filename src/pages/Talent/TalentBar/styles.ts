import styled from "styled-components";

const SButton = styled.p<{ underline: string }>`
  display: block;
  text-decoration: ${(props) => props.underline};
  width: 120px;
  padding: 5px;
  margin-bottom: 5px;
  color: black;
`;

export default SButton;
