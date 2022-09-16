import Chat from "pages/Chat";
import Welcome from "pages/Auth/Welcome";
import { RoutesType } from "routes/publicRoutes";
import {
  CHAT_ROUTE,
  NOTIFICATIONS_ROUTE,
  WELCOME_ROUTE,
} from "utils/consts/routeConsts";
import Notifications from "pages/Notifications";

const protectedRoutes: RoutesType[] = [
  {
    path: CHAT_ROUTE,
    component: Chat,
  },
  {
    path: WELCOME_ROUTE,
    component: Welcome,
  },
  {
    path: NOTIFICATIONS_ROUTE,
    component: Notifications,
  },
];

export default protectedRoutes;
