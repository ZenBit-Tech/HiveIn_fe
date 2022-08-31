import { Navigate, useLocation } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { SIGN_IN_ROUTE } from "utils/routeConsts";

interface CheckRoleProps {
  children: JSX.Element;
  guardRole: "freelancer" | "client";
  route: string;
}

function CheckRole({ guardRole, route, children }: CheckRoleProps) {
  const { role, signOut } = useAuth();
  const location = useLocation();

  if (!role) {
    signOut();
    return <Navigate to={SIGN_IN_ROUTE} state={{ from: location }} replace />;
  }

  if (role !== guardRole) {
    return <Navigate to={route} />;
  }

  return children;
}

export default CheckRole;
