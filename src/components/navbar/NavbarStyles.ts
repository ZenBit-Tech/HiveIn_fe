import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import styled from "styled-components";

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
  color: #7246e5;
  border-color: #7246e5;
  &:hover {
    color: #4d2d9f;
    border-color: #4d2d9f;
  }
  &:focus {
    color: #4d2d9f;
    border-color: #4d2d9f;
  }
`;

export default NavbarStyles;
