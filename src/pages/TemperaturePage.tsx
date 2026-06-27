import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import TemperatureGauge from "../components/temperature/TemperatureGauge";
import ReactionStatRow from "../components/temperature/ReactionStatRow";
import TempLegend from "../components/temperature/TempLegend";
import { Users } from "../components/common/icons";

const REACTIONS = [
  { emoji: "🔥", label: "나 진짜 볼래", count: 1 },
  { emoji: "🍚", label: "밥이면 감", count: 2 },
  { emoji: "🙋", label: "누가 잡으면 감", count: 2 },
  { emoji: "👀", label: "일단 생존신고", count: 0 },
];

export default function TemperaturePage() {
  const maxCount = Math.max(...REACTIONS.map((r) => r.count), 1);

  return (
    <MobileLayout
      topBar={<TopBar />}
      bottomCTA={<Button variant="primary">결과 카드 보기</Button>}
    >
      <div className="pb-4">
        <TemperatureGauge temp={64} message="방에 온기가 돌고 있어요. 🌡️" />
      </div>

      <div className="pb-4">
        <div className="flex items-center self-stretch gap-3 px-5 py-4 rounded-2xl bg-section border-[0.8px] border-border">
          <Users size={20} className="text-orange" />
          <div className="flex flex-col w-[220px]">
            <p className="text-sm font-bold text-text">
              방 인원 8명 중 5명이 반응했어요
            </p>
            <div className="flex gap-1 pt-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-2 rounded-full ${
                    i < 5 ? "bg-orange" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <p className="text-sm font-bold text-text">반응 요약</p>
        <div className="flex flex-col gap-2 pt-2">
          {REACTIONS.map((r) => (
            <ReactionStatRow
              key={r.label}
              emoji={r.emoji}
              label={r.label}
              count={r.count}
              maxCount={maxCount}
            />
          ))}
        </div>
      </div>

      <div className="pb-4">
        <TempLegend />
      </div>
    </MobileLayout>
  );
}
