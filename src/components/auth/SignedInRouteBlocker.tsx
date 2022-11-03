import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { COMPLETE_REGISTRATION_ROUTE } from "utils/consts/routeConsts";
import { homeRoute } from "pages/Freelancer/Home";

function SignedInRouteBlocker({ children }: { children: JSX.Element }) {
  const { authToken, role } = useAuth();

  if (authToken && !role)
    return <Navigate to={COMPLETE_REGISTRATION_ROUTE} replace />;

  if (authToken && role) {
    return <Navigate to={homeRoute[role!]} replace />;
  }

  return children;
}

export default SignedInRouteBlocker;
