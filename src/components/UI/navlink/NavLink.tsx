import NavLinkStyles from "components/UI/navlink/NavLinkStyles";

type Props = {
  path: string;
  children: React.ReactNode;
};

function NavLink({ path, children }: Props) {
  return <NavLinkStyles to={path}>{children}</NavLinkStyles>;
}

export default NavLink;
