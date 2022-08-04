import NavLinkStyles from "./style";

type Props = {
  path: string;
  children: JSX.Element | string;
};

function NavLink({ path, children }: Props) {
  return <NavLinkStyles to={path}>{children}</NavLinkStyles>;
}

export default NavLink;
