import Button from "components/UI/buttons/LinkButton/LinkButtonStyles";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  link: string;
  children: ReactNode;
}

function LinkButton({ link, children }: IProps): JSX.Element {
  const navigate = useNavigate();

  const goToThisPage = () => {
    navigate(link);
  };

  return <Button onClick={goToThisPage}>{children}</Button>;
}

export default LinkButton;
