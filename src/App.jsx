import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import JoinPage from "./pages/JoinPage";
import MusicPage from "./pages/MusicPage";
import BiographyPage from "./pages/BiographyPage";
import ShowsPage from "./pages/ShowsPage";
import TravelPage from "./pages/TravelPage";
import UpdatesPage from "./pages/UpdatesPage";
import PrivateListPage from "./pages/PrivateListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/biography" element={<BiographyPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/private-list" element={<PrivateListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
