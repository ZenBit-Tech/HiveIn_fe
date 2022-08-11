import Chat from "pages/Chat";
import MyContracts from "pages/MyContracts";
import Profile from "pages/Profile";
import Proposals from "pages/Proposals";
import SearchWork from "pages/SearchWork";
import Settings from "pages/Settings";
import { RoutesProps } from "routes/publicRoutes";
import {
  SEARCH_WORK_ROUTE,
  PROPOSALS_ROUTE,
  CHAT_ROUTE,
  MY_CONTRACTS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "utils/routeConsts";

const protectedRoutes: RoutesProps[] = [
  {
    path: SEARCH_WORK_ROUTE,
    component: SearchWork,
  },
  {
    path: PROPOSALS_ROUTE,
    component: Proposals,
  },
  {
    path: MY_CONTRACTS_ROUTE,
    component: MyContracts,
  },
  {
    path: CHAT_ROUTE,
    component: Chat,
  },
  {
    path: SETTINGS_ROUTE,
    component: Settings,
  },
  {
    path: PROFILE_ROUTE,
    component: Profile,
  },
];

export default protectedRoutes;
