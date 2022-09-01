import Chat from "pages/Chat";
import ClientHome from "pages/JobOwner/Home/Home";
import ClientProfile from "pages/JobOwner/Profile/Profile";
import MyContracts from "pages/MyContracts/MyContracts";
import ClientJob from "pages/MyJobs/ClientJobs/ClientJob/ClientJob";
import MyJobs from "pages/MyJobs/MyJobs";
import Profile from "pages/Profile";
import Proposals from "pages/Proposals";
import SearchWork from "pages/SearchWork";
import Settings from "pages/Settings/Settings";
import Talent from "pages/Talent/Index";
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
  MY_JOBS_ROUTE,
  MY_JOB_ROUTE,
  CLIENT_PROFILE,
  CLIENT_HOME,
  TALENT_ROUTE,
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
    path: MY_JOBS_ROUTE,
    component: MyJobs,
  },
  {
    path: MY_JOB_ROUTE,
    component: ClientJob,
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
  {
    path: TALENT_ROUTE,
    component: Talent,
  },
];

export default protectedRoutes;
