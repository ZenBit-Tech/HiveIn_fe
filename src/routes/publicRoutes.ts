import {
  COMPLETE_REGISTRATION_ROUTE,
  DISCOVER_ROUTE,
  HOME_PAGE_ROUTE,
  SAVED_TALENT_ROUTE,
} from "utils/routeConsts";
import Home from "pages/Home";
import CompleteRegistration from "pages/CompleteRegistration/CompleteRegistration";
import Talent from "pages/Talent/Index";

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
  {
    path: DISCOVER_ROUTE,
    component: Talent,
  },
  {
    path: SAVED_TALENT_ROUTE,
    component: Talent,
  },
];

export default publicRoutes;
