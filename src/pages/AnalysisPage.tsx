import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";
import AnalysisSummaryCard from "../components/analysis/AnalysisSummaryCard";
import RecommendActionBox from "../components/analysis/RecommendActionBox";
import { getAnalysis, type ReactionType } from "@/api/analysisApi";
import { getRoomDetail } from "@/api/roomApi";

const REACTION_LABEL: Record<ReactionType, { emoji: string; label: string }> = {
  REALLY_MEET: { emoji: "🔥", label: "나 진짜 볼래" },
  PURPOSE_OK: { emoji: "🍚", label: "밥이면 감" },
  IF_SOMEONE_LEADS: { emoji: "🙋", label: "누가 잡으면 감" },
  JUST_ALIVE: { emoji: "👀", label: "일단 생존신고" },
};

const STAGE_LABELS = [
  "냉동방",
  "해동중",
  "온기 도는 중",
  "조율 가능",
  "진짜 볼 각",
];

const STATUS_TO_STAGE: Record<string, string> = {
  COLD_ROOM: "냉동방",
  THAWING: "해동중",
  WARMING: "온기 도는 중",
  SCHEDULABLE: "조율 가능",
  READY: "진짜 볼 각",
};

type Reaction = {
  emoji: string;
  label: string;
  count: number;
  ratio: number;
};

type Stage = {
  label: string;
  active: boolean;
};

export default function AnalysisPage() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [roomTypeLabel, setRoomTypeLabel] = useState("");
  const [temp, setTemp] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [insightText, setInsightText] = useState("");
  const [currentStageLabel, setCurrentStageLabel] = useState("");
  const [nextGoal, setNextGoal] = useState("");
  const [stages, setStages] = useState<Stage[]>(
    STAGE_LABELS.map((label) => ({ label, active: false })),
  );

  useEffect(() => {
    if (!roomCode) return;

    const fetchAll = async () => {
      try {
        const [analysisData, roomRes] = await Promise.all([
          getAnalysis(roomCode),
          getRoomDetail(roomCode),
        ]);

        if (roomRes.success) {
          const d = new Date(roomRes.data.createdAt);
          setDate(
            `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`,
          );
        }

        setRoomTypeLabel(analysisData.statusLabel);
        setTemp(analysisData.temperature);
        setParticipantCount(analysisData.participantCount);
        setTotalCount(analysisData.roomSize);

        const maxCount = Math.max(
          ...Object.values(analysisData.reactionSummary),
        );
        const reactionList = (
          Object.entries(analysisData.reactionSummary) as [
            ReactionType,
            number,
          ][]
        )
          .map(([type, count]) => ({
            emoji: REACTION_LABEL[type]?.emoji ?? "❓",
            label: REACTION_LABEL[type]?.label ?? type,
            count,
            ratio: maxCount > 0 ? count / maxCount : 0,
          }))
          .sort((a, b) => b.count - a.count);
        setReactions(reactionList);

        setInsightText(analysisData.summary);

        const stageLabel =
          STATUS_TO_STAGE[analysisData.statusType] ?? analysisData.statusType;
        setCurrentStageLabel(stageLabel);
        setNextGoal(analysisData.nextAction);
        setStages(
          STAGE_LABELS.map((label) => ({
            label,
            active: label === stageLabel,
          })),
        );
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [roomCode]);

  const isMajority = participantCount > totalCount / 2;

  const handleBack = () => navigate(-1);
  const handleShare = () => {
    // TODO: 링크 복사
  };
  const handleMoreReaction = () => {
    // TODO: 한번 더 알리기
  };
  const handleNextCard = () => {
    navigate(`/card/${roomCode}/next`);
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
      topBar={<TopBar showBack onBack={handleBack} />}
      bottomCTA={
        <div className="flex flex-col gap-2">
          <ShareButton onClick={handleShare}>결과 카드 공유하기</ShareButton>
          <div className="flex gap-2">
            <button
              onClick={handleMoreReaction}
              className="flex-1 py-3.5 rounded-2xl border-[0.8px] border-orange bg-orange text-sm font-medium text-white transition hover:bg-orange-dark"
            >
              한번 더 알리기
            </button>
            <button
              onClick={handleNextCard}
              disabled={!isMajority}
              className={`flex-1 py-3.5 rounded-2xl border-[0.8px] text-sm font-medium transition
                ${
                  isMajority
                    ? "bg-orange border-orange text-white hover:bg-orange-dark"
                    : "bg-[#eedccb] border-[#eedccb] text-muted cursor-not-allowed"
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
        date={date}
        roomTypeLabel={roomTypeLabel}
        temp={temp}
        participantCount={participantCount}
        totalCount={totalCount}
        reactions={reactions}
        insightText={insightText}
      />

      {/* 약속 진행 단계 */}
      <div className="mt-4">
        <RecommendActionBox
          stages={stages}
          currentStageLabel={currentStageLabel}
          nextGoal={nextGoal}
        />
      </div>
    </MobileLayout>
  );
}
