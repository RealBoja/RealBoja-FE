interface TemperatureGaugeProps {
    temp: number;        // 현재 온도 (0~100)
    message?: string;    // "방에 온기가 돌고 있어요." 같은 문구
}

// 온도에 따라 색 결정
function getTempColor(temp: number) {
    if (temp <= 30) return "var(--color-temp-cold)";
    if (temp <= 50) return "var(--color-temp-alive)";
    if (temp <= 70) return "var(--color-temp-warm)";
    return "var(--color-temp-hot)";
}

// 범례 데이터 (색을 고정값으로 직접 지정 → bg-${color} 문제 방지)
const legends = [
    { color: "var(--color-temp-cold)", label: "냉동방" },
    { color: "var(--color-temp-alive)", label: "생존 확인" },
    { color: "var(--color-temp-warm)", label: "온기 도는 중" },
    { color: "var(--color-temp-hot)", label: "진짜 볼 각" },
];

export default function TemperatureGauge({ temp, message }: TemperatureGaugeProps) {
    const color = getTempColor(temp);

    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            {/* 온도 숫자 + 문구 */}
            <div className="flex items-end gap-3 mb-5">
        <span className="text-[64px] font-extrabold leading-none text-temp-warm">
          {temp}
        </span>
                <span className="text-h2 font-bold text-temp-warm mb-2">℃</span>
                {message && (
                    <span className="text-h2 text-text mb-2 ml-2">{message}</span>
                )}
            </div>

            {/* 게이지 바 */}
            <div className="relative h-5 rounded-full bg-gauge-bg overflow-hidden">
                <div
                    className="h-full rounded-full transition-all"
                    style={{
                        width: `${temp}%`,
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                    }}
                />
                {/* 구간 구분선 30% / 50% / 70% */}
                {[30, 50, 70].map((pos) => (
                    <div
                        key={pos}
                        className="absolute top-0 h-full w-px bg-white/60"
                        style={{ left: `${pos}%` }}
                    />
                ))}
            </div>

            {/* 범례 */}
            <div className="flex justify-between mt-3">
                {legends.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
            <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
            />
                        <span className="text-caption text-muted">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}