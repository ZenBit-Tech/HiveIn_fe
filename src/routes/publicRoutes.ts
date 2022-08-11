import {
  DASHBOARD_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  REDUX_TEST_PAGE_ROUTE,
} from "utils/consts";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import ReduxTest from "pages/ReduxTest";

const publicRoutes = [
  {
    path: HOME_PAGE_ROUTE,
    Component: Home,
  },
  {
    path: DASHBOARD_PAGE_ROUTE,
    Component: Dashboard,
  },
  {
    path: REDUX_TEST_PAGE_ROUTE,
    Component: ReduxTest,
  },
];

export default publicRoutes;
