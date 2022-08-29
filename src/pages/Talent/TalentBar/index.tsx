import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  DISCOVER_ROUTE,
  RECENTLY_VIEWED_ROUTE,
  SAVED_TALENT_ROUTE,
  YOUR_HIRES_ROUTE,
} from "utils/routeConsts";
import SButton from "./styles";

interface ITalentBarButtons {
  title: string;
  path: string;
}

function TalentBar() {
  const [active, setActive] = useState(DISCOVER_ROUTE);

  const talentBarButtons: ITalentBarButtons[] = [
    {
      title: "Talent.Discover.tabName",
      path: DISCOVER_ROUTE,
    },
    {
      title: "Talent.SavedTalent.tabName",
      path: SAVED_TALENT_ROUTE,
    },
    {
      title: "Talent.YourHires.tabName",
      path: YOUR_HIRES_ROUTE,
    },
    {
      title: "Talent.RecentlyViewed.tabName",
      path: RECENTLY_VIEWED_ROUTE,
    },
  ];

  const { t } = useTranslation();

  return (
    <div>
      {talentBarButtons.map(({ title, path }) => (
        <NavLink to={path} onClick={() => setActive(path)}>
          <SButton underline={active === path ? "underline" : "none"}>
            {t(title)}
          </SButton>
        </NavLink>
      ))}
    </div>
  );
}

export default TalentBar;
