import {
  COMPLETE_REGISTRATION_ROUTE,
  HOME_PAGE_ROUTE,
  SEARCH_WORK_ROUTE,
  PROPOSALS_ROUTE,
  MY_CONTRACTS_ROUTE,
  SETTINGS_ROUTE,
  CHAT_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
} from "utils/routeConsts";
import Home from "pages/Home";
import SignUp from "pages/SignUp/Index";
import CompleteRegistration from "pages/CompleteRegistration/Index";
import SearchWork from "pages/SearchWork";
import Proposals from "pages/Proposals";
import MyContracts from "pages/MyContracts";
import Chat from "pages/Chat";
import Settings from "pages/Settings";
import Profile from "pages/Profile";

export interface RoutesProps {
  path: string;
  component: () => JSX.Element;
}

const publicRoutes: RoutesProps[] = [
  {
    path: HOME_PAGE_ROUTE,
    component: Home,
  },
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
  {
    path: SIGN_UP_ROUTE,
    component: SignUp,
  },
  {
    path: COMPLETE_REGISTRATION_ROUTE,
    component: CompleteRegistration,
  },
];

export default publicRoutes;
