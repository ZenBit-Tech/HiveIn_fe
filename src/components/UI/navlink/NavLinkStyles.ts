import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLinkStyles = styled(Link)`
  color: #898989;
  font-size: 14px;
  font-weight: 400;
  &:hover {
    border-bottom: 3px solid #7246e5;
    color: #7246e5;
  }
  &:active {
    color: #7246e5;
  }

  @media screen and (max-width: 797px) {
    display: none;
  }
`;

export default NavLinkStyles;
