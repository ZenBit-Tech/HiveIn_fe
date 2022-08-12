import { SIGN_IN, SIGN_UP_ROUTE } from "utils/routeConsts";
import { RoutesType } from "routes/publicRoutes";
import SignUp from "pages/SignUp/Index";
import Login from "pages/Login/Login";

const authenticationRoutes: RoutesType[] = [
  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },

  {
    path: SIGN_IN,
    component: Login,
  },
];

export default authenticationRoutes;
