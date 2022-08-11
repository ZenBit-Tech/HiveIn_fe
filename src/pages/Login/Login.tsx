import useAuth from "hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

type LocationProps = {
  state: {
    from: Location;
  };
};

function Login() {
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;

  const from = location.state?.from?.pathname || "/";

  // if (email) {
  //   // Redirect them to the /login page, but save the current location they were
  //   // trying to go to when they were redirected. This allows us to send them
  //   // along to that page after they login, which is a nicer user experience
  //   // than dropping them off on the home page.
  //   navigate(from, { replace: true });
  // }

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signIn(() => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  function handleSignOut(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signOut();
  }

  return (
    <>
      <form onSubmit={handleSignIn}>
        <button type="submit">Login</button>
      </form>
      <form onSubmit={handleSignOut}>
        <button type="submit">SignOut</button>
      </form>
    </>
  );
}

export default Login;
