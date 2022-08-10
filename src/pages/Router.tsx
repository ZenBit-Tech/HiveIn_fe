import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SearchWork from "./SearchWork";
import Proposals from "./Proposals";
import MyContracts from "./MyContracts";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-work" element={<SearchWork />} />
      <Route path="/proposals" element={<Proposals />} />
      <Route path="/my-contracts" element={<MyContracts />} />
      <Route path="/messages" element={<Home />} />
      <Route path="/settings" element={<Home />} />
      <Route path="/profile" element={<Home />} />
    </Routes>
  );
}

export default Router;
