import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";

// 반응 데이터
const reactions = [
  { emoji: "🍚", label: "밥이면 감", count: 4, ratio: 4 / 4 },
  { emoji: "🙋", label: "누가 잡으면 감", count: 3, ratio: 3 / 4 },
  { emoji: "🔥", label: "나 진짜 볼래", count: 1, ratio: 1 / 4 },
  { emoji: "👀", label: "일단 생존신고", count: 1, ratio: 1 / 4 },
];

// 약속 진행 단계
const stages = [
  { label: "냉동방", active: false },
  { label: "해동중", active: false },
  { label: "온기 도는 중", active: false },
  { label: "조율 가능", active: true },
  { label: "진짜 볼 각", active: false },
];

interface ResultPageProps {
  onBack?: () => void;
  onShare?: () => void;
  onMoreReaction?: () => void;
  onNextCard?: () => void;
}

export default function ResultPage({
  onBack,
  onShare,
  onMoreReaction,
  onNextCard,
}: ResultPageProps) {
  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={onBack} />}
      bottomCTA={
        <div className="flex flex-col gap-2">
          <ShareButton onClick={onShare}>결과 카드 공유하기</ShareButton>
          <div className="flex gap-2">
            <button
              onClick={onMoreReaction}
              className="flex-1 py-3.5 rounded-2xl bg-bg border-[0.8px] border-border text-sm font-medium text-muted hover:bg-section transition"
            >
              반응 더 받기
            </button>
            <button
              onClick={onNextCard}
              className="flex-1 py-3.5 rounded-2xl bg-bg border-[0.8px] border-border text-sm font-medium text-muted hover:bg-section transition"
            >
              다음 카드 만들기
            </button>
          </div>
        </div>
      }
    >
      {/* 페이지 제목 */}
      <div className="pb-4">
        <p className="text-xl font-bold text-text">방 분석 결과 카드</p>
        <p className="pt-1 text-sm text-muted">
          카드가 방 상태를 대신 말해줘요.
        </p>
      </div>

      {/* 결과 카드 */}
      <div
        className="flex flex-col gap-3 p-5 rounded-3xl bg-cardWeak border-[0.8px] border-border-point"
        style={{ boxShadow: "0px 4px 20px 0 rgba(36,21,14,0.08)" }}
      >
        {/* 날짜 */}
        <p className="text-[10px] font-bold uppercase text-muted">
          진짜보자 분석 · 2024.06.26
        </p>

        {/* 방 유형 뱃지 */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange w-fit">
          <p className="text-sm font-bold text-white">총대 실종형 방 발견 📍</p>
        </div>

        {/* 약속 온도 + 참여율 */}
        <div className="flex gap-2.5">
          <div className="flex-1 flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
            <p className="text-[10px] text-center text-muted">약속 온도</p>
            <p className="pt-1 text-[28px] font-black text-center text-orange leading-none">
              72℃
            </p>
          </div>
          <div className="flex-1 flex flex-col p-3 rounded-2xl bg-card border-[0.8px] border-border">
            <p className="text-[10px] text-center text-muted">참여율</p>
            <p className="pt-1 text-center leading-none">
              <span className="text-[28px] font-black text-text">5</span>
              <span className="text-sm text-muted">/8명</span>
            </p>
          </div>
        </div>

        {/* 반응 요약 */}
        <div className="p-4 rounded-2xl bg-card border-[0.8px] border-border">
          <p className="text-[10px] font-bold uppercase text-muted">
            반응 요약
          </p>
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

        {/* 결과 분석 */}
        <div className="p-4 rounded-2xl bg-card border-[0.8px] border-border">
          <p className="text-[10px] font-bold uppercase text-orange">
            결과 분석
          </p>
          <p className="pt-1.5 text-xs text-text">
            이 방은 만날 마음은 있지만, 아직 누가 먼저 잡을지 정해지지 않은
            상태예요.
          </p>
        </div>
      </div>

      {/* 약속 진행 단계 */}
      <div className="mt-4 p-4 rounded-2xl bg-card border-[0.8px] border-border">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase text-muted">
            약속 진행 단계
          </p>
          <span className="px-2 py-0.5 rounded-full bg-orange text-[10px] font-bold text-white">
            조율 가능
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
          <span className="font-bold text-text">메뉴와 시간대를 좁혀보기</span>
        </p>
      </div>
    </MobileLayout>
  );
}
