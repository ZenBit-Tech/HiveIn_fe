import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useGoogleOAuthSignInQuery } from "services/auth/setAuthAPI";

const useGoogleAuth = () => {
  // Google Authentication
  const { signIn, authToken } = useAuth();

  const {
    data: signInResponse,
    isLoading,
    isSuccess,
  } = useGoogleOAuthSignInQuery();

  useEffect(() => {
    if (authToken) return;

    if (!isLoading && isSuccess) {
      signIn(signInResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
};

export default useGoogleAuth;
