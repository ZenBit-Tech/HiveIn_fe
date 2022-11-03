import FallBackSpin from "components/UI/spinners/FallbackSpin";
import useAuth from "hooks/useAuth";
import useGoogleAuth from "hooks/useGoogleAuth";
import { Navigate } from "react-router-dom";
import {
  CLIENT_HOME,
  COMPLETE_REGISTRATION_ROUTE,
  SEARCH_WORK_ROUTE,
} from "utils/consts/routeConsts";

export const homeRoute = {
  freelancer: SEARCH_WORK_ROUTE,
  client: CLIENT_HOME,
};

function Home() {
  const { isLoading, authToken } = useGoogleAuth();
  const { role } = useAuth();

  if (!role && !isLoading) return <Navigate to={COMPLETE_REGISTRATION_ROUTE} />;

  if (authToken && role) return <Navigate to={homeRoute[role!]} />;

  return <FallBackSpin />;
}

export default Home;
