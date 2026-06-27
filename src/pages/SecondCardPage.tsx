import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";
import { submitSchedule } from "../api/roomApi";

const TIME_OPTIONS = [
  "평일 점심",
  "평일 저녁",
  "토요일 점심",
  "토요일 저녁",
  "일요일 점심",
  "일요일 저녁",
];

export default function SecondCardPage() {
  const navigate = useNavigate();
  const { roomCode } = useParams<{ roomCode: string }>();

  const [selected, setSelected] = useState<string[]>([]);
  const [station, setStation] = useState("");
  const [loading, setLoading] = useState(false);

  const nickname = localStorage.getItem("nickname") ?? "익명";

  // 여러 개 선택/해제 토글
  const toggle = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0 || !station.trim() || !roomCode) {
      alert("시간대와 출발역을 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await submitSchedule(roomCode, nickname, station, selected);
      navigate(`/card/${roomCode}/timeslot`); // ← 여기 수정
    } catch (e) {
      console.error(e);
      alert("시간대 남기기에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout
      topBar={<TopBar />}
      bottomCTA={
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={selected.length === 0 || !station.trim() || loading}
        >
          {loading ? "남기는 중..." : "시간 & 장소 정하기"}
        </Button>
      }
    >
      {/* 일정 카드 */}
      <div
        className="overflow-hidden rounded-2xl border-[0.8px] border-border-point"
        style={{ boxShadow: "0px 4px 16px 0 rgba(36,21,14,0.08)" }}
      >
        <div className="flex items-center justify-between border-b-[0.8px] border-border-point bg-cardWeak px-4 py-2.5">
          <span className="text-[9px] font-bold uppercase text-orange">
            진짜보자 일정 카드
          </span>
          <span className="text-[9px] text-muted">고등학교 친구방 · 밥</span>
        </div>
        <div className="bg-card px-4 py-3">
          <p className="text-sm font-bold text-text">
            이제 시간과 장소를 좁혀보자
          </p>
          <p className="pt-1 text-xs text-muted">
            가능한 시간대와 출발역만 골라주세요.
          </p>
        </div>
      </div>

      {/* 참여 현황 박스 */}
      <div className="mt-3 flex items-center justify-between rounded-[14px] border-[0.8px] border-border bg-section px-4 py-2.5">
        <span className="text-xs font-bold text-text">
          현재 3명이 의견을 남겼어요
        </span>
        <span className="rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold text-white">
          5명 중
        </span>
      </div>

      {/* 안내 문구 */}
      <p className="mt-3 text-[10px] text-muted">
        내 선택을 남기면 시간대 결과와
        <br />
        친구들의 출발역을 모아 AI가 만나기 편한 장소 후보를 추천해드려요.
      </p>

      {/* 언제가 편해? + 중복선택 안내 */}
      <div className="mt-3 self-stretch">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-text">언제가 편해?</p>
          <p className="text-[10px] text-muted">*중복선택가능</p>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {TIME_OPTIONS.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`
                  rounded-[14px] border-[0.8px] py-3 text-center text-sm font-bold transition
                  ${
                    isSelected
                      ? "border-orange bg-orange-light text-orange-dark"
                      : "border-border bg-card text-text hover:bg-section"
                  }
                `}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* 어디에서 출발해? */}
      <div className="mt-6 self-stretch">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-text">어디에서 출발해?</p>
          <p className="text-[10px] text-muted">*편한 역을 입력해주세요</p>
        </div>
        <div className="mt-2">
          <TextInput
            placeholder="예: 서울역"
            value={station}
            onChange={setStation}
          />
        </div>
      </div>
    </MobileLayout>
  );
}
