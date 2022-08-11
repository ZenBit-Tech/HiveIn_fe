import { Route, Routes } from "react-router-dom";
import publicRoutes from "routes/publicRoutes";

function Router() {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}

export default Router;
