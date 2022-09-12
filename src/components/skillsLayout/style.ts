import styled from "styled-components";

interface SDiv {
  showSmall?: boolean;
}

export default styled("div")<SDiv>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.showSmall ? "2" : "4")},
    1fr
  );
  gap: 10px;
  grid-auto-rows: 1fr;
`;
