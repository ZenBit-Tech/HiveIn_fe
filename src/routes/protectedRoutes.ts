import Chat from "pages/Chat";
import Welcome from "pages/Auth/Welcome";
import { RoutesType } from "routes/publicRoutes";
import { CHAT_ROUTE, WELCOME_ROUTE } from "utils/consts/routeConsts";

const protectedRoutes: RoutesType[] = [
  {
    path: CHAT_ROUTE,
    component: Chat,
  },
  {
    path: WELCOME_ROUTE,
    component: Welcome,
  },
];

export default protectedRoutes;
