import i18next from "localization/en/en.json";
import React from "react";
import {
  CHAT_ROUTE,
  CLIENT_HOME,
  CREATE_JOB_POST,
  MY_CONTRACTS_ROUTE,
  MY_JOBS_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROPOSALS_ROUTE,
  SEARCH_WORK_ROUTE,
  SETTINGS_CONTACT_INFO_ROUTE,
  SETTINGS_ROUTE,
  TALENT_ROUTE,
} from "utils/consts/routeConsts";

export type LinkType = {
  title: string;
  to: string;
};

interface NavLinkType {
  title: string;
  links: LinkType[];
}

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
      {
        title: i18next.Chat.title,
        links: [
          {
            to: CHAT_ROUTE,
            title: i18next.Chat.title,
          },
          {
            to: NOTIFICATIONS_ROUTE,
            title: i18next.Notifications.title,
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
            title: i18next.MyJobs.title,
          },
          {
            to: TALENT_ROUTE,
            title: i18next.Talent.pageTitle,
          },
          {
            to: CREATE_JOB_POST,
            title: i18next.PostJob.title,
          },
        ],
      },
      {
        title: i18next.Chat.title,
        links: [
          {
            to: CHAT_ROUTE,
            title: i18next.Chat.title,
          },
          {
            to: NOTIFICATIONS_ROUTE,
            title: i18next.Notifications.title,
          },
        ],
      },
    ],
    home: CLIENT_HOME,
  },
};

export default navLinksPerRole;
