// src/pages/JoinRoomPage.tsx
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import TextInput from "@/components/common/TextInput";
import Button from "@/components/common/Button";
import PromiseCardPreview from "@/components/join/PromiseCardPreview";
import JoinHintBox from "@/components/join/JoinHintBox";

interface JoinRoomPageProps {
  onJoin?: (nickname: string) => void;
}

export default function JoinRoomPage({ onJoin }: JoinRoomPageProps) {
  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
    if (!nickname.trim()) return;
    onJoin?.(nickname);
  };

  return (
    <MobileLayout
      topBar={
        <div
          className="relative flex items-center justify-between self-stretch px-5 py-3 border-b-[0.8px] border-[#eedccb]"
          style={{ background: "rgba(255, 252, 246, 0.9)" }}
        >
          <div className="w-12" />
          <p className="text-base font-bold text-orange">진짜보자 👀</p>
          <div className="w-12" />
        </div>
      }
      bottomCTA={
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            onClick={handleJoin}
            disabled={!nickname.trim()}
          >
            입장하기
          </Button>
          <p className="text-[10px] text-center text-muted">
            닉네임은 결과 화면에서 반응 요약에 표시될 수 있어요.
          </p>
        </div>
      }
    >
      {/* 공유된 약속방 뱃지 */}
      <div className="flex items-center gap-2 pb-6">
        <div className="px-3 py-1.5 rounded-full bg-orange">
          <p className="text-xs font-bold text-white">공유된 약속방</p>
        </div>
        <p className="text-xs text-muted">고등학교 친구방</p>
      </div>

      {/* 진짜보자 카드 미리보기 */}
      <div className="pb-6">
        <PromiseCardPreview
          cardMeta="고등학교 친구방 · 밥"
          badgeText="1년째 조용한 방 발견"
          title="'나중에 보자'만 반복 중"
          description="생존자 3명만 모이면 약속 해동 시작"
          temp={18}
          reactionCount={3}
        />
      </div>

      {/* 닉네임 입력 */}
      <div className="pb-4">
        <TextInput
          label="참여자 닉네임"
          placeholder="단톡방 닉네임 입력"
          value={nickname}
          onChange={setNickname}
        />
        <p className="pt-1 text-xs text-muted">
          단톡방에서 사용할 이름으로 입장해 주세요.
        </p>
      </div>

      {/* 힌트 박스 */}
      <JoinHintBox text="입장하면 이 방에서 내 반응을 남길 수 있어요." />
    </MobileLayout>
  );
}
