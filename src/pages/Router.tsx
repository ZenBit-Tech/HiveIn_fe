import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import ReduxTest from "./ReduxTest";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/redux-test" element={<ReduxTest />} />
    </Routes>
  );
}

export default Router;
