import React from "react";
import { NavLink } from "react-router-dom";
import { SETTINGS_CONTACT_INFO_ROUTE, SETTINGS_ROUTE } from "utils/routeConsts";
import { SButton } from "components/settingsMenu/styles";
import i18next from "localization/en/en.json";

function SettingsMenu() {
  return (
    <div>
      <NavLink to={SETTINGS_ROUTE}>
        <SButton>{i18next.settingMenuButtonsNames.profile}</SButton>
      </NavLink>
      <NavLink to={SETTINGS_CONTACT_INFO_ROUTE}>
        <SButton>{i18next.settingMenuButtonsNames.contacts}</SButton>
      </NavLink>
    </div>
  );
}

export default SettingsMenu;
