interface TimeSlotResultRowProps {
  label: string;
  count: number;
  names: string[];
  isTop?: boolean; // 최다 선택 여부
}

export default function TimeSlotResultRow({
  label,
  count,
  names,
  isTop = false,
}: TimeSlotResultRowProps) {
  return (
    <div
      className={`flex flex-col self-stretch p-2.5 rounded-[14px] border-[0.8px] ${
        isTop ? "bg-orange-light border-border-point" : "bg-bg border-border"
      }`}
    >
      <div className="flex justify-between items-center self-stretch">
        <div className="flex items-center gap-1.5">
          <p
            className={`text-xs font-bold ${
              isTop ? "text-text" : "text-muted"
            }`}
          >
            {label}
          </p>
          {isTop && (
            <span className="px-1.5 py-0.5 rounded-full bg-orange">
              <p className="text-[9px] font-bold text-white">최다 선택</p>
            </span>
          )}
        </div>
        <p className="text-[10px] font-bold text-orange">{count}명</p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1.5">
        {names.map((name) => (
          <span
            key={name}
            className="px-2 py-0.5 rounded-full bg-orange-light border-[0.8px] border-border-point text-[10px] font-medium text-orange-dark"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
