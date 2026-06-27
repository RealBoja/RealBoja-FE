import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import TopBar from "@/components/common/TopBar";
import ReactionGrid from "@/components/common/ReactionGrid";
import ParticipantStatusCard from "@/components/reaction/ParticipantStatusCard";
import ReactionCardPreview from "@/components/reaction/ReactionCardPreview";
import {
  createReaction,
  getRoomDetail,
  getCard,
  PURPOSE_LABEL_MAP,
  REACTION_ID_TO_TYPE,
} from "@/api/roomApi";
import { getAnalysis } from "@/api/analysisApi";

export default function ReactRoomPage() {
  const navigate = useNavigate();
  const { roomCode } = useParams<{ roomCode: string }>();

  const participantId = Number(localStorage.getItem("participantId"));
  const nickname = localStorage.getItem("nickname") ?? "익명";

  const [reactionId, setReactionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [purposeLabel, setPurposeLabel] = useState("밥");
  const [temp, setTemp] = useState(0);
  const [reactionCount, setReactionCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");

  useEffect(() => {
    if (!roomCode) return;

    if (!localStorage.getItem("participantId")) {
      alert("입장 정보가 없어요. 다시 입장해주세요.");
      navigate(`/card/${roomCode}/join`);
      return;
    }

    if (localStorage.getItem(`reacted_${roomCode}`) === "true") {
      navigate(`/card/${roomCode}/analysis`);
      return;
    }

    Promise.all([
      getRoomDetail(roomCode),
      getAnalysis(roomCode),
      getCard(roomCode),
    ])
      .then(([roomRes, analysisData, cardRes]) => {
        const { purpose, roomSize } = roomRes.data;
        setPurposeLabel(PURPOSE_LABEL_MAP[purpose] ?? "밥");
        setTotalCount(roomSize);
        setTemp(analysisData.temperature);
        setReactionCount(analysisData.participantCount);
        setCardTitle(cardRes.data.title);
        setCardBody(cardRes.data.body);
      })
      .catch((e) => console.error(e));
  }, [roomCode, navigate]);

  const handleSubmit = async () => {
    if (!reactionId || !roomCode) return;
    try {
      setLoading(true);
      const reactionType = REACTION_ID_TO_TYPE[reactionId];
      await createReaction(roomCode, participantId, reactionType);
      localStorage.setItem(`reacted_${roomCode}`, "true");
      navigate(`/card/${roomCode}/temperature`);
    } catch (e) {
      console.error(e);
      alert("반응 남기기에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewStatus = () => {
    if (!roomCode) return;
    navigate(`/card/${roomCode}/temperature`);
  };

  return (
    <MobileLayout
      topBar={<TopBar showBack onBack={() => navigate(-1)} />}
      bottomCTA={
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={!reactionId || loading}
            className={`w-full h-14 rounded-2xl text-base font-bold transition
              ${
                reactionId
                  ? "bg-orange text-white"
                  : "bg-[#eedccb] text-muted cursor-not-allowed"
              }`}
            style={
              reactionId
                ? { boxShadow: "0px 4px 16px 0 rgba(233,120,47,0.3)" }
                : undefined
            }
          >
            {loading ? "남기는 중..." : "반응 남기기"}
          </button>
          <button
            onClick={handleViewStatus}
            className="w-full h-[45.6px] rounded-2xl border-[0.8px] border-[#eedccb] text-sm font-medium text-muted hover:bg-section transition"
          >
            현재 상태 확인하기
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <ParticipantStatusCard
          nickname={nickname}
          roomMeta={`고등학교 친구방 · ${purposeLabel}`}
          temp={temp}
          reactionCount={reactionCount}
          totalCount={totalCount}
        />

        <ReactionCardPreview
          title={cardTitle || "'나중에 보자'만 반복 중"}
          description={cardBody || "생존자 3명부터 약속 해동 시작"}
        />

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-[#eedccb]" />
          <p className="px-2 text-xs font-bold text-text">나는 이 방에서…</p>
          <div className="flex-1 h-px bg-[#eedccb]" />
        </div>

        <ReactionGrid purposeLabel={purposeLabel} onSelect={setReactionId} />

        <p className="text-[10px] text-center text-muted">
          * 반응 후에 방 분위기와 현재 상태를 더 자세히 볼 수 있어요.
        </p>
      </div>
    </MobileLayout>
  );
}
