import i18next from "localization/en/en.json";
import {
  CLIENT_HOME,
  MY_CONTRACTS_ROUTE,
  MY_JOBS_ROUTE,
  PROPOSALS_ROUTE,
  SEARCH_WORK_ROUTE,
} from "utils/routeConsts";

export interface NavRoleOptions {
  title: string;
  to: string;
}

export interface NavLinkRoles {
  freelancer: NavRoleOptions[];
  client: NavRoleOptions[];
  none: [];
}

const navLinksPerRole: NavLinkRoles = {
  freelancer: [
    {
      to: SEARCH_WORK_ROUTE,
      title: i18next.SearchWork.title,
    },
    {
      to: PROPOSALS_ROUTE,
      title: i18next.Proposals.title,
    },
    {
      to: MY_CONTRACTS_ROUTE,
      title: i18next.MyContracts.title,
    },
  ],
  client: [
    {
      to: MY_JOBS_ROUTE,
      title: i18next.MyJobs.title,
    },
    {
      to: CLIENT_HOME,
      title: "Talent",
    },
  ],
  none: [],
};

export default navLinksPerRole;
