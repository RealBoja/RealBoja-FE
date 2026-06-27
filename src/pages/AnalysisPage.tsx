import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileLayout from "../components/layout/MobileLayout";
import TopBar from "../components/common/TopBar";
import ShareButton from "../components/common/ShareButton";
import AnalysisSummaryCard from "../components/analysis/AnalysisSummaryCard";
import RecommendActionBox from "../components/analysis/RecommendActionBox";
import { getAnalysis, advanceRoom, type AnalysisResponse } from "../api/roomApi";

type AnalysisData = AnalysisResponse["data"];

// 반응 타입별 이모지 + 라벨
type ReactionType =
    | "REALLY_MEET"
    | "PURPOSE_OK"
    | "IF_SOMEONE_LEADS"
    | "JUST_ALIVE";

const REACTION_EMOJI: Record<ReactionType, string> = {
  REALLY_MEET: "🔥",
  PURPOSE_OK: "🍚",
  IF_SOMEONE_LEADS: "🙋",
  JUST_ALIVE: "👀",
};

const REACTION_LABEL: Record<ReactionType, string> = {
  REALLY_MEET: "나 진짜 볼래",
  PURPOSE_OK: "목적이면 감",
  IF_SOMEONE_LEADS: "누가 잡으면 감",
  JUST_ALIVE: "일단 생존신고",
};

const REACTION_ORDER: ReactionType[] = [
  "REALLY_MEET",
  "PURPOSE_OK",
  "IF_SOMEONE_LEADS",
  "JUST_ALIVE",
];

// stages는 아직 하드코딩 (다음 단계에서 statusType 매핑)
const stages = [
  { label: "냉동방", active: false },
  { label: "해동중", active: false },
  { label: "온기 도는 중", active: false },
  { label: "조율 가능", active: true },
  { label: "진짜 볼 각", active: false },
];

export default function AnalysisPage() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    if (!roomCode) return;
    let alive = true;
    setLoading(true);
    setError(null);

    getAnalysis(roomCode)
        .then((res) => {
          if (alive) setAnalysis(res.data);
        })
        .catch(() => {
          if (alive) setError("분석 정보를 불러오지 못했어요.");
        })
        .finally(() => {
          if (alive) setLoading(false);
        });

    return () => {
      alive = false;
    };
  }, [roomCode]);

  // 일정 조율 단계로 전환 → NextCardPage 이동
  const handleAdvance = async () => {
    if (!roomCode || advancing) return;
    setAdvancing(true);
    try {
      await advanceRoom(roomCode);
      navigate(`/${roomCode}/next`);
    } catch {
      alert("일정 조율 단계로 넘어가지 못했어요. 다시 시도해 주세요.");
      setAdvancing(false);
    }
  };

  // ── 로딩 ──
  if (loading) {
    return (
        <MobileLayout topBar={<TopBar showBack />}>
          <div className="flex h-full items-center justify-center py-20">
            <p className="text-sm text-muted">불러오는 중…</p>
          </div>
        </MobileLayout>
    );
  }

  // ── 에러 ──
  if (error || !analysis) {
    return (
        <MobileLayout topBar={<TopBar showBack />}>
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <p className="text-sm text-muted">{error ?? "데이터가 없어요."}</p>
          </div>
        </MobileLayout>
    );
  }

  // ── 정상 데이터 ──
  const participantCount = analysis.participantCount;
  const totalCount = analysis.roomSize;
  const isMajority = participantCount > totalCount / 2;

  // 반응 요약 → AnalysisSummaryCard용 배열 (ratio = count / 최대count)
  const counts = REACTION_ORDER.map(
      (type) => analysis.reactionSummary[type] ?? 0,
  );
  const maxCount = Math.max(...counts, 1); // 0 나누기 방지

  const reactions = REACTION_ORDER.map((type) => {
    const count = analysis.reactionSummary[type] ?? 0;
    return {
      emoji: REACTION_EMOJI[type],
      label: REACTION_LABEL[type],
      count,
      ratio: count / maxCount,
    };
  });

  return (
      <MobileLayout
          topBar={<TopBar showBack />}
          bottomCTA={
            <div className="flex flex-col gap-2">
              <ShareButton onClick={() => {}}>결과 카드 공유하기</ShareButton>
              <div className="flex gap-2">
                <button
                    onClick={() => {}}
                    className="flex-1 py-3.5 rounded-2xl border-[0.8px] text-sm font-medium transition"
                >
                  한번 더 알리기
                </button>
                <button
                    onClick={handleAdvance}
                    disabled={!isMajority || advancing}
                    className={`flex-1 py-3.5 rounded-2xl border-[0.8px] text-sm font-medium transition
                ${
                        isMajority
                            ? "bg-bg border-border text-muted hover:bg-section"
                            : "bg-bg border-border text-muted/40 cursor-not-allowed"
                    }`}
                >
                  {advancing ? "이동 중…" : "일정 조율하기"}
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
            date={new Date().toLocaleDateString("ko-KR")}
            roomTypeLabel={analysis.statusLabel}
            temp={analysis.temperature}
            participantCount={participantCount}
            totalCount={totalCount}
            reactions={reactions}
            insightText={analysis.summary}
        />

        {/* 약속 진행 단계 */}
        <div className="mt-4">
          <RecommendActionBox
              stages={stages}
              currentStageLabel="조율 가능"
              nextGoal={analysis.nextAction}
          />
        </div>
      </MobileLayout>
  );
}