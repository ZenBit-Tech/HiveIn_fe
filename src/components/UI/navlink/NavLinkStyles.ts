import { Link } from "react-router-dom";
import styled from "styled-components";
import { SECONDARY_GRAY, PRIMARY_BLUE } from "utils/consts/navBarConsts";

const NavLinkStyles = styled(Link)`
  color: ${SECONDARY_GRAY};
  font-size: 14px;
  font-weight: 400;
  &:hover {
    border-bottom: 3px solid ${PRIMARY_BLUE};
    color: ${PRIMARY_BLUE};
  }
  &:active {
    color: ${PRIMARY_BLUE};
  }
`;

export default NavLinkStyles;
