import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useGoogleOAuthSignInQuery } from "services/auth/signIn";

function Home() {
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

  return <div>Home</div>;
}

export default Home;
