import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";
import AnalysisSummaryCard from "../components/analysis/AnalysisSummaryCard";
import RecommendActionBox from "../components/analysis/RecommendActionBox";

const reactions = [
  { emoji: "🍚", label: "밥이면 감", count: 4, ratio: 4 / 4 },
  { emoji: "🙋", label: "누가 잡으면 감", count: 3, ratio: 3 / 4 },
  { emoji: "🔥", label: "나 진짜 볼래", count: 1, ratio: 1 / 4 },
  { emoji: "👀", label: "일단 생존신고", count: 1, ratio: 1 / 4 },
];

const stages = [
  { label: "냉동방", active: false },
  { label: "해동중", active: false },
  { label: "온기 도는 중", active: false },
  { label: "조율 가능", active: true },
  { label: "진짜 볼 각", active: false },
];

const participantCount = 5;
const totalCount = 8;

// 과반수 여부: 반응한 사람이 전체 인원의 절반 초과
const isMajority = participantCount > totalCount / 2;

interface AnalysisPageProps {
  onBack?: () => void;
  onShare?: () => void;
  onMoreReaction?: () => void;
  onNextCard?: () => void;
}

export default function AnalysisPage({
  onBack,
  onShare,
  onMoreReaction,
  onNextCard,
}: AnalysisPageProps) {
  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={onBack} />}
      bottomCTA={
        <div className="flex flex-col gap-2">
          <ShareButton onClick={onShare}>결과 카드 공유하기</ShareButton>
          <div className="flex gap-2">
            <button
              onClick={onMoreReaction}
              className={`flex-1 py-3.5 rounded-2xl border-[0.8px] text-sm font-medium transition`}
            >
              한번 더 알리기
            </button>
            <button
              onClick={onNextCard}
              disabled={!isMajority}
              className={`flex-1 py-3.5 rounded-2xl border-[0.8px] text-sm font-medium transition
                ${
                  isMajority
                    ? "bg-bg border-border text-muted hover:bg-section"
                    : "bg-bg border-border text-muted/40 cursor-not-allowed"
                }`}
            >
              일정 조율하기
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

      {/* 결과 요약 카드 */}
      <AnalysisSummaryCard
        date="2024.06.26"
        roomTypeLabel="총대 실종형 방 발견 📍"
        temp={72}
        participantCount={participantCount}
        totalCount={totalCount}
        reactions={reactions}
        insightText="이 방은 만날 마음은 있지만, 아직 누가 먼저 잡을지 정해지지 않은 상태예요."
      />

      {/* 약속 진행 단계 */}
      <div className="mt-4">
        <RecommendActionBox
          stages={stages}
          currentStageLabel="조율 가능"
          nextGoal="메뉴와 시간대를 좁혀보기"
        />
      </div>
    </MobileLayout>
  );
}
