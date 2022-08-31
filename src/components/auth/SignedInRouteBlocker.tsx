import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { SEARCH_WORK_ROUTE } from "utils/routeConsts";

function SignedInRouteBlocker({ children }: { children: JSX.Element }) {
  const { authToken } = useAuth();

  if (authToken) {
    return <Navigate to={SEARCH_WORK_ROUTE} replace />;
  }

  return children;
}

export default SignedInRouteBlocker;
