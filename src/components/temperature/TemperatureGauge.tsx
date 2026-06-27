interface TemperatureGaugeProps {
  temp: number;
  message?: string;
}

function getTempColor(temp: number) {
  if (temp <= 30) return "#60A5FA";
  if (temp <= 50) return "#34D399";
  if (temp <= 70) return "#FBBF24";
  return "#E9782F";
}

export default function TemperatureGauge({
  temp,
  message,
}: TemperatureGaugeProps) {
  const color = getTempColor(temp);

  return (
    <div className="flex flex-col items-center self-stretch p-6 rounded-3xl bg-white border-[0.8px] border-border">
      <p className="text-xs font-medium text-muted">현재 약속 온도</p>

      <div className="flex justify-center items-end gap-1 pt-1">
        <p className="text-6xl font-black" style={{ color }}>
          {temp}
        </p>
        <p className="text-2xl font-bold pb-2 text-muted">℃</p>
      </div>

      <div className="relative self-stretch h-5 mt-3 rounded-full overflow-hidden bg-muted/[0.27]">
        <div
          className="h-5 rounded-full"
          style={{
            width: `${temp}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
        {[30, 50, 70].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 w-px h-5 bg-white/70"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      {message && <p className="text-sm font-bold text-text pt-3">{message}</p>}
    </div>
  );
}
