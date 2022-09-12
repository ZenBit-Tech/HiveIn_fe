import { HOME_PAGE_ROUTE, SEARCH_WORK } from "utils/consts/routeConsts";
import Home from "pages/Freelancer/Home";
import SearchWork from "../pages/Freelancer/SearchWork/Index";

export interface RoutesType {
  path: string;
  component: () => JSX.Element;
}

const publicRoutes: RoutesType[] = [
  {
    path: HOME_PAGE_ROUTE,
    component: Home,
  },
  { path: SEARCH_WORK, component: SearchWork },
];

export default publicRoutes;
