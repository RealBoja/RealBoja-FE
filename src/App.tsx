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
        <Route path="/:roomCode/card-result" element={<CardResultPage />} />
        <Route path="/card/:roomCode/join" element={<JoinRoomPage />} />
        <Route path="/card/:roomCode/react" element={<ReactRoomPage />} />
        <Route path="/card/:roomCode/analysis" element={<AnalysisPage />} />
        <Route path="/card/:roomCode/next" element={<NextCardPage />} />
        <Route path="/card/:roomCode/second" element={<SecondCardPage />} />
        <Route
          path="/card/:roomCode/temperature"
          element={<TemperaturePage />}
        />
        <Route
          path="/card/:roomCode/timeslot"
          element={<TimeSlotResultPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
