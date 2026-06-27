const LEGEND_ITEMS = [
  { color: "bg-blue-400", label: "0~30℃ 냉동방" },
  { color: "bg-emerald-400", label: "31~50℃ 해동중" },
  { color: "bg-amber-400", label: "51~70℃ 온기 도는 중" },
  { color: "bg-orange", label: "71~100℃ 진짜 볼 각" },
];

export default function TempLegend() {
  return (
    <div className="px-4 py-3 rounded-[14px] bg-card border-[0.8px] border-border">
      <p className="text-[10px] font-bold uppercase text-muted">온도 기준</p>
      <div className="grid grid-cols-2 gap-y-2 pt-2">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.color}`} />
            <p className="text-xs text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
