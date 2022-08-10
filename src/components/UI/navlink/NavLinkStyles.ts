import { Link } from "react-router-dom";
import styled from "styled-components";

const primaryBlue = "#065b90";
const secondaryGray = "#898989";

const NavLinkStyles = styled(Link)`
  color: ${secondaryGray};
  font-size: 14px;
  font-weight: 400;
  &:hover {
    border-bottom: 3px solid ${primaryBlue};
    color: ${primaryBlue};
  }
  &:active {
    color: ${primaryBlue};
  }
`;

export default NavLinkStyles;
