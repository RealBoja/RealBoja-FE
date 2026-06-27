import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import TextInput from "@/components/common/TextInput";
import Button from "@/components/common/Button";
import PromiseCardPreview from "@/components/join/PromiseCardPreview";
import JoinHintBox from "@/components/join/JoinHintBox";
import {
  getRoom,
  getCard,
  getAnalysis,
  ROOM_TYPE_LABEL,
  PURPOSE_LABEL,
} from "@/api/roomApi";

export default function JoinRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const [roomTypeLabel, setRoomTypeLabel] = useState("");
  const [cardMeta, setCardMeta] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardCtaText, setCardCtaText] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    if (!roomId) return;

    const fetchAll = async () => {
      try {
        const [roomRes, cardRes, analysisRes] = await Promise.all([
          getRoom(roomId),
          getCard(roomId),
          getAnalysis(roomId),
        ]);

        if (roomRes.success) {
          const rtLabel =
            ROOM_TYPE_LABEL[roomRes.data.roomType] ?? roomRes.data.roomType;
          const pLabel =
            PURPOSE_LABEL[roomRes.data.purpose] ?? roomRes.data.purpose;
          setRoomTypeLabel(rtLabel);
          setCardMeta(`${rtLabel} · ${pLabel}`);
        }

        if (cardRes.success) {
          setCardTitle(cardRes.data.title);
          setCardBody(cardRes.data.body);
          setCardCtaText(cardRes.data.ctaText);
        }

        if (analysisRes.success) {
          setTemperature(analysisRes.data.temperature);
          setParticipantCount(analysisRes.data.participantCount);
        }
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [roomId]);

  const handleJoin = () => {
    if (!nickname.trim()) return;
    navigate(`/${roomId}/react`, { state: { nickname } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <p className="text-sm text-muted">불러오는 중...</p>
      </div>
    );
  }

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
        <p className="text-xs text-muted">{roomTypeLabel}</p>
      </div>

      {/* 진짜보자 카드 미리보기 */}
      <div className="pb-6">
        <PromiseCardPreview
          cardMeta={cardMeta}
          badgeText={cardCtaText}
          title={cardTitle}
          description={cardBody}
          temp={temperature}
          reactionCount={participantCount}
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
