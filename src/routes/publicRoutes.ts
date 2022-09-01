import {
  COMPLETE_REGISTRATION_ROUTE,
  HOME_PAGE_ROUTE,
} from "utils/routeConsts";
import Home from "pages/Home";
import CompleteRegistration from "pages/CompleteRegistration/CompleteRegistration";

export interface RoutesType {
  path: string;
  component: () => JSX.Element;
}

const publicRoutes: RoutesType[] = [
  {
    path: HOME_PAGE_ROUTE,
    component: Home,
  },
  {
    path: COMPLETE_REGISTRATION_ROUTE,
    component: CompleteRegistration,
  },
];

export default publicRoutes;
