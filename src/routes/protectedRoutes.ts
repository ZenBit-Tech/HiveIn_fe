import Home from "pages/Home";
import { RoutesProps } from "routes/publicRoutes";

const protectedRoutes: RoutesProps[] = [
  {
    path: " ",
    component: Home,
  },
];

export default protectedRoutes;
