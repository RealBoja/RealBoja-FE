// src/pages/NextCardPage.tsx
import MobileLayout from "../components/layout/MobileLayout";
import ShareButton from "../components/common/ShareButton";
import StageProgressBar from "../components/next-card/StageProgressBar";
import ContextSummary from "../components/next-card/ContextSummary";
import NextPromiseCard from "../components/next-card/NextPromiseCard";

interface NextCardPageProps {
  onBack?: () => void;
  onShare?: () => void;
  onAction?: () => void;
}

export default function NextCardPage({ onShare, onAction }: NextCardPageProps) {
  return (
    <MobileLayout
      topBar={
        <div
          className="relative flex items-center justify-between self-stretch px-5 py-4 border-b-[0.8px] border-[#eedccb]"
          style={{ background: "rgba(255, 252, 246, 0.9)" }}
        >
          <div className="w-[60px]" />
          <span className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-orange">
            진짜보자 👀
          </span>
          <div className="w-[60px]" />
        </div>
      }
      bottomCTA={
        <ShareButton onClick={onShare}>일정 조율 카드 공유하기</ShareButton>
      }
    >
      <div className="flex flex-col gap-3">
        {/* 현재 단계 / 다음 목표 */}
        <StageProgressBar
          currentStage="조율 가능 📅"
          nextGoal="가능한 시간대만 좁혀보기"
        />

        {/* 설명 + 만남 목적 */}
        <ContextSummary
          description="만날 마음은 확인됐어요. 이제 날짜를 바로 정하기보다 가능한 시간대부터 가볍게 좁혀볼게요."
          purpose="밥"
        />

        {/* 2차 카드 */}
        <NextPromiseCard
          cardLabel="진짜보자 2차 카드"
          roomMeta="고등학교 친구방 · 밥"
          badgeText="시간만 좁히면 되는 단계"
          title="이제 시간만 좁혀보자"
          descriptions={[
            "밥 먹자는 마음은 확인됐어요.",
            "정확한 날짜는 나중에 정하고, 가능한 시간대만 골라주세요.",
          ]}
          hintText="날짜 확정이 아니에요. 가능한 시간대만 체크해요."
          actionLabel="가능한 시간대 고르기"
          onAction={onAction}
        />
      </div>
    </MobileLayout>
  );
}
