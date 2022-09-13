import React from "react";
import { NavLink } from "react-router-dom";
import i18next from "localization/en/en.json";
import {
  SETTINGS_CONTACT_INFO_ROUTE,
  SETTINGS_ROUTE,
} from "utils/consts/routeConsts";
import { SButton } from "components/settingsMenu/styles";
import { PRIMARY, DISABLED } from "utils/consts/colorConsts";

function SettingsMenu() {
  return (
    <div>
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: PRIMARY } : { color: DISABLED }
        }
        to={SETTINGS_ROUTE}
      >
        <SButton>{i18next.settingMenuButtonsNames.profile}</SButton>
      </NavLink>
      <NavLink
        style={({ isActive }) =>
          isActive ? { color: PRIMARY } : { color: DISABLED }
        }
        to={SETTINGS_CONTACT_INFO_ROUTE}
      >
        <SButton>{i18next.settingMenuButtonsNames.contacts}</SButton>
      </NavLink>
    </div>
  );
}

export default SettingsMenu;
