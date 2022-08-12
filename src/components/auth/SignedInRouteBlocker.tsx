import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

function SignedInRouteBlocker({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default SignedInRouteBlocker;
