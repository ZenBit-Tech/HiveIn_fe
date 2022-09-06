import NavLinkStyles from "components/UI/navlink/NavLinkStyles";

interface Props {
  path: string;
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

function NavLink({ onClick, path, children }: Props) {
  return (
    <NavLinkStyles to={path} onClick={onClick}>
      {children}
    </NavLinkStyles>
  );
}

export default NavLink;
