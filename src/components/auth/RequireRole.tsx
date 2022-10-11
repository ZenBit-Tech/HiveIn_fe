import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { SIGN_IN_ROUTE } from "utils/consts/routeConsts";
import { homeRoute } from "pages/Freelancer/Home";

interface ICheckRoleProps {
  children: JSX.Element;
}

function RequireRole({ children }: ICheckRoleProps) {
  const { authToken, role } = useAuth();

  if (!authToken) return <Navigate to={SIGN_IN_ROUTE} replace />;

  if (authToken && role) return <Navigate to={homeRoute[role!]} replace />;

  return children;
}

export default RequireRole;
