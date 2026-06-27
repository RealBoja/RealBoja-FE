import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import CardFormPage from "@/pages/CardFormPage";
import CardResultPage from "@/pages/CardResultPage";
import JoinRoomPage from "@/pages/JoinRoomPage";
import ReactRoomPage from "@/pages/ReactRoomPage";
import AnalysisPage from "@/pages/AnalysisPage";
import NextCardPage from "@/pages/NextCardPage";
import SecondCardPage from "@/pages/SecondCardPage";
import TemperaturePage from "@/pages/TemperaturePage";
import TimeSlotResultPage from "@/pages/TimeSlotResultPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CardFormPage />} />
        <Route path="/:roomId/card-result" element={<CardResultPage />} />
        <Route path="/card/:roomId/join" element={<JoinRoomPage />} />
        <Route path="/:roomId/react" element={<ReactRoomPage />} />
        <Route path="/:roomId/analysis" element={<AnalysisPage />} />
        <Route path="/:roomId/next" element={<NextCardPage />} />
        <Route path="/:roomId/second" element={<SecondCardPage />} />
        <Route path="/:roomId/temperature" element={<TemperaturePage />} />
        <Route path="/:roomId/timeslot" element={<TimeSlotResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
