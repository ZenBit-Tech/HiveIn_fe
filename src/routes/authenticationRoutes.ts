import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "utils/routeConsts";
import { RoutesType } from "routes/publicRoutes";
import SignUp from "pages/SignUp/Index";
import SignIn from "pages/SignIn/Index";

const authenticationRoutes: RoutesType[] = [
  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },

  {
    path: SIGN_IN_ROUTE,
    component: SignIn,
  },
];

export default authenticationRoutes;
