import { LOGIN_ROUTE, SIGN_UP_ROUTE } from "utils/routeConsts";
import { RoutesProps } from "routes/publicRoutes";
import SignUp from "pages/SignUp/Index";
import Login from "pages/Login/Login";

const authenticationRoutes: RoutesProps[] = [
  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },

  {
    path: LOGIN_ROUTE,
    component: Login,
  },
];

export default authenticationRoutes;
