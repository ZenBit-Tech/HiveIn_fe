import {
  COMPLETE_REGISTRATION_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESTORE_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/routeConsts";
import { RoutesType } from "routes/publicRoutes";
import SignUp from "pages/Auth/SignUp/Index";
import SignIn from "pages/Auth/SignIn/Index";
import ForgotPassword from "pages/Auth/ForgotPassword/Index";
import RestorePassword from "pages/Auth/RestorePassword/Index";
import CompleteRegistration from "pages/Auth/CompleteRegistration/CompleteRegistration";

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
  {
    path: COMPLETE_REGISTRATION_ROUTE,
    component: CompleteRegistration,
  },
];

export default authenticationRoutes;
