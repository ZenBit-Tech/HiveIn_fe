import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { CLIENT_HOME, SEARCH_WORK_ROUTE } from "utils/routeConsts";

const homeRoute = {
  freelancer: SEARCH_WORK_ROUTE,
  client: CLIENT_HOME,
};

function SignedInRouteBlocker({ children }: { children: JSX.Element }) {
  const { authToken, role } = useAuth();

  if (authToken && role) {
    return <Navigate to={homeRoute[role!]} replace />;
  }

  return children;
}

export default SignedInRouteBlocker;
