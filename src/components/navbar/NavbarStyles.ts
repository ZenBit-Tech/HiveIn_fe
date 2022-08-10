import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import styled from "styled-components";

const primaryBlue = "#065b90";
const strongerBlue = "#254059";

const NavbarStyles = styled(Header)`
  background-color: white;
  display: flex;
  column-gap: 24px;
  box-shadow: 0 0 0.2em lightgray;
  margin-bottom: 5px;
  padding-inline: 15%;
  align-items: center;
`;

export const NavBarButtons = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
  margin-left: auto;
`;

export const ButtonStyle = styled(Button)`
  color: ${primaryBlue};
  border-color: ${primaryBlue};
  &:hover {
    color: ${strongerBlue};
    border-color: ${strongerBlue};
  }
  &:focus {
    color: ${strongerBlue};
    border-color: ${strongerBlue};
  }
`;

export default NavbarStyles;
