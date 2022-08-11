import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SearchWork from "./SearchWork";
import Proposals from "./Proposals";
import MyContracts from "./MyContracts";
import Chat from "./Chat";
import Settings from "./Settings";
import Profile from "./Profile";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-work" element={<SearchWork />} />
      <Route path="/proposals" element={<Proposals />} />
      <Route path="/my-contracts" element={<MyContracts />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default Router;
