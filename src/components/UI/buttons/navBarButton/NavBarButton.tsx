import { ReactNode } from "react";
import { Tooltip } from "antd";
import ButtonStyle from "components/UI/buttons/navBarButton/navBarButtonStyles";

interface INavBarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  title: string;
}

function NavBarButton({ icon, title, onClick }: INavBarButtonProps) {
  return (
    <Tooltip title={title}>
      <ButtonStyle
        type="dashed"
        shape="circle"
        size="large"
        icon={icon}
        onClick={onClick}
      />
    </Tooltip>
  );
}

export default NavBarButton;
