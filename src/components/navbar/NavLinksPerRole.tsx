import { SettingFilled, UserOutlined } from "@ant-design/icons";
import i18next from "localization/en/en.json";
import React from "react";
import {
  CLIENT_HOME,
  CLIENT_PROFILE,
  CREATE_JOB_POST,
  MY_CONTRACTS_ROUTE,
  MY_JOBS_ROUTE,
  PROFILE_ROUTE,
  PROPOSALS_ROUTE,
  SEARCH_WORK_ROUTE,
  SETTINGS_ROUTE,
  TALENT_ROUTE,
} from "utils/routeConsts";

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
  links: NavRoleOptions[];
  buttons: NavButtonOptions[];
  home: string;
};

export interface NavLinkRoles {
  freelancer: NavLinkOptions;
  client: NavLinkOptions;
}

const navLinksPerRole: NavLinkRoles = {
  freelancer: {
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
        to: MY_CONTRACTS_ROUTE,
        title: i18next.MyContracts.title,
      },
    ],
    buttons: [
      {
        path: SETTINGS_ROUTE,
        title: i18next.Settings.title,
        icon: <SettingFilled />,
      },
      {
        path: PROFILE_ROUTE,
        title: i18next.Profile.title,
        icon: <UserOutlined />,
      },
    ],
    home: SEARCH_WORK_ROUTE,
  },
  client: {
    links: [
      {
        to: MY_JOBS_ROUTE,
        title: i18next.MyJobs.title,
      },
      {
        to: TALENT_ROUTE,
        title: "Talent",
      },
      {
        to: CREATE_JOB_POST,
        title: "Create Job Post",
      },
    ],
    buttons: [
      {
        path: CLIENT_PROFILE,
        title: i18next.Profile.title,
        icon: <UserOutlined />,
      },
    ],
    home: CLIENT_HOME,
  },
};

export default navLinksPerRole;
