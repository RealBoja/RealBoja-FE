// src/pages/ReactRoomPage.tsx
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/common/TopBar";
import ReactionGrid from "@/components/common/ReactionGrid";
import ParticipantStatusCard from "@/components/reaction/ParticipantStatusCard";
import ReactionCardPreview from "@/components/reaction/ReactionCardPreview";

interface ReactRoomPageProps {
  nickname?: string;
  onSubmit?: (reaction: string) => void;
  onViewStatus?: () => void;
  onBack?: () => void;
}

export default function ReactRoomPage({
  nickname = "수현",
  onSubmit,
  onViewStatus,
  onBack,
}: ReactRoomPageProps) {
  const [reaction, setReaction] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!reaction) return;
    onSubmit?.(reaction);
  };

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={onBack} />}
      bottomCTA={
        <div className="flex flex-col gap-3">
          {/* 반응 남기기: 반응 선택 전엔 비활성화 스타일 */}
          <button
            onClick={handleSubmit}
            disabled={!reaction}
            className={`w-full h-14 rounded-2xl text-base font-bold transition
              ${
                reaction
                  ? "bg-orange text-white"
                  : "bg-[#eedccb] text-muted cursor-not-allowed"
              }`}
            style={
              reaction
                ? { boxShadow: "0px 4px 16px 0 rgba(233,120,47,0.3)" }
                : undefined
            }
          >
            반응 남기기
          </button>
          {/* 현재 상태 확인하기 */}
          <button
            onClick={onViewStatus}
            className="w-full h-[45.6px] rounded-2xl border-[0.8px] border-[#eedccb] text-sm font-medium text-muted hover:bg-section transition"
          >
            현재 상태 확인하기
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {/* 참여자 상태 카드 */}
        <ParticipantStatusCard
          nickname={nickname}
          roomMeta="고등학교 친구방 · 밥"
          temp={18}
          reactionCount={3}
          totalCount={8}
        />

        {/* 카드 미리보기 */}
        <ReactionCardPreview
          title="'나중에 보자'만 반복 중"
          description="생존자 3명부터 약속 해동 시작"
        />

        {/* 나는 이 방에서… 구분선 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-[#eedccb]" />
          <p className="px-2 text-xs font-bold text-text">나는 이 방에서…</p>
          <div className="flex-1 h-px bg-[#eedccb]" />
        </div>

        {/* 반응 그리드 */}
        <ReactionGrid onSelect={setReaction} />

        {/* 안내 문구 */}
        <p className="text-[10px] text-center text-muted">
          * 반응 후에 방 분위기와 현재 상태를 더 자세히 볼 수 있어요.
        </p>
      </div>
    </MobileLayout>
  );
}
