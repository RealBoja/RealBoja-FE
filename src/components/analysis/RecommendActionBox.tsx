// src/components/analysis/RecommendActionBox.tsx
interface Stage {
  label: string;
  active: boolean;
}

interface RecommendActionBoxProps {
  stages: Stage[];
  currentStageLabel: string;
  nextGoal: string;
}

export default function RecommendActionBox({
  stages,
  currentStageLabel,
  nextGoal,
}: RecommendActionBoxProps) {
  return (
    <div className="p-4 rounded-2xl bg-card border-[0.8px] border-border">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase text-muted">
          약속 진행 단계
        </p>
        <span className="px-2 py-0.5 rounded-full bg-orange text-[10px] font-bold text-white">
          {currentStageLabel}
        </span>
      </div>

      {/* 단계 바 */}
      <div className="flex gap-1 pt-3">
        {stages.map((s) => (
          <div
            key={s.label}
            className="flex-1 h-2 rounded-full"
            style={{
              backgroundColor: s.active ? "#e9782f" : "#fff1e3",
              border: s.active ? "0.8px solid #d85f1f" : undefined,
            }}
          />
        ))}
      </div>

      {/* 단계 라벨 */}
      <div className="flex pt-2">
        {stages.map((s) => (
          <p
            key={s.label}
            className="flex-1 text-[8px] font-bold text-center"
            style={{ color: s.active ? "#e9782f" : "#7b6658" }}
          >
            {s.label}
          </p>
        ))}
      </div>

      {/* 다음 목표 */}
      <p className="pt-2 text-[10px]">
        <span className="text-muted">다음 목표: </span>
        <span className="font-bold text-text">{nextGoal}</span>
      </p>
    </div>
  );
}
