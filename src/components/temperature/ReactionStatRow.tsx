interface ReactionStatRowProps {
  emoji: string;
  label: string;
  count: number;
  maxCount: number; // 비율 계산용 (가장 큰 값 기준)
}

export default function ReactionStatRow({
  emoji,
  label,
  count,
  maxCount,
}: ReactionStatRowProps) {
  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

  return (
    <div className="flex items-center self-stretch gap-3 px-4 py-3 rounded-[14px] bg-card border-[0.8px] border-border">
      <p className="text-base">{emoji}</p>
      <p className="flex-grow text-sm text-text">{label}</p>
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted/20">
          <div
            className="h-full rounded-full bg-orange"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="w-4 text-right text-sm font-bold text-text">{count}</p>
      </div>
    </div>
  );
}
