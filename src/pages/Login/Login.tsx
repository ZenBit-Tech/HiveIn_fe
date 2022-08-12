import useAuth from "hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

type LocationProps = {
  state: {
    from: Location;
  };
};

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;

  const from = location.state?.from?.pathname || "/";

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn();
    // Navigate to the page the user was before being disconnected
    navigate(from, { replace: true });
  }

  return (
    <form onSubmit={handleSignIn}>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
