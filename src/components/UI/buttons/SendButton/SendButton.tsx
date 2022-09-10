import SendButtonStyle from "components/UI/buttons/SendButton/SendButtonStyles";
import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

function SendButton({ onClick, children }: Props): JSX.Element {
  return <SendButtonStyle onClick={onClick}>{children}</SendButtonStyle>;
}

export default SendButton;
