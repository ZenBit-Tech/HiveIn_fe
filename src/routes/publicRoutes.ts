import {
  HOME_PAGE_ROUTE,
  SEARCH_WORK_ROUTE,
  PROPOSALS_ROUTE,
  MY_CONTRACTS_ROUTE,
  SETTINGS_ROUTE,
  CHAT_ROUTE,
  PROFILE_ROUTE,
} from "utils/routeConsts";
import Home from "pages/Home";
import Proposals from "pages/Proposals";
import SearchWork from "pages/SearchWork";
import MyContracts from "pages/MyContracts";
import Settings from "pages/Settings";
import Chat from "pages/Chat";
import Profile from "pages/Profile";

const publicRoutes = [
  {
    path: HOME_PAGE_ROUTE,
    Component: Home,
  },
  {
    path: SEARCH_WORK_ROUTE,
    Component: SearchWork,
  },
  {
    path: PROPOSALS_ROUTE,
    Component: Proposals,
  },
  {
    path: MY_CONTRACTS_ROUTE,
    Component: MyContracts,
  },
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export default publicRoutes;
