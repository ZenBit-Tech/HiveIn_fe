import Chat from "pages/Chat";
import ClientHome from "pages/JobOwner/Home/Home";
import ClientProfile from "pages/JobOwner/Profile/Profile";
import MyContracts from "pages/MyContracts";
import Profile from "pages/Profile";
import Proposals from "pages/Proposals";
import SearchWork from "pages/SearchWork";
import Settings from "pages/Settings/Settings";
import Welcome from "pages/Welcome";
import { RoutesType } from "routes/publicRoutes";
import {
  SEARCH_WORK_ROUTE,
  PROPOSALS_ROUTE,
  CHAT_ROUTE,
  MY_CONTRACTS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  SETTINGS_CONTACT_INFO_ROUTE,
  WELCOME_ROUTE,
  CLIENT_PROFILE,
  CLIENT_HOME,
} from "utils/routeConsts";

const protectedRoutes: RoutesType[] = [
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
    path: SETTINGS_CONTACT_INFO_ROUTE,
    component: Settings,
  },
  {
    path: PROFILE_ROUTE,
    component: Profile,
  },
  {
    path: WELCOME_ROUTE,
    component: Welcome,
  },
  {
    path: CLIENT_PROFILE,
    component: ClientProfile,
  },
  {
    path: CLIENT_HOME,
    component: ClientHome,
  },
];

export default protectedRoutes;
