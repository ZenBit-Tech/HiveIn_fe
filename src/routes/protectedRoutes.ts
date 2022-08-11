import Protected from "pages/Protected";
import { RoutesProps } from "routes/publicRoutes";
import { PROTECTED_ROUTE } from "utils/routeConsts";

const protectedRoutes: RoutesProps[] = [
  {
    path: PROTECTED_ROUTE,
    Component: Protected,
  },
];

export default protectedRoutes;
