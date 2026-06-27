interface ReactionStatRowProps {
  emoji: string;
  label: string;
  count: number;
  names: string[]; // 참여자 닉네임 목록
}

export default function ReactionStatRow({
  emoji,
  label,
  count,
  names,
}: ReactionStatRowProps) {
  const hasNames = names.length > 0;

  return (
    <div className="flex flex-col self-stretch px-3 py-2.5 rounded-[14px] bg-card border-[0.8px] border-border">
      {/* 상단: 이모지 + 라벨 + 인원수 */}
      <div className="flex justify-between items-center self-stretch">
        <div className="flex items-center gap-1.5">
          <p className="text-base">{emoji}</p>
          <p className="text-xs font-bold text-text">{label}</p>
        </div>
        <p
          className={`text-[10px] font-bold ${
            count > 0 ? "text-orange" : "text-border"
          }`}
        >
          {count}명
        </p>
      </div>

      {/* 하단: 닉네임 칩들 */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {hasNames ? (
          names.map((name) => (
            <span
              key={name}
              className="px-2 py-0.5 rounded-full bg-orange-light border-[0.8px] border-border-point text-[10px] font-medium text-orange-dark"
            >
              {name}
            </span>
          ))
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-border text-[10px] font-medium text-muted">
            아직 없음
          </span>
        )}
      </div>
    </div>
  );
}
