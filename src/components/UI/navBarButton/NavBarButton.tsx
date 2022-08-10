import { ReactNode } from "react";
import { Tooltip } from "antd";
import ButtonStyle from "./navBarButtonStyles";

interface NavBarButtonProps {
  icon: ReactNode;
  title: string;
}

function NavBarButton({ icon, title }: NavBarButtonProps) {
  return (
    <Tooltip title={title}>
      <ButtonStyle type="dashed" shape="circle" size="large" icon={icon} />
    </Tooltip>
  );
}

export default NavBarButton;
