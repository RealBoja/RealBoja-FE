import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/common/TopBar";
import RoomInfoCard from "@/components/card/RoomInfoCard";
import TextInput from "@/components/common/TextInput";
import ReactionGrid from "@/components/common/ReactionGrid";
import Button from "@/components/common/Button";

export default function JoinRoomPage() {
  const [nickname, setNickname] = useState("");
  const [reaction, setReaction] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log("반응 제출:", { nickname, reaction });
  };

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={() => history.back()} />}
      bottomCTA={
        <div className="flex flex-col gap-2">
          <Button variant="primary" onClick={handleSubmit}>
            반응 남기기
          </Button>
          <Button variant="ghost" onClick={() => {}}>
            결과만 확인하기
          </Button>
        </div>
      }
    >
      {/* 상단 약속방 정보 카드 */}
      <RoomInfoCard
        roomName="고등학교 친구방"
        caption="이 방 마지막 만남: 거의 전설"
        title="'나중에 보자'만 반복 중"
        temp={0}
        memberCount={8}
        purpose="밥"
      />

      {/* 참여자 닉네임 입력 (위 20) */}
      <div className="mt-5 self-stretch">
        <TextInput
          label="참여자 닉네임"
          placeholder="단톡방 닉네임 입력"
          value={nickname}
          onChange={setNickname}
        />
      </div>

      {/* 나는 이 방에서… (위 20) */}
      <div className="mt-5 self-stretch">
        <p className="text-sm font-bold text-text">나는 이 방에서…</p>

        {/* 반응 그리드 (위 12) */}
        <div className="mt-3">
          <ReactionGrid onSelect={setReaction} />
        </div>

        {/* 안내 문구 (위 8) */}
        <p className="mt-2 text-center text-[10px] text-muted">
          * 만남 목적에 따라 '밥이면 감'이 '카페면 감' 등으로 변경돼요
        </p>
      </div>
    </MobileLayout>
  );
}
