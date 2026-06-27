import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import { ChipGroup } from "../components/common/ChipGroup";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { createRoom, createCard } from "../api/roomApi";

const ROOM_TYPES = [
  "고등학교 친구방",
  "대학교 동기방",
  "동아리/모임방",
  "전 직장 동료방",
  "프로젝트 끝난 팀방",
  "가족/친척방",
  "기타",
];

const LAST_MET = ["1달전", "반년전", "1년 넘음", "기억 안남"];
const PURPOSES = ["밥", "카페", "술", "그냥 얼굴 보기"];
const CARD_TONES = ["담백하게", "웃기게", "킹받게", "감성적으로"];

export default function CardFormPage() {
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState<string>();
  const [lastMet, setLastMet] = useState<string>();
  const [memberCount, setMemberCount] = useState("");
  const [purpose, setPurpose] = useState<string>();
  const [cardTone, setCardTone] = useState<string>();
  const [loading, setLoading] = useState(false);

  const isFormValid =
    roomType && lastMet && memberCount.trim() !== "" && purpose && cardTone;

  const handleSubmit = async () => {
    if (!isFormValid || !roomType || !lastMet || !purpose || !cardTone) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const room = await createRoom({
        roomType,
        lastMet,
        memberCount,
        purpose,
        cardTone,
      });

      const roomCode = room.data.roomCode as string;

      await createCard(roomCode);

      navigate(`/${roomCode}/card-result`);
    } catch (e) {
      console.error(e);
      alert("카드 생성에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={() => navigate("/")} />}
      bottomCTA={
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? "만드는 중..." : "AI 약속 카드 만들기 ✨"}
        </Button>
      }
    >
      <p className="text-xl font-bold text-text">어떤 방을 깨울까요?</p>
      <p className="text-sm text-muted pt-1">
        방 분위기만 알려주면 AI가 공유 카드를 만들어줘요.
      </p>

      <ChipGroup
        label="방 유형"
        options={ROOM_TYPES}
        selected={roomType}
        onSelect={setRoomType}
      />

      <ChipGroup
        label="마지막 만남"
        options={LAST_MET}
        selected={lastMet}
        onSelect={setLastMet}
      />

      <div className="flex flex-col self-stretch pt-6">
        <p className="text-sm font-bold text-text pb-2">단톡방 인원수</p>
        <TextInput
          placeholder="예: 8"
          value={memberCount}
          onChange={setMemberCount}
        />
        <p className="text-xs text-muted pt-1.5">
          참여율과 약속 온도를 계산할 때 사용돼요.
        </p>
      </div>

      <ChipGroup
        label="만남 목적"
        options={PURPOSES}
        selected={purpose}
        onSelect={setPurpose}
      />

      <ChipGroup
        label="카드 톤"
        options={CARD_TONES}
        selected={cardTone}
        onSelect={setCardTone}
      />
    </MobileLayout>
  );
}
