import RequireAuth from "components/auth/RequireAuth";
import { Route, Routes } from "react-router-dom";
import protectedRoutes from "routes/protectedRoutes";

import publicRoutes from "routes/publicRoutes";

function Router() {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {protectedRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <RequireAuth>
              <Component />
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  );
}

export default Router;
