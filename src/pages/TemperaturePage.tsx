import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import Button from "../components/common/Button";
import TemperatureGauge from "../components/temperature/TemperatureGauge";
import ReactionStatRow from "../components/temperature/ReactionStatRow";
import TempLegend from "../components/temperature/TempLegend";
import { Users } from "../components/common/icons";

const REACTIONS = [
  { emoji: "🔥", label: "나 진짜 볼래", count: 2, names: ["수현", "민지"] },
  {
    emoji: "🍚",
    label: "밥이면 감",
    count: 3,
    names: ["지훈", "예린", "동현"],
  },
  { emoji: "🙋", label: "누가 잡으면 감", count: 2, names: ["서연", "준호"] },
  { emoji: "👀", label: "일단 생존신고", count: 0, names: [] },
];

// 공개 기준 인원수 - 아직 미정이라 여기서 관리, 추후 기획 확정되면 이 값만 수정
const UNLOCK_THRESHOLD = 3;

interface TemperaturePageProps {
  respondedCount?: number;
  totalCount?: number;
  onResultClick?: () => void;
  onMoreReactionClick?: () => void;
}

export default function TemperaturePage({
  respondedCount = 5,
  totalCount = 8,
  onResultClick,
  onMoreReactionClick,
}: TemperaturePageProps) {
  const isUnlocked = respondedCount >= UNLOCK_THRESHOLD;

  return (
    <MobileLayout
      topBar={<TopBar />}
      bottomCTA={
        isUnlocked ? (
          <Button variant="primary" onClick={onResultClick}>
            결과 카드 보기
          </Button>
        ) : (
          <Button variant="ghost" onClick={onMoreReactionClick}>
            반응 남기기
          </Button>
        )
      }
    >
      {/* 고정 표시 부분 */}
      <div className="pb-4">
        <TemperatureGauge temp={64} message="방에 온기가 돌고 있어요. 🌡️" />
      </div>

      <div className="pb-4">
        <div className="flex items-center self-stretch gap-3 px-5 py-4 rounded-2xl bg-section border-[0.8px] border-border">
          <Users size={20} className="text-orange" />
          <div className="flex flex-col w-[220px]">
            <p className="text-sm font-bold text-text">
              방 인원 {totalCount}명 중 {respondedCount}명이 반응했어요
            </p>
            <div className="flex gap-1 pt-1.5">
              {Array.from({ length: totalCount }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-2 rounded-full ${
                    i < respondedCount ? "bg-orange" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 조건부 블러 부분 - 반응 요약 */}
      <div className="pb-4">
        <p className="text-sm font-bold text-text pb-2">반응 요약</p>

        <div className="relative">
          <div
            className={`flex flex-col gap-2 ${
              !isUnlocked ? "blur-md select-none pointer-events-none" : ""
            }`}
          >
            {REACTIONS.map((r) => (
              <ReactionStatRow
                key={r.label}
                emoji={r.emoji}
                label={r.label}
                count={r.count}
                names={r.names}
              />
            ))}
          </div>

          {!isUnlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <p>🔒</p>
              <p className="text-xs font-bold text-text">
                반응이 더 모이면 공개돼요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 온도 기준 - 항상 보임 */}
      <div className="pb-4">
        <TempLegend />
      </div>
    </MobileLayout>
  );
}
