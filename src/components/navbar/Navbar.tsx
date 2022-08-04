import NavLink from "../UI/navlink/NavLink";
import NavbarStyles from "./style";

function Navbar() {
  return (
    <NavbarStyles>
      <NavLink path="/">Home</NavLink>
      <NavLink path="/dashboard">Dashboard</NavLink>
      <NavLink path="/redux-test">Redux test</NavLink>
    </NavbarStyles>
  );
}

export default Navbar;
