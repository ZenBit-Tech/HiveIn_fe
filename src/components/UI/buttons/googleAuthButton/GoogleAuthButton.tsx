import React from "react";

import GoogleButton, {
  Text,
  Image,
} from "components/UI/buttons/googleAuthButton/GoogleAuthButtonStyles";
import google from "components/UI/buttons/googleAuthButton/imgs/google.svg";

interface GoogleAuthButtonProps {
  children: React.ReactNode;
}

function GoogleAuthButton({ children }: GoogleAuthButtonProps) {
  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };

  return (
    <GoogleButton onClick={googleLogin}>
      <Image alt="Google" src={google} />
      <Text>{children}</Text>
    </GoogleButton>
  );
}

export default GoogleAuthButton;
