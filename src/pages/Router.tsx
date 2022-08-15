import RequireAuth from "components/auth/RequireAuth";
import SignedInRouteBlocker from "components/auth/SignedInRouteBlocker";
import { Route, Routes } from "react-router-dom";
import authenticationRoutes from "routes/authenticationRoutes";
import protectedRoutes from "routes/protectedRoutes";
import publicRoutes from "routes/publicRoutes";

function Router() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default Router;
