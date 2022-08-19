import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useGoogleOAuthSignInQuery } from "services/auth/setAuthAPI";

const useGoogleAuth = () => {
  // Google Authentication
  const { signIn } = useAuth();
  const {
    data: signInResponse,
    isLoading,
    isSuccess,
  } = useGoogleOAuthSignInQuery();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      signIn(signInResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};

export default useGoogleAuth;
