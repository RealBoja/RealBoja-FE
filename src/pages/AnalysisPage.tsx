import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";
import AnalysisSummaryCard from "../components/analysis/AnalysisSummaryCard";
import RecommendActionBox from "../components/analysis/RecommendActionBox";
import { getAnalysis, type ReactionType } from "@/api/analysisApi";
import { getRoomDetail, advanceRoom } from "@/api/roomApi";

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

function tempToStage(temp: number): string {
  if (temp <= 30) return "냉동방";
  if (temp <= 50) return "해동중";
  if (temp <= 70) return "온기 도는 중";
  if (temp <= 85) return "조율 가능";
  return "진짜 볼 각";
}

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

  const cardRef = useRef<HTMLDivElement>(null);
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

    const nickname = localStorage.getItem("nickname");
    const savedRoomCode = localStorage.getItem("roomCode");
    if (!nickname || savedRoomCode !== roomCode) {
      navigate(`/card/${roomCode}/join`);
      return;
    }

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

        setRoomTypeLabel(tempToStage(analysisData.temperature));
        setTemp(analysisData.temperature);
        setParticipantCount(analysisData.participantCount);
        setTotalCount(analysisData.roomSize);

        const maxCount = Math.max(
          ...Object.values<number>(analysisData.reactionSummary),
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

        const stageLabel = tempToStage(analysisData.temperature);
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

  const copyLink = async (path: string) => {
    if (!roomCode) return;
    const shareUrl = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었어요!");
    } catch (e) {
      console.error(e);
      alert("링크 복사에 실패했어요.");
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/card/${roomCode}/analysis`;

    if (!cardRef.current) {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었어요!");
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "realboja-result.png", { type: "image/png" });

      await navigator.clipboard.writeText(shareUrl);

      if (navigator.share) {
        try {
          await navigator.share({
            title: "진짜보자 방 분석 결과",
            text: `우리 방 약속 온도는 ${temp}℃! 결과를 확인해봐요 👇`,
            url: shareUrl,
            files: [file],
          });
        } catch {
          await navigator.share({ title: "진짜보자 방 분석 결과", url: shareUrl });
        }
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "realboja-result.png";
        a.click();
        await navigator.clipboard.writeText(shareUrl);
        alert("카드 이미지를 저장했어요! 링크도 복사됐어요 😊");
      }
    } catch (e) {
      console.error(e);
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었어요!");
    }
  };

  const handleMoreReaction = () => copyLink(`/card/${roomCode}/react`);

  const handleNextCard = async () => {
    if (!roomCode) return;
    try {
      await advanceRoom(roomCode);
    } catch (e) {
      console.error(e);
    } finally {
      navigate(`/card/${roomCode}/next`);
    }
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
                    : "bg-border border-border text-muted cursor-not-allowed"
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
      <div ref={cardRef}>
      <AnalysisSummaryCard
        date={date}
        roomTypeLabel={roomTypeLabel}
        temp={temp}
        participantCount={participantCount}
        totalCount={totalCount}
        reactions={reactions}
        insightText={insightText}
      />
      </div>

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
