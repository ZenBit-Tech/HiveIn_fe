import CheckRole from "components/auth/CheckRole";
import RequireAuth from "components/auth/RequireAuth";
import RequireRole from "components/auth/RequireRole";
import SignedInRouteBlocker from "components/auth/SignedInRouteBlocker";
import CompleteRegistration from "pages/Auth/CompleteRegistration/CompleteRegistration";
import { Route, Routes } from "react-router-dom";
import authenticationRoutes from "routes/authenticationRoutes";
import clientRoutes from "routes/clientRoutes";
import freelancerRoutes from "routes/freeelancerRoutes";
import protectedRoutes from "routes/protectedRoutes";
import publicRoutes from "routes/publicRoutes";
import {
  CLIENT_HOME,
  COMPLETE_REGISTRATION_ROUTE,
  SEARCH_WORK_ROUTE,
} from "utils/consts/routeConsts";

function Router() {
  return (
    <Routes>
      <Route
        path={COMPLETE_REGISTRATION_ROUTE}
        element={
          <RequireRole>
            <CompleteRegistration />
          </RequireRole>
        }
      />
      {authenticationRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <SignedInRouteBlocker>
              <Component />
            </SignedInRouteBlocker>
          }
        />
      ))}
      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {protectedRoutes.map(({ path, component: Component }) => (
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
      {freelancerRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <RequireAuth>
              <CheckRole guardRole="freelancer" route={CLIENT_HOME}>
                <Component />
              </CheckRole>
            </RequireAuth>
          }
        />
      ))}
      {clientRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <RequireAuth>
              <CheckRole guardRole="client" route={SEARCH_WORK_ROUTE}>
                <Component />
              </CheckRole>
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  );
}

export default Router;
