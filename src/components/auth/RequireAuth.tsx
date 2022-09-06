import { Navigate, useLocation } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { SIGN_IN_ROUTE } from "utils/routeConsts";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authToken } = useAuth();
  const location = useLocation();

  if (!authToken) {
    /* Save current location and then redirect to the login page,
    so the user can go back to where he was after the authentication  */
    return <Navigate to={SIGN_IN_ROUTE} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
