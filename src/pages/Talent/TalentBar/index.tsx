import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { DISCOVER_ROUTE, SAVED_TALENT_ROUTE } from "utils/routeConsts";
import SButton from "./styles";

function TalentBar() {
  const [active, setActive] = useState(DISCOVER_ROUTE);

  return (
    <div>
      <NavLink to={DISCOVER_ROUTE} onClick={() => setActive(DISCOVER_ROUTE)}>
        <SButton underline={active === DISCOVER_ROUTE ? "underline" : "none"}>
          Discover
        </SButton>
      </NavLink>
      <NavLink
        to={SAVED_TALENT_ROUTE}
        onClick={() => setActive(SAVED_TALENT_ROUTE)}
      >
        <SButton
          underline={active === SAVED_TALENT_ROUTE ? "underline" : "none"}
        >
          Saved talent
        </SButton>
      </NavLink>
    </div>
  );
}

export default TalentBar;
