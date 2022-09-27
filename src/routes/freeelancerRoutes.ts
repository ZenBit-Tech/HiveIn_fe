import MyContracts from "pages/Freelancer/MyContracts/MyContracts";
import Profile from "pages/Freelancer/Profile";
import Proposals from "pages/Freelancer/Proposals";
import SearchWork from "pages/Freelancer/SearchWork/Index";
import Settings from "pages/Freelancer/Settings/Settings";
import { RoutesType } from "routes/publicRoutes";
import {
  SEARCH_WORK_ROUTE,
  PROPOSALS_ROUTE,
  MY_CONTRACTS_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  SETTINGS_CONTACT_INFO_ROUTE,
} from "utils/consts/routeConsts";

const freelancerRoutes: RoutesType[] = [
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
];

export default freelancerRoutes;
