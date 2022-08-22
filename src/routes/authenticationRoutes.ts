import {
  RESTORE_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/routeConsts";
import { RoutesType } from "routes/publicRoutes";
import SignUp from "pages/SignUp/Index";
import SignIn from "pages/SignIn/Index";
import ForgotPassword from "pages/ForgotPassword/Index";
import RestorePassword from "pages/RestorePassword/Index";
import { FORGOT_PASSWORD_ROUTE } from "../utils/routeConsts";

const authenticationRoutes: RoutesType[] = [
  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },
  {
    path: SIGN_IN_ROUTE,
    component: SignIn,
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    component: ForgotPassword,
  },
  {
    path: RESTORE_PASSWORD_ROUTE,
    component: RestorePassword,
  },
];

export default authenticationRoutes;
