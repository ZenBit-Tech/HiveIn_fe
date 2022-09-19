import styled from "styled-components";

export default styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  grid-auto-rows: 1fr;
`;
