import SendButtonStyle, {
  IColors,
} from "components/UI/buttons/SendButton/SendButtonStyles";
import { ReactNode } from "react";

interface ISendButtonProps extends IColors {
  onClick?: () => void;
  children: ReactNode;
}

function SendButton({
  onClick,
  children,
  ...props
}: ISendButtonProps): JSX.Element {
  return (
    <SendButtonStyle {...props} onClick={onClick}>
      {children}
    </SendButtonStyle>
  );
}

SendButton.defaultProps = {
  onClick: () => null,
};

export default SendButton;
