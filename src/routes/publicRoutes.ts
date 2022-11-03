import { HOME_PAGE_ROUTE } from "utils/consts/routeConsts";
import Home from "pages/Freelancer/Home";

export interface RoutesType {
  path: string;
  component: () => JSX.Element;
}

const publicRoutes: RoutesType[] = [
  {
    path: HOME_PAGE_ROUTE,
    component: Home,
  },
];

export default publicRoutes;
