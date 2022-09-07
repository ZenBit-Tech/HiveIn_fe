import Talent from "pages/Talent";
import ClientHome from "pages/JobOwner/Home/Home";
import ClientProfile from "pages/JobOwner/Profile/Profile";
import ClientJob from "pages/JobOwner/MyJobs/ClientJob/ClientJob";
import MyJobs from "pages/JobOwner/MyJobs/ClientJobs";
import { RoutesType } from "routes/publicRoutes";
import {
  MY_JOBS_ROUTE,
  MY_JOB_ROUTE,
  CLIENT_PROFILE,
  CLIENT_HOME,
  TALENT_ROUTE,
} from "utils/routeConsts";

const clientRoutes: RoutesType[] = [
  {
    path: MY_JOBS_ROUTE,
    component: MyJobs,
  },
  {
    path: MY_JOB_ROUTE,
    component: ClientJob,
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

export default clientRoutes;
