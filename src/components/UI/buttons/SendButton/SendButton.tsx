import SendButtonStyle from "components/UI/buttons/SendButton/SendButtonStyles";
import { ReactNode } from "react";

interface ISendButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

function SendButton({ onClick, children }: ISendButtonProps): JSX.Element {
  return <SendButtonStyle onClick={onClick}>{children}</SendButtonStyle>;
}

SendButton.defaultProps = {
  onClick: () => null,
};

export default SendButton;
