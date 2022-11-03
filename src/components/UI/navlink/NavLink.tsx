import NavLinkStyles from "components/UI/navlink/NavLinkStyles";

interface IProps {
  path: string;
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

function NavLink({ onClick, path, children }: IProps) {
  return (
    <NavLinkStyles to={path} onClick={onClick}>
      {children}
    </NavLinkStyles>
  );
}

export default NavLink;
