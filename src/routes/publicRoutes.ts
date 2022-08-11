import {
  COMPLETE_REGISTRATION_ROUTE,
  HOME_PAGE_ROUTE,
  LOGIN_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/routeConsts";
import Home from "pages/Home";
import SignUp from "pages/SignUp/Index";
import CompleteRegistration from "pages/CompleteRegistration/Index";
import Login from "pages/Login/Login";

export interface RoutesProps {
  path: string;
  component: () => JSX.Element;
}

const publicRoutes: RoutesProps[] = [
  {
    path: HOME_PAGE_ROUTE,
    component: Home,
  },

  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },
  {
    path: COMPLETE_REGISTRATION_ROUTE,
    component: CompleteRegistration,
  },
  {
    path: LOGIN_ROUTE,
    component: Login,
  },
];

export default publicRoutes;
