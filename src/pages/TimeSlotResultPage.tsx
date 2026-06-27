import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";
import TimeSlotResultRow from "../components/card/TimeSlotResultRow";

// 전체 5개 시간대 (0명이어도 다 포함)
const ALL_RESULTS = [
  { label: "토요일 저녁", count: 3, names: ["승하", "민지", "수현"] },
  { label: "평일 저녁", count: 1, names: ["지훈"] },
  { label: "이번 달 안이면 감", count: 1, names: ["예린"] },
  { label: "토요일 낮", count: 0, names: [] },
  { label: "일요일 오후", count: 0, names: [] },
];

const TOTAL_COUNT = 5;

interface TimeSlotResultPageProps {
  onBack?: () => void;
  onShare?: () => void;
}

export default function TimeSlotResultPage({
  onBack,
  onShare,
}: TimeSlotResultPageProps) {
  // 0명인 시간대는 결과에서 제외, 응답 많은 순으로 정렬
  const RESULTS = ALL_RESULTS.filter((r) => r.count > 0).sort(
    (a, b) => b.count - a.count,
  );

  const TOP_RESULT = RESULTS[0];

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={onBack} />}
      bottomCTA={
        <ShareButton onClick={onShare}>시간대 결과 공유하기</ShareButton>
      }
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xl font-bold text-text">시간대 결과가 모였어요</p>
          <p className="pt-0.5 text-xs text-muted">
            가장 많이 선택된 시간대를 기준으로 단톡방에서 세부 일정을
            정해보세요.
          </p>
        </div>

        <div
          className="flex flex-col gap-2.5 p-4 rounded-3xl bg-cardWeak border-[0.8px] border-border-point"
          style={{ boxShadow: "0px 4px 20px 0 rgba(36,21,14,0.08)" }}
        >
          <p className="text-[9px] font-bold uppercase text-muted">
            진짜보자 시간대 결과
          </p>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange w-fit">
            <p className="text-sm font-bold text-white">진짜 볼 각 🔥</p>
          </div>

          <div className="flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
            <p className="text-[9px] font-bold uppercase text-orange">
              가장 많이 나온 시간대
            </p>
            <div className="flex items-center gap-2 pt-1">
              <p className="text-lg font-black text-text">{TOP_RESULT.label}</p>
              <span className="px-2 py-0.5 rounded-full bg-orange">
                <p className="text-[10px] font-bold text-white">최다 선택</p>
              </span>
            </div>
            <p className="text-xs text-muted pt-1">
              {TOTAL_COUNT}명 중 {TOP_RESULT.count}명이 {TOP_RESULT.label}을
              선택했어요.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {TOP_RESULT.names.map((name) => (
                <span
                  key={name}
                  className="px-2 py-0.5 rounded-full bg-orange-light border-[0.8px] border-border-point text-[10px] font-medium text-orange-dark"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* 전체 결과 - 응답 있는 시간대만 동적으로 표시 */}
          <div className="flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
            <p className="text-[9px] font-bold uppercase text-muted">
              전체 결과
            </p>
            <div className="flex flex-col gap-2 pt-2">
              {RESULTS.map((r, index) => (
                <TimeSlotResultRow
                  key={r.label}
                  label={r.label}
                  count={r.count}
                  names={r.names}
                  isTop={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col px-4 py-3 rounded-[14px] bg-orange">
            <p className="text-xs font-bold text-white">이제 거의 다 왔어요.</p>
            <p className="text-[10px] text-white/80 pt-1">
              {TOP_RESULT.label}에 가능한 사람이 가장 많아요.
              <br />
              이제 단톡방에서 날짜와 장소만 정하면 돼요.
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
