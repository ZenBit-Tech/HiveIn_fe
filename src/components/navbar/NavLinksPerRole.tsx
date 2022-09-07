import i18next from "localization/en/en.json";
import React from "react";
import {
  CLIENT_HOME,
  CLIENT_PROFILE,
  MY_CONTRACTS_ROUTE,
  MY_JOBS_ROUTE,
  PROPOSALS_ROUTE,
  SEARCH_WORK_ROUTE,
  SETTINGS_CONTACT_INFO_ROUTE,
  SETTINGS_ROUTE,
} from "utils/routeConsts";

interface LinkType {
  title: string;
  to: string;
}
interface NavLinkType {
  title: string;
  links: LinkType[];
}

export type NavRoleOptions = {
  title: string;
  to: string;
};

export type NavButtonOptions = {
  path: string;
  icon: React.ReactNode;
  title: string;
};

export type NavLinkOptions = {
  options: NavLinkType[];
  home: string;
};

export interface NavLinkRoles {
  freelancer: NavLinkOptions;
  client: NavLinkOptions;
}

const navLinksPerRole: NavLinkRoles = {
  freelancer: {
    options: [
      {
        title: i18next.MyJobs.title,
        links: [
          {
            to: SEARCH_WORK_ROUTE,
            title: i18next.SearchWork.title,
          },
          {
            to: PROPOSALS_ROUTE,
            title: i18next.Proposals.title,
          },
          {
            title: i18next.MyJobs.title,
            to: MY_JOBS_ROUTE,
          },
          {
            to: MY_CONTRACTS_ROUTE,
            title: i18next.MyContracts.title,
          },
        ],
      },
      {
        title: i18next.Profile.title,
        links: [
          {
            to: SETTINGS_CONTACT_INFO_ROUTE,
            title: i18next.Profile.title,
          },
          {
            to: SETTINGS_ROUTE,
            title: i18next.Settings.title,
          },
        ],
      },
    ],
    home: SEARCH_WORK_ROUTE,
  },
  client: {
    options: [
      {
        title: i18next.MyJobs.title,
        links: [
          {
            to: MY_JOBS_ROUTE,
            title: "Jobs",
          },
          {
            to: CLIENT_HOME,
            title: "Talent",
          },
        ],
      },
      {
        title: i18next.Profile.title,
        links: [
          {
            to: CLIENT_PROFILE,
            title: i18next.Profile.title,
          },
        ],
      },
    ],
    home: CLIENT_HOME,
  },
};

export default navLinksPerRole;
