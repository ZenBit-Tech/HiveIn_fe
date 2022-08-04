import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLinkStyles = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: 600;
  &:hover,
  &:active {
    color: lightgrey;
  }
`;

export default NavLinkStyles;
