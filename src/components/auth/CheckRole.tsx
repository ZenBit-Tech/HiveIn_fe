import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { SIGN_IN_ROUTE } from "utils/consts/routeConsts";
import { useEffect } from "react";

interface ICheckRoleProps {
  children: JSX.Element;
  guardRole: "freelancer" | "client";
  route: string;
}

function CheckRole({ guardRole, route, children }: ICheckRoleProps) {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate(SIGN_IN_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (role !== guardRole) return <Navigate to={route} />;

  return children;
}

export default CheckRole;
