import FallBackSpin from "components/UI/spinners/FallbackSpin";
import useAuth from "hooks/useAuth";
import useGoogleAuth from "hooks/useGoogleAuth";
import { Navigate } from "react-router-dom";
import {
  CLIENT_HOME,
  SEARCH_WORK_ROUTE,
  SIGN_IN_ROUTE,
} from "utils/consts/routeConsts";

const homeRoute = {
  freelancer: SEARCH_WORK_ROUTE,
  client: CLIENT_HOME,
};

function Home() {
  const { isLoading, authToken } = useGoogleAuth();
  const { role } = useAuth();

  if (authToken) return <Navigate to={homeRoute[role!]} />;

  if (!isLoading) return <Navigate to={SIGN_IN_ROUTE} />;

  return <FallBackSpin />;
}

export default Home;
