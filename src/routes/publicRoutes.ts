import Dashboard from "pages/Dashboard";
import ReduxTest from "pages/ReduxTest";
import {
  COMPLETE_REGISTRATION_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  REDUX_TEST_PAGE_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/consts";
import Home from "pages/Home";
import SignUp from "pages/SignUp/Index";
import CompleteRegistration from "pages/CompleteRegistration/Index";

const publicRoutes = [
  {
    path: HOME_PAGE_ROUTE,
    component: Home,
  },
  {
    path: DASHBOARD_PAGE_ROUTE,
    component: Dashboard,
  },
  {
    path: REDUX_TEST_PAGE_ROUTE,
    component: ReduxTest,
  },
  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },
  {
    path: COMPLETE_REGISTRATION_ROUTE,
    component: CompleteRegistration,
  },
];

export default publicRoutes;
