// src/components/analysis/AnalysisSummaryCard.tsx
import StatBox from "./StatBox";
import AIInsightBox from "./AIInsightBox";

interface Reaction {
  emoji: string;
  label: string;
  count: number;
  ratio: number;
}

interface AnalysisSummaryCardProps {
  date: string;
  roomTypeLabel: string;
  temp: number;
  participantCount: number;
  totalCount: number;
  reactions: Reaction[];
  insightText: string;
}

export default function AnalysisSummaryCard({
  date,
  roomTypeLabel,
  temp,
  participantCount,
  totalCount,
  reactions,
  insightText,
}: AnalysisSummaryCardProps) {
  return (
    <div
      className="flex flex-col gap-3 p-5 rounded-3xl bg-cardWeak border-[0.8px] border-border-point"
      style={{ boxShadow: "0px 4px 20px 0 rgba(36,21,14,0.08)" }}
    >
      {/* 날짜 */}
      <p className="text-[10px] font-bold uppercase text-muted">
        진짜보자 분석 · {date}
      </p>

      {/* 방 유형 뱃지 */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange w-fit">
        <p className="text-sm font-bold text-white">{roomTypeLabel}</p>
      </div>

      {/* 약속 온도 + 참여율 */}
      <div className="flex gap-2.5">
        <StatBox label="약속 온도">
          <span className="text-[28px] font-black text-orange">{temp}℃</span>
        </StatBox>
        <StatBox label="참여율">
          <span className="text-[28px] font-black text-text">
            {participantCount}
          </span>
          <span className="text-sm text-muted">/{totalCount}명</span>
        </StatBox>
      </div>

      {/* 반응 요약 */}
      <div className="p-4 rounded-2xl bg-card border-[0.8px] border-border">
        <p className="text-[10px] font-bold uppercase text-muted">반응 요약</p>
        <div className="flex flex-col gap-2 pt-2.5">
          {reactions.map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <span className="w-5 text-sm">{r.emoji}</span>
              <div className="flex-1 h-1.5 rounded-full bg-gauge-bg overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange"
                  style={{ width: `${r.ratio * 100}%` }}
                />
              </div>
              <span className="w-16 text-xs text-muted">{r.label}</span>
              <span className="w-4 text-sm font-bold text-right text-text">
                {r.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI 분석 */}
      <AIInsightBox text={insightText} />
    </div>
  );
}
